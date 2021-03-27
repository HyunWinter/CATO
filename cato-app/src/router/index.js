import { createWebHistory, createRouter } from "vue-router";
import Login from '@/components/Login';
import Home from '@/components/Home';
import Account from '@/components/Account';
import Chatbot from '@/components/Chatbot';
import Materials from '@/components/Materials';
import Help from '@/components/Help';

import firebase from "firebase";

// Firebase Initialization
var firebaseConfig = {
    apiKey: "AIzaSyCNtb5d_s7njYkUNy_8Dw7zaK8tPdNBlEM",
    authDomain: "cato-81c6f.firebaseapp.com",
    projectId: "cato-81c6f",
    storageBucket: "cato-81c6f.appspot.com",
    messagingSenderId: "883895826287",
    appId: "1:883895826287:web:efede94e6bb12af8f3da9a"
};

firebase.initializeApp(firebaseConfig);

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/chatbot',
        name: 'Chatbot',
        component: Chatbot,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/materials',
        name: 'Materials',
        component: Materials,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/account',
        name: 'Account',
        component: Account,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/help',
        name: 'Help',
        component: Help,
        meta: {
            requiresAuth: true,
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
    const currentUser = firebase.auth().currentUser

    if (requiresAuth && !currentUser) {
        alert('You are not logged in!');
        next({ path: '/', query: { redirect: to.fullPath } })
    }
    else if (!requiresAuth && currentUser) {
        next('/home')
    }
    else if (!requiresAuth && !currentUser) {
        next()
    }
    else {
        next()
    }
})

export default router;