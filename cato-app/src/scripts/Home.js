import firebase from 'firebase';
import {
    MDBModal,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBInput,
    MDBBtn,
} from 'mdb-vue-ui-kit';
import { ref } from 'vue';

export default {
    name: "Home",
    el: "#app",
    components: {
        MDBModal,
        MDBModalHeader,
        MDBModalTitle,
        MDBModalBody,
        MDBModalFooter,
        MDBInput,
        MDBBtn,
    },
    methods: {
        GetCourses: function() {
            var userID = firebase.auth().currentUser.uid;
            var coursesRef = firebase.firestore().collection("courses")

            coursesRef
                .where("users", "array-contains", userID)
                //.orderBy("name")
                .onSnapshot((querySnapshot) => {
                    var query = '[';

                    querySnapshot.forEach((doc) => {
                        query += '{"id": "' + doc.id + '", ';
                        query += '"code": "' + doc.data().code + '", ';
                        query += '"name": "' + doc.data().name + '", ';
                        query += '"term": "' + doc.data().term + '"}, ';
                    });

                    query = query.slice(0, -2)
                    query += ']'
                    this.courses = JSON.parse(query);
                });
                // .catch((error) => {
                //     console.log("Error getting documents: ", error);
                // });
        },
        SelectCourse: function(docId) {
            this.$router.push('/chatbot?course=' + docId);
        },
        AddNewCourse: function() {

            var userID = firebase.auth().currentUser.uid;
            var coursesRef = firebase.firestore().collection("courses")
            var docData = {
                code: this.modal_code,
                documents: [],
                name: this.modal_title,
                teacher: [],
                term: this.modal_term,
                users: [ userID ],
            };

            coursesRef
                .doc()
                .set(docData)
                .then(() => {
                    this.addModal = false;
                }
            );
        },
    },
    data() {
        return {
            courses: []
        }
    },
    setup() {
        const addModal = ref(false);
        const modal_code = ref('');
        const modal_title = ref('');
        const modal_term = ref('');
  
        return {
            addModal,
            modal_code,
            modal_title,
            modal_term
        };
    },
    beforeMount() {
        this.GetCourses()
    },
    mounted() {
        //$(this.$refs.vuemodal).on("hidden.bs.modal", this.doSomethingOnHidden)
    }
};