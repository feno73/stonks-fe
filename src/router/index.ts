import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from "@/views/Dashboard.vue";
import UserManagement from "@/views/UserManagement.vue";
import CreateUser from "@/components/CreateUser.vue";
import EditUser from "@/components/EditUser.vue";
import ActivosManagement from "@/views/ActivosManagement.vue";
import CreateActivo from "@/components/CreateActivo.vue";
import Tenencias from "@/views/Tenencias.vue";
import CreateTenencia from "@/components/CreateTenencia.vue";
import TasaCambio from "@/views/TasaCambio.vue";
import CreateTasaCambio from "@/components/CreateTasaCambio.vue";

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
    {
        path: '/tenencias',
        name: 'Tenencias',
        component: Tenencias
    },
    {
        path: '/tenencias/create',
        name: 'CreateTenencia',
        component: CreateTenencia
    },
    {
        path: '/cotizacion',
        name: 'TasaCambio',
        component: TasaCambio
    },
    {
        path: '/cotizacion/create',
        name: 'CreateTasaCambio',
        component: CreateTasaCambio
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router