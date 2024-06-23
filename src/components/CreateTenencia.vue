<template>
  <div class="create-user">
    <h1 class="text-2xl font-bold mb-4">Crear Nueva Tenencia</h1>
    <form @submit.prevent="createTenencia">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="activo">Seleccionar activo</label>
        <select
            id="activo"
            v-model="activo"
            class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
            required
        >
          <option value="" disabled selected>Seleccione un activo</option>
          <option v-for="activo in activos" :key="activo.id" :value="activo.id">
            {{ activo.nombre }}
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="cantidad">Cantidad</label>
        <input v-model="cantidad" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="cantidad" type="number" placeholder="Cantidad">
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="precio_compra">Precio de compra</label>
        <input v-model.number="precio_compra" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="precio_compra" placeholder="Precio de compra">
      </div>
      <div class="mb-4">
        <label for="date-picker" class="block text-gray-700">Fecha de compra:</label>
        <DatePicker v-model="fecha_compra" class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"></DatePicker>
      </div>
      <div class="flex items-center justify-between">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Crear Activo
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import DatePicker from 'vue3-datepicker';
import apiClient from '../api/axios';
import { formatDate } from '@/utils/date';

export default defineComponent({
  name: 'CreateTenencia',
  components: { DatePicker },
  setup() {
    const router = useRouter();
    const usuario = '1235fc46-012f-4c6b-b5aa-7cfeea5c4d84';
    const activos = ref([]);
    const activo = ref('');
    const cantidad = ref(0);
    const precio_compra = ref(0);
    const fecha_compra = ref(null);

    const fetchActivos = async () => {
      try {
        const response = await apiClient.get('/activos');
        activos.value = response.data;
      } catch (error) {
        console.error('Error fetching activos:', error);
      }
    };

    const createTenencia = async () => {
      try {
        const newTenencia = {
          usuario_id: usuario,
          activo_id: activo.value,
          cantidad: cantidad.value,
          precio_compra: precio_compra.value,
          fecha_compra: fecha_compra.value ? fecha_compra.value.toISOString() : null,
        };
        await apiClient.post('/tenencias', newTenencia);
        router.push('/tenencias');
      } catch (error) {
        console.error('Error creando tenencia:', error);
      }
    };

    onMounted(() => {
      fetchActivos();
    });

    return {
      activos,
      activo,
      cantidad,
      precio_compra,
      fecha_compra,
      createTenencia,
      formatDate,
    };
  },
});
</script>

<style scoped>
/* Puedes agregar estilos adicionales aquí si es necesario */
</style>
