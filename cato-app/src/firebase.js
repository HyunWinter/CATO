import firebase from 'firebase/app';
import 'firebase/auth';

// Firebase web app configuration
var firebaseConfig = {
    apiKey: "AIzaSyAkaGLr8w3UkcNV4Nmnr75GXfUbXDatPWk",
    authDomain: "cato-89d5e.firebaseapp.com",
    projectId: "cato-89d5e",
    storageBucket: "cato-89d5e.appspot.com",
    messagingSenderId: "217948886078",
    appId: "1:217948886078:web:2464ba6652d34c9a4ded6f",
    measurementId: "G-26VQG58Q7N"
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