<script lang="ts">
import { defineComponent } from "vue";
import apiClient from "@/api/axios";
import { formatDate } from "@/utils/date";
import { roundToTwoDecimals } from "@/utils/round";
import { formatPrice } from "@/utils/format-price";

const usuario_id = "1235fc46-012f-4c6b-b5aa-7cfeea5c4d84";
const base_statics = "http://localhost:3000/uploads/";

export default defineComponent({
  name: "Tenencias",
  data() {
    return {
      result: [],
      tenencias: [],
      totals: [],
      datosCargados: false,
      usuario_id: usuario_id,
      base_statics: base_statics,
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
    this.totals = this.result.totals;
    (this.datosCargados = true);
  },
});
</script>

<template>
  <Panel header="Totales" :value="totals" >
    <div class="grid grid-cols-6 gap-4">
      <Card>
        <template #title>Total</template>
        <template #content>
          <p class="m-0 text-xl">
            $ {{ formatPrice(totals.total_precio_venta) }}
          </p>
        </template>
      </Card>
      <Card>
        <template #title>Total USD</template>
        <template #content>
          <p class="m-0 text-xl">
            $ {{ formatPrice(totals.total_precio_venta_usd) }}
          </p>
        </template>
      </Card>
      <Card>
        <template #title>Ganancia</template>
        <template #content>
          <p class="m-0 text-xl">
            $ {{ formatPrice(totals.total_ganancia) }}
          </p>
        </template>
      </Card>
      <Card>
        <template #title>Ganancia USD</template>
        <template #content>
          <p class="m-0 text-xl">
            $ {{ formatPrice(totals.total_ganancia_usd) }}
          </p>
        </template>
      </Card>
      <Card>
        <template #title>Rendimiento</template>
        <template #content>
          <p class="m-0 text-xl">
            {{ roundToTwoDecimals(totals.total_ganancia_porcentaje) }} %
          </p>
        </template>
      </Card>
      <Card>
        <template #title>Rendimiento USD</template>
        <template #content>
          <p class="m-0 text-xl">
            {{ roundToTwoDecimals(totals.total_ganancia_porcentaje_usd) }} %
          </p>
        </template>
      </Card>
    </div>

  </Panel>
  <DataTable :value="tenencias" resizableColumns columnResizeMode="fit" stripedRows tableStyle="min-width: 50rem">
    <template #header>
      <div class="flex flex-wrap items-center justify-between gap-2">
        <span class="text-xl font-bold">Cartera CEDEARs</span>
        <Button icon="pi pi-refresh" rounded raised @click="fetchTenencias(usuario_id)"/>
      </div>
    </template>

    <Column field="nombre" header="Nombre">
      <template #body="slotProps">
        <div class="flex flex-row items-center gap-2">
          <img :src="base_statics + slotProps.data.imagen" :alt="slotProps.data.nombre" class="w-24 rounded" />
          <div class="flex flex-col">
            <span>{{ slotProps.data.ticker }}</span>
            <span>{{ slotProps.data.nombre }}</span>
          </div>
        </div>
      </template>
    </Column>
    <Column field="cantidad" header="Cantidad"></Column>
    <Column field="fecha_compra" header="Fecha Compra">
      <template #body="slotProps">
        {{ formatDate(slotProps.data.fecha_compra) }}
      </template>
    </Column>
    <Column field="precio_compra" header="Precio Compra">
      <template #body="slotProps">
        {{ formatPrice(slotProps.data.precio_compra * slotProps.data.cantidad) }}
      </template>
    </Column>
    <Column field="precio_actual" header="Precio Actual">
      <template #body="slotProps">
        <div :class="{
          'text-green-500': slotProps.data.precio_actual > slotProps.data.precio_compra,
          'text-red-500': slotProps.data.precio_actual < slotProps.data.precio_compra,
        }">
          {{ formatPrice(slotProps.data.precio_venta) }}
        </div>
      </template>
    </Column>
    <Column field="precio_actual" header="Precio Actual USD">
      <template #body="slotProps">
        <div :class="{
          'text-green-500': slotProps.data.precio_actual_usd > slotProps.data.precio_compra_usd,
          'text-red-500': slotProps.data.precio_actual_usd < slotProps.data.precio_compra_usd,
        }">
          {{ formatPrice(slotProps.data.precio_venta_usd) }}
        </div>
      </template>
    </Column>
    <Column field="precio_actual" header="Ganancia">
      <template #body="slotProps">
        <div :class="{
          'text-green-500': slotProps.data.ganancia >= 0,
          'text-red-500': slotProps.data.ganancia < 0,
        }">
          {{ formatPrice(slotProps.data.ganancia) }}
        </div>
      </template>
    </Column>
    <Column field="precio_actual" header="Ganancia USD">
      <template #body="slotProps">
        <div :class="{
          'text-green-500': slotProps.data.ganancia_usd >= 0,
          'text-red-500': slotProps.data.ganancia_usd < 0,
        }">
          {{ formatPrice(slotProps.data.ganancia_usd) }}
        </div>
      </template>
    </Column>
    <Column field="precio_actual" header="Ganancia %">
      <template #body="slotProps">
        <div :class="{
          'text-green-500': slotProps.data.ganancia_porcentaje >= 0,
          'text-red-500': slotProps.data.ganancia_porcentaje < 0,
        }">
          {{ formatPrice(slotProps.data.ganancia_porcentaje) }}
        </div>
      </template>
    </Column>
    <Column field="precio_actual" header="Ganancia % USD">
      <template #body="slotProps">
        <div :class="{
          'text-green-500': slotProps.data.ganancia_porcentaje_usd >= 0,
          'text-red-500': slotProps.data.ganancia_porcentaje_usd < 0,
        }">
          {{ formatPrice(slotProps.data.ganancia_porcentaje_usd) }}
        </div>
      </template>
    </Column>
  </DataTable>
</template>

<style scoped></style>
