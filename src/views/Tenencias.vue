<script lang="ts">
import { defineComponent } from "vue";
import apiClient from "@/api/axios";
import { formatDate } from '@/utils/date';
import { roundToTwoDecimals } from "@/utils/round";

const usuario_id = '1235fc46-012f-4c6b-b5aa-7cfeea5c4d84'

export default defineComponent({
  name: 'Tenencias',
  data() {
    return {
      tenencias: []
    }
  },
  methods: {
    async fetchTenencias(usuario_id: string) {
      try {
        const response = await apiClient.get(`/tenencias/usuario/${usuario_id}`);
        this.tenencias = response.data;
      } catch (error) {
        console.error('Error recuperando tenencias:', error)
      }
    },
    formatDate,
    roundToTwoDecimals
  },
  mounted() {
    this.fetchTenencias(usuario_id);
  }
})
</script>
<template>
  <div class="container mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4">Cartera</h2>
    <router-link to="/tenencias/create" class="bg-blue-500 text-white px-4 py-2 mb-4 rounded inline-block">Cargar Operacion</router-link>
    <table class="min-w-full border-collapse border border-gray-200">
      <thead>
      <tr>
        <th class="border border-gray-200 px-4 py-2 bg-gray-100 text-left">Nombre</th>
        <th class="border border-gray-200 px-4 py-2 bg-gray-100 text-left">Ticker</th>
        <th class="border border-gray-200 px-4 py-2 bg-gray-100 text-left">Cantidad</th>
        <th class="border border-gray-200 px-4 py-2 bg-gray-100 text-left">Fecha de compra</th>
        <th class="border border-gray-200 px-4 py-2 bg-gray-100 text-left">Precio de compra</th>
        <th class="border border-gray-200 px-4 py-2 bg-gray-100 text-left">Precio actual</th>
        <th class="border border-gray-200 px-4 py-2 bg-gray-100 text-left">Precio actual USD</th>
        <th class="border border-gray-200 px-4 py-2 bg-gray-100 text-left">Ganancia $</th>
        <th class="border border-gray-200 px-4 py-2 bg-gray-100 text-left">Ganancia %</th>
        <th class="border border-gray-200 px-4 py-2 bg-gray-100 text-left">Ganancia USD</th>
        <th class="border border-gray-200 px-4 py-2 bg-gray-100 text-left">Ganancia USD %</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="tenencia in tenencias" :key="tenencia.id" class="bg-gray-100">
        <td class="border border-gray-200 px-4 py-2">{{ tenencia.nombre }}</td>
        <td class="border border-gray-200 px-4 py-2">{{ tenencia.ticker }}</td>
        <td class="border border-gray-200 px-4 py-2">{{ tenencia.cantidad }}</td>
        <td class="border border-gray-200 px-4 py-2">{{ formatDate(tenencia.fecha_compra) }}</td>
        <td class="border border-gray-200 px-4 py-2">{{ roundToTwoDecimals(tenencia.precio_compra) }}</td>
        <td class="border border-gray-200 px-4 py-2">{{ roundToTwoDecimals(tenencia.precio_actual) }}</td>
        <td class="border border-gray-200 px-4 py-2">{{ roundToTwoDecimals(tenencia.precio_actual_usd) }}</td>
        <td class="border border-gray-200 px-4 py-2">{{ roundToTwoDecimals(tenencia.ganancia) }}</td>
        <td class="border border-gray-200 px-4 py-2">{{ roundToTwoDecimals(tenencia.ganancia_porcentaje) }}</td>
        <td class="border border-gray-200 px-4 py-2">{{ roundToTwoDecimals(tenencia.ganancia_usd) }}</td>
        <td class="border border-gray-200 px-4 py-2">{{ roundToTwoDecimals(tenencia.ganancia_porcentaje_usd) }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>