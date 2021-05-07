import firebase from 'firebase';
import { MDBSpinner } from "mdb-vue-ui-kit";

export default {
	name: "Chatbot",
    components: {
        MDBSpinner
    },
	methods: {
		ReadMessages: async function () {
			// load realtime listener
            let vm = this;

            this.courseRef
                .doc(this.courseID)
                .collection(this.userID)
                .orderBy("sentAt")
                .onSnapshot((querySnapshot) => {
                    let chats = [];

                    querySnapshot.forEach((doc) => {
                        if (doc.exists) {
                            chats.push({
                                id: doc.id,
                                sentBy: doc.data().sentBy,
                                message: doc.data().message,
                                sentAt: new Date(doc.data().sentAt.seconds * 1000).toLocaleString("en-US")
                            });
                        }
                    })

                    vm.chats = chats;
                }, 
                (error) => {
                    console.error("Error with Query Snapshot: ", error);
                });
		},
        SendMessages: async function() {
            // get message
            const message = document.getElementById("message-box").value;

            if (message != '') {

                this.SaveMessage(message, "user");

                var formData = new FormData();
                formData.append("index", this.courseID.toLowerCase());
                formData.append("question", message);
                formData.append("n", "1");
            
                const url = "http://localhost:8777/qna_pretrain"

                const Http = new XMLHttpRequest();
                Http.open("POST", url);
                Http.send(formData);

                let self = this;
                Http.onload = function() {
                    var obj = JSON.parse(Http.responseText);
                    var message = '';
                    if (obj.result.length == 0) {
                        message = "Unable to find the answer. Please check the context.";
                    }
                    else {
                        message = 'Answer: ' + obj.result[0]
                    }
                    self.SaveMessage(message, "chatbot");
                }
            }
            else if (message == '') {
                alert("Please enter your question!");
            }
            else {
                alert("Please check your internet connection.");
            }

            return false;
        },
        SaveMessage: async function(message, sender) {

            if (sender == "chatbot") {
                this.isLoading = false;
            }

            var docData = {
                message: message,
                sentAt: firebase.firestore.FieldValue.serverTimestamp(),
                sentBy: sender,
            }

            this.courseRef
                .doc(this.courseID)
                .collection(this.userID)
                .add(docData)
                .then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);

                    if (sender == "user") {
                        this.isLoading = true;
                    }
                })
                .catch((error) => {
                    console.error("Error sending the question: ", error);
                });
        },
        ScrollToEnd: function() {
            var container = this.$el.querySelector("#chatbot");
            container.scrollTop = container.scrollHeight;
        },
        OnFeedBackSelected: function () {
            setTimeout(
                function() {
                    alert("Feedback sent to the API!")
                },
                500
            )
            
        }
	},
    data() {
        return {
            courseRef: "",
            courseID: "",
            userID: "",
            chats: [],
            isLoading: false,
        }
    },
    beforeMount() {
        this.courseRef = firebase.firestore().collection("courses");
        this.courseID = window.location.href.split('course=')[1];
        this.userID = firebase.auth().currentUser.uid;

        this.ReadMessages();
    },
    updated() {
        this.ScrollToEnd();
    }
};