<template>
  <div class="edit-user">
    <h1 class="text-2xl font-bold mb-4">Editar Usuario</h1>
    <form @submit.prevent="updateUser">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Nombre</label>
        <input v-model="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Nombre">
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
        <input v-model="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email">
      </div>
      <div class="flex items-center justify-between">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Actualizar Usuario
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import apiClient from '../api/axios'

export default defineComponent({
  name: 'EditUser',
  setup() {
    const name = ref('')
    const email = ref('')
    const route = useRoute()
    const router = useRouter()
    const userId = route.params.id as string

    onMounted(async () => {
      try {
        const response = await apiClient.get(`/usuarios/${userId}`)
        name.value = response.data.nombre
        email.value = response.data.email
      } catch (error) {
        console.error('Error fetching user details:', error)
      }
    })

    const updateUser = async () => {
      try {
        const updatedUser = { nombre: name.value, email: email.value }
        await apiClient.put(`/usuarios/${userId}`, updatedUser)
        router.push('/users')
      } catch (error) {
        console.error('Error updating user:', error)
      }
    }

    return {
      name,
      email,
      updateUser
    }
  }
})
</script>

<style scoped>
.edit-user {
  padding: 20px;
}
</style>
