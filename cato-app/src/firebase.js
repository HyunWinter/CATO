import firebase from 'firebase/app';
import 'firebase/auth';

// Firebase web app configuration
var firebaseConfig = {
    apiKey: "AIzaSyCNtb5d_s7njYkUNy_8Dw7zaK8tPdNBlEM",
    authDomain: "cato-81c6f.firebaseapp.com",
    projectId: "cato-81c6f",
    storageBucket: "cato-81c6f.appspot.com",
    messagingSenderId: "883895826287",
    appId: "1:883895826287:web:efede94e6bb12af8f3da9a"
};

firebase.initializeApp(firebaseConfig);

firebase.getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            unsubscribe();
            resolve(user);
        }, 
        reject);
    })
};

export default firebase;