import {createRouter, createWebHistory} from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import {token} from "@/static/storageKeys";

const routes = [
    {
        path: '/',
        name: 'login',
        component: LoginView
    },
    {
        path: '/home',
        name: 'home',
        component: HomeView
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})


router.beforeEach((to, from, next) => {
    const isAuthenticated = Boolean(localStorage.getItem(token))

    if (to.name !== 'login' && !isAuthenticated) next({name: 'home'})
    else next()
})

export default router
