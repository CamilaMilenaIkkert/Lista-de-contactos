import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AddContactView from '../views/AddContactView.vue';

const routes = [
    { path: '/', component: HomeView },
    { path: '/add', component: AddContactView },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
