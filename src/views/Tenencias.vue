<script lang="ts">
import { defineComponent } from "vue";
import apiClient from "@/api/axios";
import { formatDate } from "@/utils/date";
import { roundToTwoDecimals } from "@/utils/round";
import { formatPrice } from "@/utils/format-price";

const usuario_id = "1235fc46-012f-4c6b-b5aa-7cfeea5c4d84";

export default defineComponent({
  name: "Tenencias",
  data() {
    return {
      result: [],
      tenencias: [],
      datosCargados: false,
      total_ganancia: 0,
      total_ganancia_usd: 0,
      total_precio_compra: 0,
      total_precio_compra_usd: 0,
      total_precio_venta: 0,
      total_precio_venta_usd: 0,
      total_ganancia_porcentaje: 0,
      total_ganancia_porcentaje_usd: 0,
    };
  },
  methods: {
    async fetchTenencias(usuario_id: string) {
      try {
        const response = await apiClient.get(
          `/tenencias/usuario/${usuario_id}`,
        );
        return response.data;
      } catch (error) {
        console.error("Error recuperando tenencias:", error);
      }
    },

    //const gananciaPorcenaje = ((precioActual - precio_compra) / precio_compra) * 100;
    formatDate,
    roundToTwoDecimals,
    formatPrice
  },
  async mounted() {
    this.result = await this.fetchTenencias(usuario_id);
    this.tenencias = this.result.items;
    (this.total_ganancia = this.result.totals.total_ganancia),
      (this.total_ganancia_usd = this.result.totals.total_ganancia_usd),
      (this.total_precio_compra = this.result.totals.total_precio_compra),
      (this.total_precio_compra_usd =
        this.result.totals.total_precio_compra_usd),
      (this.total_precio_venta = this.result.totals.total_precio_venta),
      (this.total_precio_venta_usd = this.result.totals.total_precio_venta_usd),
      (this.total_ganancia_porcentaje =
        this.result.totals.total_ganancia_porcentaje),
      (this.total_ganancia_porcentaje_usd =
        this.result.totals.total_ganancia_porcentaje_usd),
      (this.datosCargados = true);
  },
});
</script>

<template>
  <div>
    <h1>Lista de Tenencias</h1>
    <DataView :value="tenencias" layout="list">
      <template #list="slotProps">
        <div v-if="slotProps.items && slotProps.items.length">
          <div class="flex flex-col">
            <div v-for="(item, index) in slotProps.items" :key="index">
              <div
                class="flex flex-col sm:flex-row sm:items-center p-6 gap-4"
                :class="{
                  'border-t border-surface-200 dark:border-surface-700':
                    index !== 0,
                }"
              >
                <div
                  class="flex flex-col sm:flex-row sm:items-center p-6 gap-4"
                >
                  <div class="w-32 h-32 overflow-hidden rounded-full">
                    <img
                      class="object-cover w-full h-full"
                      :src="`https://i.pinimg.com/736x/77/13/cc/7713ccdd91965eef62c3a5839f3b94ff.jpg`"
                      :alt="item.nombre"
                    />
                  </div>
                </div>
                <div
                  class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6"
                >
                  <div
                    class="flex flex-row md:flex-col justify-between items-start gap-2"
                  >
                    <div>
                      <span
                        class="font-medium text-surface-500 dark:text-surface-400 text-sm"
                        >{{ item.ticker }}</span
                      >
                      <div class="text-lg font-medium mt-2">
                        {{ item.nombre }}
                      </div>
                    </div>
                    <div class="bg-surface-100 p-1">
                      <div
                        class="rounded p-2 flex-auto md:flex-initial whitespace-nowrap"
                        :class="{
                          'bg-red-400 pi pi-arrow-down-right':
                            item.ganancia_usd < 0,
                          'bg-green-500 pi pi-arrow-up-right':
                            item.ganancia_usd > 0,
                          'bg-gray-500 pi pi-equals': item.ganancia_usd === 0,
                        }"
                      >
                        <span class="font-sans ml-1">{{ roundToTwoDecimals(item.ganancia_usd) }} %</span>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col md:items-end gap-8">
                    <span class="text-xl font-semibold"
                      >$ {{ formatPrice(item.precio_venta) }}</span
                    >
                    <div class="flex flex-row-reverse md:flex-row gap-2">
                      <Button icon="pi pi-heart" outlined></Button>
                      <Button
                        icon="pi pi-shopping-cart"
                        label="Buy Now"
                        class="flex-auto md:flex-initial whitespace-nowrap"
                      ></Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </DataView>
    <div v-if="!datosCargados">Cargando datos...</div>
  </div>
</template>

<style scoped></style>
