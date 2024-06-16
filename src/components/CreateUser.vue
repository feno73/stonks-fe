<template>
  <div class="create-user">
    <h1 class="text-2xl font-bold mb-4">Crear Nuevo Usuario</h1>
    <form @submit.prevent="createUser">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Nombre</label>
        <input v-model="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Nombre">
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
        <input v-model="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email">
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Contraseña</label>
        <input v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Contraseña">
      </div>
      <div class="flex items-center justify-between">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Crear Usuario
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '../api/axios'

export default defineComponent({
  name: 'CreateUser',
  setup() {
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const router = useRouter()

    const createUser = async () => {
      try {
        const newUser = { nombre: name.value, email: email.value, password: password.value }
        await apiClient.post('/usuarios', newUser)
        router.push('/users')
      } catch (error) {
        console.error('Error creating user:', error)
      }
    }

    return {
      name,
      email,
      password,
      createUser
    }
  }
})
</script>

<style scoped>
.create-user {
  padding: 20px;
}
</style>
