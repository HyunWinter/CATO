# Import Packages
import json
import os
import logging
import time

from flask_cors import CORS
from flask import Flask, request, jsonify, render_template, make_response
from haystack import Finder
from haystack.preprocessor.cleaning import clean_wiki_text
from haystack.preprocessor.utils import convert_files_to_dicts
from haystack.reader.farm import FARMReader
from haystack.document_store.elasticsearch import ElasticsearchDocumentStore
from haystack.file_converter.pdf import PDFToTextConverter
from haystack.retriever.dense import DensePassageRetriever
from haystack.retriever.sparse import ElasticsearchRetriever
from haystack.pipeline import ExtractiveQAPipeline

# Application Settings
app = Flask(__name__)
CORS(app)

# Application Directory For Inputs and Training
app.config["input"] = "/usr/app/data/input"
app.config["train_model"] = "/usr/app/data/train_model"
app.config["squad_data"] = "/usr/app/data/squad20"

# ElasticSearch Server Host Information
#app.config["host"] = "localhost"
app.config["host"] = "host.docker.internal"
#app.config["host"] = "0.0.0.0"
app.config["username"] = ""
app.config["password"] = ""
app.config["port"] = "9200"

########################### HELPERS ############################
def format_server_time():
  server_time = time.localtime()
  return time.strftime("%I:%M:%S %p", server_time)

############################ HOME ##############################
@app.route('/')
def home():
    context = { 
        'server_time' : format_server_time() 
    }
    return render_template('index.html', context=context)

####################### UPDATE DOCUMENT ########################
@app.route('/update_document', methods=['POST'])
def update_document():

    if request.files:
        # Index is the target document where queries need to sent.
        index = request.form['index']

        # Uploaded document for target source
        doc = request.files["doc"]
        APP_ROOT = os.path.dirname(os.path.abspath(__file__))
        FILE_PATH = os.path.join(APP_ROOT, 'data/input')
        DOC_path = os.path.join(FILE_PATH, doc.filename)
        doc.save(DOC_path)

        # Initialization of the Haystack Elasticsearch document storage
        document_store = ElasticsearchDocumentStore(
            host=app.config["host"],
            port=app.config["port"],
            username=app.config["username"],
            password=app.config["password"],
            index=index
        )
                                                   
        # Convert the pdf files into dictionary and update to ElasticSearch Document
        dicts = convert_files_to_dicts(
            FILE_PATH,
            clean_func=clean_wiki_text,
            split_paragraphs=False)

        document_store.write_documents(dicts)
        os.remove(DOC_path)

        return json.dumps({
            'status': 'Susccess',
            'message': 'document available at http://'+ app.config["host"] 
                + ':'
                + app.config["port"] +'/' + index + '/_search',
            'result': []
        })

    else:
        return json.dumps({
            'status':'Failed',
            'message': 'No file uploaded', 
            'result': []
        })

######################## QNA PRETRAIN ##########################
@app.route('/qna_pretrain', methods=['POST'])
def qna_pretrain():

    # Question and index parameters
    question = request.form['question']
    index = request.form['index']

    # Initialization of the Haystack Elasticsearch document storage
    document_store = ElasticsearchDocumentStore(
        host=app.config["host"],
        username=app.config["username"],
        password=app.config["password"],
        index=index
    )

    # Using pretrain model
    # Will change the model later because fine-tuned > distilbert > other roseta BERT 
    reader = FARMReader(
        model_name_or_path="deepset/roberta-base-squad2",
        use_gpu=False
    )

    # Initialization of ElasticRetriever
    retriever = ElasticsearchRetriever(document_store=document_store)

    # Finder sticks together reader and retriever
    pipe = ExtractiveQAPipeline(reader, retriever)

    # predict n answers
    n = int(request.form['n'])
    prediction = pipe.run(
        query=question, 
        top_k_retriever=10, 
        top_k_reader=n
    )

    answer = []
    score = []

    for res in prediction['answers']:
        answer.append(res['answer'])

    # for res in prediction['score']:
    #     score.append(res['score'])

    return json.dumps({
        'status':'success',
        'message': 'Process succesfully', 
        'result': answer
        # 'score': score
    })

####################### DOCUMENT COUNT #########################
@app.route('/document_count', methods=['POST'])
def document_count():

    # Question and index parameters
    index = request.form['index']

    # Initialization of the Haystack Elasticsearch document storage
    document_store = ElasticsearchDocumentStore(
        host=app.config["host"],
        port=app.config["port"],
        username=app.config["username"],
        password=app.config["password"],
        index=index
    )

    count = document_store.get_document_count(None, index)

    return json.dumps({
        'status':'success',
        'message': 'Process succesfully', 
        'result': count
    })

####################### DOCUMENT COUNT #########################
@app.route('/delete_document', methods=['POST'])
def delete_document():

    # Question and index parameters
    index = request.form['index']
    name = request.form['name']

    # Initialization of the Haystack Elasticsearch document storage
    document_store = ElasticsearchDocumentStore(
        host=app.config["host"],
        port=app.config["port"],
        username=app.config["username"],
        password=app.config["password"],
        index=index
    )

    document_store.delete_all_documents(index, None)

    return json.dumps({
        'status':'success',
        'message': 'Process succesfully'
    })

######################## ERROR HANDLER #########################
@app.errorhandler(500)
def server_error(e):

    logging.exception('An error occurred during a request.')
    
    return json.dumps({
        'status': 'failed',
        'message': """An internal error occurred: <pre>{}</pre>See logs for full stacktrace.""".format(e),
        'result': []
    })

############################ MAIN ##############################
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8777)
