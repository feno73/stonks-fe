import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from "@/views/Dashboard.vue";
import UserManagement from "@/views/UserManagement.vue";
import CreateUser from "@/components/CreateUser.vue";
import EditUser from "@/components/EditUser.vue";
import ActivosManagement from "@/views/ActivosManagement.vue";
import CreateActivo from "@/components/CreateActivo.vue";

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/users',
        name: 'UserManagement',
        component: UserManagement
    },
    {
        path: '/users/create',
        name: 'CreateUser',
        component: CreateUser
    },
    {
        path: '/users/edit/:id',
        name: 'EditUser',
        component: EditUser
    },
    {
        path: '/activos',
        name: 'ActivosManagement',
        component: ActivosManagement
    },
    {
        path: '/activos/create',
        name: 'CreateActivo',
        component: CreateActivo
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router