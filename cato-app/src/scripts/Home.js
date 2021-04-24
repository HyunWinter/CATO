import firebase from 'firebase';
// import $ from 'jquery'

export default {
    name: "Home",
    el: "#app",
    methods: {
        GetCourses: function() {
            var userID = firebase.auth().currentUser.uid;
            var coursesRef = firebase.firestore().collection("courses")

            coursesRef
                .where("users", "array-contains", userID)
                .orderBy("name")
                .get()
                .then((querySnapshot) => {
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
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
        },
        SelectCourse: function(docId) {
            this.$router.push('/chatbot?course=' + docId);
        },
        doSomethingOnHidden() {
            alert("Not yet implemented");
        },
    },
    data() {
        return {
            courses: [],
        }
    },
    beforeMount() {
        this.GetCourses()
    },
    // mounted() {
    //     $(this.$refs.vuemodal).on("hidden.bs.modal", this.doSomethingOnHidden)
    // }
};