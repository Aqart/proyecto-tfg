<template>
  <div
    class="flex flex-col justify-center gap-6 p-6 bg-stoneBackground-2 bg-opacity-50 border border-stone border-opacity-50 rounded-lg shadow-md"
  >
    <h1 class="text-3xl font-bold text-stoneBackground-3">
      Resumen de gasto:
      <span
        >{{
          $route.path.split('/').pop().charAt(0).toUpperCase() +
          $route.path.split('/').pop().slice(1)
        }}
        ({{ terminacion.charAt(0).toUpperCase() + this.terminacion.slice(1)
        }}{{ embalado > 0 ? ', Embalado' : ', No embalado' }})</span
      >
    </h1>
    <div class="flex flex-row gap-7 flex-wrap justify-center">
      <ul
        v-for="(maquina, index) in maquinas"
        :key="maquina.id"
        class="bg-white border border-stoneBackgroundContrast-1 text-stoneBackgroundContrast-3 px-10 py-6 rounded-lg shadow"
      >
        <!--RECORRER LAS MAQUINAS-->
        <li
          class="font-bold text-2xl mb-2 text-stoneBackgroundContrast-1 text-center flex items-center gap-3"
        >
          {{ index + 1 }}. {{ maquina.nombre }}
          <span class="text-sm">( {{ maquina.produccion_m2 }}m² producidos )</span>
        </li>
        <li class="flex flex-col gap-1">
          <h1 class="font-semibold text-md mt-3 mb-1 text-stoneBackgroundContrast-3">
            Consumibles:
          </h1>
          <div v-if="getConsumiblesMaquina(maquina.id).length">
            <ul v-for="consumible in getConsumiblesMaquina(maquina.id)" :key="consumible.id">
              <li>> {{ consumible.nombre }} - {{ consumible.precio }}€</li>
            </ul>
          </div>
          <p v-else class="text-gray-400">No conlleva gasto</p>

          <h1 class="font-semibold text-md mt-3 mb-1 text-stoneBackgroundContrast-3">
            Gastos Energéticos:
          </h1>
          <div v-if="getGastosEnergeticos(maquina.id).length">
            <ul
              v-for="gastoEnergetico in getGastosEnergeticos(maquina.id)"
              :key="gastoEnergetico.id"
            >
              <li>> {{ gastoEnergetico.nombre }} - {{ gastoEnergetico.coste_energia }}€</li>
            </ul>
          </div>
          <p v-else class="text-gray-400">No conlleva gasto</p>

          <h1 class="font-semibold text-md mt-3 mb-1 text-stoneBackgroundContrast-3">
            Trabajadores:
          </h1>
          <div v-if="getTrabajadores(maquina.id).length">
            <ul v-for="trabajador in getTrabajadores(maquina.id)" :key="trabajador.id">
              <li>> {{ trabajador.nombre_completo }} - {{ trabajador.precio }}€</li>
            </ul>
          </div>
          <p v-else class="text-gray-400">No conlleva gasto</p>
        </li>
      </ul>
    </div>
    <div class="flex flex-col bg-stoneBackground-1 bg-opacity-10 p-4 rounded-lg">
      <div class="flex flex-col space-y-4 md:space-y-0 md:flex-row justify-between">
        <h3 class="text-center text-2xl mb-2 font-bold text-stoneBackground-3">
          <span class="text-secondary font-semibold text-lg mr-2">Gastos generales: </span
          >{{ gastoGeneral.toFixed(2) }}€
        </h3>
        <h3 class="text-center text-2xl mb-2 font-bold text-stoneBackground-3">
          <span class="text-secondary font-semibold text-lg mr-2">Coste materia prima: </span
          >{{ costeMaterial.toFixed(2) }}€
        </h3>
        <h3 class="text-center text-xl font-bold text-stoneBackground-3">
          <span class="text-secondary font-semibold text-lg mr-2">Coste desperdicio: </span
          >{{ costeDesperdicio.toFixed(2) }}€
        </h3>
      </div>
      <h1 class="text-center text-4xl font-bold text-stoneBackgroundContrast-2 mt-4">
        <span class="font-semibold text-lg mr-2 text-stoneBackground-3">TOTAL: </span
        >{{ precio.toFixed(2) }}€
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    precio: {
      type: Number,
      required: true
    },
    maquinas: {
      type: Array,
      required: true
    },
    consumibles: {
      type: Array,
      required: true
    },
    gastosEnergeticos: {
      type: Array,
      required: true
    },
    trabajadores: {
      type: Array,
      required: true
    },
    gastoGeneral: {
      type: Number,
      required: true
    },
    costeMaterial: {
      type: Number,
      required: true
    },
    costeDesperdicio: {
      type: Number,
      required: true
    },
    terminacion: {
      type: String,
      default: 'solo cortado'
    },
    embalado: {
      type: Number,
      default: 0
    }
  },
  methods: {
    getConsumiblesMaquina(maquina) {
      return this.consumibles.filter((consumible) => consumible.id_maquina === maquina)
    },
    getGastosEnergeticos(maquina) {
      return this.gastosEnergeticos.filter((gasto) => gasto.id_maquina === maquina)
    },
    getTrabajadores(maquina) {
      return this.trabajadores.filter((trabajador) => trabajador.id_maquina === maquina)
    }
  }
}
</script>

<style></style>
