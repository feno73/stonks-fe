<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '../api/axios'

export default defineComponent({
  name: 'CreateActivo',
  setup() {
    const nombre = ref('')
    const ticker = ref('')
    const tipo = ref('')
    const router = useRouter()

    const createActivo = async () => {
      try {
        const newActivo = { nombre: nombre.value, ticker: ticker.value.toUpperCase(), tipo: tipo.value.toUpperCase() }
        await apiClient.post('/activos', newActivo)
        router.push('/activos')
      } catch (error) {
        console.error('Error creando el  activo:', error)
      }
    }

    return {
      nombre,
      ticker,
      tipo,
      createActivo
    }
  }
})
</script>

<template>
  <div class="create-user">
    <h1 class="text-2xl font-bold mb-4">Crear Nuevo Activo</h1>
    <form @submit.prevent="createActivo">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="nombre">Nombre</label>
        <input v-model="nombre" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nombre" type="text" placeholder="Coca-Cola">
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="ticker">Ticker</label>
        <input v-model="ticker" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="ticker" type="text" placeholder="KO">
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="tipo">Tipo</label>
        <select v-model="tipo" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="tipo">
          <option value="CEDEAR">CEDEAR</option>
          <option value="Acción">Acción</option>
          <option value="Bonos">Bonos</option>
          <!-- Añade más opciones según sea necesario -->
        </select>
      </div>
      <div class="flex items-center justify-between">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Crear Activo
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>