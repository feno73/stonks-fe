<template>
  <div class="activos-management">
    <h1 class="text-2xl font-bold mb-4">Gestión de Activos</h1>
    <router-link to="/activos/create" class="bg-blue-500 text-white px-4 py-2 mb-4 rounded inline-block">Crear Nuevo Activo</router-link>
    <table class="min-w-full bg-white">
      <thead class="bg-gray-800 text-white">
      <tr>
        <th class="w-1/3 px-4 py-2">Nombre</th>
        <th class="w-1/3 px-4 py-2">Ticker</th>
        <th class="w-1/3 px-4 py-2">Tipo</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="activo in activos" :key="activo.id" class="bg-gray-100">
        <td class="border px-4 py-2">{{ activo.nombre }}</td>
        <td class="border px-4 py-2">{{ activo.ticker }}</td>
        <td class="border px-4 py-2">{{ activo.tipo }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import apiClient from '../api/axios'

export default defineComponent({
  name: 'ActivosManagement',
  data() {
    return {
      activos: []
    }
  },
  methods: {
    async fetchActivos() {
      try {
        const response = await apiClient.get('/activos');
        this.activos = response.data;
      } catch (error) {
        console.error('Error recuperando activos:', error);
      }
    },
    async deleteActivos(id: string) {
      try {
        await apiClient.delete(`/usuarios/${id}`);
        await this.fetchActivos();
      } catch (error) {
        console.error('Error eliminando activo:', error);
      }
    }
  },
  mounted() {
    this.fetchActivos();
  }
})
</script>

<style scoped>

</style>