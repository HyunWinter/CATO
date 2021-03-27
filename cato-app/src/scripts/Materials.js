import firebase from 'firebase';

export default {
	name: "Materials",
	methods: {
        getFiles: function() {
            let vm = this;

            this.courseRef
                .doc(this.courseID)
                .onSnapshot((doc) => {

                    if (doc.exists) {
                        let dbfiles = [];

                        doc.data().documents.forEach(function(item) {
                            dbfiles.push({
                                name: item
                            });
                        });

                        vm.dbfiles = dbfiles;
                    }
                });
        },
		addFile: function(es) {
            let droppedFiles = es.dataTransfer.files;
            if(!droppedFiles) return;
            
            ([...droppedFiles]).forEach(f => {
                this.files.push(f);
            });

            let $ref = this.$refs.upload;
            $ref.style.display = 'inline';
        },
        removeAllFiles: function() {
            var formData = new FormData();
            formData.append("index", this.courseID.toLowerCase());
            formData.append("name", "");

            const url = "http://localhost:8777/delete_document"
            const Http = new XMLHttpRequest();
            Http.open("POST", url);
            Http.send(formData);

            const fieldValue = firebase.firestore.FieldValue;
            this.courseRef
                .doc(this.courseID)
                .update({
                    "documents": fieldValue.delete()
                })

            this.courseRef
                .doc(this.courseID)
                .update({
                    "documents": fieldValue.arrayUnion()
                })
                .then(() => {
                    alert("All documents are deleted!");
                })
                .catch((error) => {
                    // The document probably doesn't exist.
                    alert("Error deleting documents:" + error);
                });
        },
        uploadFile: function(){

            let self = this;

            this.files.forEach((f) => {
                var formData = new FormData();
                formData.append("index", self.courseID.toLowerCase());
                formData.append("doc", f);
                formData.append("mode", "pre_train");

                const url = "http://localhost:8777/update_document"

                const Http = new XMLHttpRequest();
                Http.open("POST", url);
                Http.send(formData);

                const FieldValue = firebase.firestore.FieldValue;
                this.courseRef
                    .doc(this.courseID)
                    .update({
                        "documents": FieldValue.arrayUnion(f.name)
                    });
            });

            this.files = [];
            let $ref = this.$refs.upload;
            $ref.style.display = 'none';
        }
	},
    // computed: {
    //     uploadDisabled() {
    //       return this.files.length === 0;
    //     }
    // },
    data() {
        return {
            courseRef: "",
            courseID: "",
            files: [],
            dbfiles: [],
        }
    },
    beforeMount() {
        this.courseID = window.location.href.split('course=')[1];
        this.courseRef = firebase.firestore().collection("courses");
    },
    mounted() {
        this.getFiles();
    }
};