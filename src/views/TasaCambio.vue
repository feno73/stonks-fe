<script lang="ts">
import {DefineComponent, defineComponent, ref} from "vue";
import apiClient from "@/api/axios";
import { formatDate } from "@/utils/date";

export default defineComponent({
  name: "TasaCambio",
  data() {
    return {
      tasascambio: [],
      currentPage: 1,
      lastPage: ref(''),
    }
  },
  methods: {
    async fetchTasasCambio() {
      try {
        const response =  await apiClient.get(`/tasascambio?page=${this.currentPage}&limit=10`);
        this.tasascambio = response.data.items;
        this.currentPage = response.data.currentPage;
        this.lastPage = response.data.totalPages;
      } catch (error) {
        console.error('Error recuperando tasas de cambio', error);
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchTasasCambio()
      }
    },
    nextPage() {
      if (this.currentPage < this.lastPage) {
        this.currentPage++;
        this.fetchTasasCambio()
      }
    },
    formatDate
  },
  mounted() {
      this.fetchTasasCambio();
  },
})
</script>

<template>
  <div class="container mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4">Cotizaciones Dolar</h2>
    <router-link to="/cotizacion/create" class="bg-blue-500 text-white px-4 py-2 mb-4 rounded inline-block">Cargar Tasa de Cambio</router-link>
    <table class="min-w-full border-collapse border border-gray-200">
      <thead>
      <tr>
        <th class="border border-gray-200 px-4 py-2 bg-gray-100 text-left">Fecha</th>
        <th class="border border-gray-200 px-4 py-2 bg-gray-100 text-left">Cotizacion</th>
        <th class="border border-gray-200 px-4 py-2 bg-gray-100 text-left">Tipo</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="tasacambio in tasascambio" :key="tasacambio.id" class="bg-gray-100">
        <td class="border border-gray-200 px-4 py-2">{{ formatDate(tasacambio.fecha) }}</td>
        <td class="border border-gray-200 px-4 py-2">{{ tasacambio.tasa_usd_ars }}</td>
        <td class="border border-gray-200 px-4 py-2">{{ tasacambio.tipo }}</td>
      </tr>
      </tbody>
    </table>
  </div>
  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1">Anterior</button>
    <span>Pagina {{ currentPage }} de {{ lastPage }}</span>
    <button @click="nextPage" :disabled="currentPage === lastPage">Siguiente</button>
  </div>
</template>

<style scoped>

</style>