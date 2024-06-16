<template>
  <div class="dashboard">
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Resumen de Activos y Tenencias</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white p-4 shadow rounded">
          <h2 class="text-xl font-bold mb-2">Tenencias</h2>
          <table class="min-w-full bg-white">
            <thead class="bg-gray-800 text-white">
            <tr>
              <th class="px-4 py-2">Activo</th>
              <th class="px-4 py-2">Cantidad</th>
              <th class="px-4 py-2">Precio de Compra</th>
              <th class="px-4 py-2">Fecha de Compra</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="holding in holdings" :key="holding.id" class="bg-gray-100">
              <td class="border px-4 py-2">{{ holding.activo_nombre }}</td>
              <td class="border px-4 py-2">{{ holding.cantidad }}</td>
              <td class="border px-4 py-2">{{ holding.precio_compra }}</td>
              <td class="border px-4 py-2">{{ new Date(holding.fecha_compra).toLocaleDateString() }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import apiClient from '../api/axios'

export default defineComponent({
  name: 'Dashboard',
  setup() {
    const holdings = ref<any[]>([])

    const fetchHoldings = async () => {
      try {
        const holdingsResponse = await apiClient.get('/tenencias')
        const activosResponse = await apiClient.get('/activos')

        const activosMap = new Map(
            activosResponse.data.map((activo: any) => [activo.id, activo.nombre])
        )

        holdings.value = holdingsResponse.data.map((holding: any) => ({
          ...holding,
          activo_nombre: activosMap.get(holding.activo_id)
        }))
      } catch (error) {
        console.error('Error fetching holdings:', error)
      }
    }

    onMounted(() => {
      fetchHoldings()
    })

    return {
      holdings
    }
  }
})
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  background-color: #f3f4f6;
}
</style>