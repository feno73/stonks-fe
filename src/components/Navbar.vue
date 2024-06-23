<template>
  <nav class="bg-gray-800 p-4">
    <ul class="flex space-x-4">
      <li><router-link to="/" class="text-white">Dashboard</router-link></li>
      <li><router-link to="/users" class="text-white">Usuarios</router-link></li>
      <li><router-link to="/activos" class="text-white">Activos</router-link></li>
      <li><router-link to="/tenencias" class="text-white">Tenencias</router-link></li>
      <li><router-link to="/precios" class="text-white">Precios</router-link></li>
      <li><router-link to="/cotizacion" class="text-white">Cotizaciones</router-link></li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Navbar'
})
</script>

<style scoped>
nav {
  background-color: #2d3748;
}
.text-white {
  color: white;
}
</style>
