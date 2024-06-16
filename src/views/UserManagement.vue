<template>
  <div class="user-management">
    <h1 class="text-2xl font-bold mb-4">Gestión de Usuarios</h1>
    <router-link to="/users/create" class="bg-blue-500 text-white px-4 py-2 mb-4 rounded inline-block">Crear Nuevo Usuario</router-link>
    <table class="min-w-full bg-white">
      <thead class="bg-gray-800 text-white">
      <tr>
        <th class="w-1/3 px-4 py-2">Nombre</th>
        <th class="w-1/3 px-4 py-2">Email</th>
        <th class="w-1/3 px-4 py-2">Acciones</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id" class="bg-gray-100">
        <td class="border px-4 py-2">{{ user.nombre }}</td>
        <td class="border px-4 py-2">{{ user.email }}</td>
        <td class="border px-4 py-2">
          <router-link :to="`/users/edit/${user.id}`" class="bg-yellow-500 text-white px-2 py-1 rounded inline-block">Editar</router-link>
          <button @click="deleteUser(user.id)" class="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import apiClient from '../api/axios'

export default defineComponent({
  name: 'UserManagement',
  data() {
    return {
      users: []
    }
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await apiClient.get('/usuarios');
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async deleteUser(id: string) {
      try {
        await apiClient.delete(`/usuarios/${id}`);
        await this.fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  },
  mounted() {
    this.fetchUsers();
  }
})
</script>

<style scoped>
.user-management {
  padding: 20px;
}
</style>
