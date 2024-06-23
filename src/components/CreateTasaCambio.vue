<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import apiClient from "@/api/axios";
import DatePicker from "vue3-datepicker";

export default defineComponent({
  name: 'CreateTasaCambio',
  components: { DatePicker },
  setup() {
    const fecha = ref('');
    const tasa_usd_ars = ref('');
    const tipo = ref('');
    const router = useRouter();

    const createTasaCambio = async () => {
      try {
        const newTasaCambio = { fecha: fecha.value, tasa_usd_ars: tasa_usd_ars.value, tipo: tipo.value.toUpperCase() };
        await apiClient.post('/tasascambio', newTasaCambio);
        router.push('/cotizacion');
      } catch (error) {
        console.error('Error al crear tasa de cambio', error);
      }
    }

    return {
      fecha,
      tasa_usd_ars,
      tipo,
      createTasaCambio
    };
  },
});

</script>

<template>
  <div class="create-user">
    <h1 class="text-2xl font-bold mb-4">Crear Nueva Cotización</h1>
    <form @submit.prevent="createTasaCambio">
      <div class="mb-4">
        <label for="date-picker" class="block text-gray-700">Fecha:</label>
        <DatePicker v-model="fecha" class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"></DatePicker>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="tasa_usd_ars">Cotización</label>
        <input v-model.number="tasa_usd_ars" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="precio_compra" placeholder="1121.15">
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="activo">Seleccionar tipo</label>
        <select
            id="tipo"
            v-model="tipo"
            class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
            required
        >
          <option value="" disabled selected>Seleccione un tipo</option>
          <option value="CCL">CCL</option>
          <option value="MEP">MEP</option>
          <option value="BLUE">BLUE</option>
          <option value="CRIPTO">CRIPTO</option>
        </select>
      </div>
      <div class="flex items-center justify-between">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Cargar Cotización
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>