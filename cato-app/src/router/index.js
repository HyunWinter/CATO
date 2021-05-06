import { createWebHistory, createRouter } from "vue-router";
import Login from '@/components/Login';
import Home from '@/components/Home';
import Account from '@/components/Account';
import Chatbot from '@/components/Chatbot';
import Materials from '@/components/Materials';
import Help from '@/components/Help';

import firebase from "@/firebase.js";

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
    base: process.env.BASE_URL,
    routes,
    linkActiveClass: "active",
    linkExactActiveClass: "active"
});

router.beforeEach(async(to, from, next) => {

    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

    if (requiresAuth && !await firebase.getCurrentUser()) {
        alert('You are not logged in!');
        next('/');
    } else {
        next()
    }
})

export default router;