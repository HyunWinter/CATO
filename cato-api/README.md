### Verify Python version
```
$ py -3 --version
```

### Create Python a virtual environment
```
$ py -3 -m venv venv
```

### Activating virtual environment
```
$ venv\Scripts\activate
```

### De-activating virtual environment
```
$ venv\Scripts\deactivate
```

######################################################################################
### Install the latest master of Haystack
```
$ pip install git+https://github.com/deepset-ai/haystack.git
```

### install the version of torch that works with the colab GPUs
```
$ pip install torch==1.6.0+cu101 -f https://download.pytorch.org/whl/torch_stable.html
```

### Installation of Elasticsearch API
```
$ docker pull elasticsearch:7.6.2
$ docker run -d -p 9200:9200 -e "discovery.type=single-node" elasticsearch:7.9.2
$ http://localhost:9200
```

### Installation of the Flask API
```
$ docker build -t cato-api:v1 .
$ docker run --name cato-api --net=host --gpus all -d -p 8777:8777 cato-api:v1
$ docker run --name cato-api --add-host=host.docker.internal:host-gateway --gpus all -d -p 8777:8777 cato-api:v1
$ http://localhost:8777/
```

### Remove Image
```
$ docker rm -f cato-api:v1
```

### Logs Not Showing Up?
```
$ docker logs -f (container id)
```

######################################################################################
### Install Google Cloud CLI
```
$ gcloud init
```

### Build the container with Cloud Build
```
$ gcloud builds submit --tag gcr.io/cato-81c6f/cato
```

### Deploy the container to Cloud run
```
$ gcloud beta run deploy --image gcr.io/cato-81c6f/cato
```

### Setup Firebase Hosting
```
$ npm init -y # creates a package.json
$ npm install -D firebase-tools
$ ./node_modules/.bin/firebase init hosting
```