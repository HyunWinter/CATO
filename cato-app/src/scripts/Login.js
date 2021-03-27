import firebase from "firebase";

export default {
    name: "Auth",
    methods: {
        addSignUp: function() {
            document.querySelector(".box").classList.add("sign-up-mode");
        },
        addSignIn: function() {
            document.querySelector(".box").classList.remove("sign-up-mode");
        },
        SignUp: function() {
            firebase
                .auth()
                .createUserWithEmailAndPassword(
                    this.signupForm.email,
                    this.signupForm.password
                )
                .then(() => {
                    alert("Successfully created your account!");
                    this.$router.push('/home');
                })
                .catch(error => {
                    alert(error.message);
                });
        },
        SignIn: async function() {
            firebase
                .auth()
                .signInWithEmailAndPassword(
                    this.loginForm.email,
                    this.loginForm.password
                )
                .then(() => {
                    // alert("logged in");
                    this.$router.push('/home');
                })
                .catch(error => {
                    alert(error.message);
                });
        },
    },
    data() {
        return {
            loginForm: {
                email: 'test@oit.edu',
                password: 'test12',
            },
            signupForm: {
                email: '',
                password: '',
            },
        };
    },
    mounted() {
        let recaptchaScript = document.createElement('script')
        recaptchaScript.setAttribute('src', 'https://kit.fontawesome.com/64d58efce2.js')
        document.head.appendChild(recaptchaScript)
    },
};