<template>
  <div class="w-full mx-auto">
    <div class="bg-stoneBackground-2 shadow-md rounded-t-xl my-6 mx-4">
      <!-- Consumibles -->
      <div class="border-b border-gray-200">
        <button
          @click="toggleConsumibles"
          class="flex items-center justify-between w-full px-5 py-3 text-xl text-stoneBackground-3 bg-stoneBackground-2 hover:bg-stoneBackground-4 hover:text-stoneBackgroundContrast-4 rounded-t-lg"
        >
          <span class="font-light"
            ><FontAwesomeIcon :icon="['fas', 'fa-droplet']" class="mr-2" />Consumibles</span
          >
          <FontAwesomeIcon
            :icon="['fas', 'caret-down']"
            :class="{ 'rotate-90': isOpenConsumibles }"
          />
        </button>
        <transition name="fade">
          <div v-if="isOpenConsumibles" class="p-5">
            <ul v-if="consumiblesMaquina.length > 0">
              <li v-for="consumible in consumiblesMaquina" :key="consumible.id">
                {{ consumible.nombre }}: {{ consumible.precio }}€
              </li>
            </ul>
            <p v-else class="text-stoneBackgroundContrast-3">Sin consumibles asociados</p>
          </div>
        </transition>
      </div>

      <!-- Trabajadores -->
      <div class="border-b border-gray-200">
        <button
          @click="toggleTrabajadores"
          class="flex items-center justify-between w-full px-5 py-3 text-xl text-stoneBackground-3 bg-stoneBackground-2 hover:bg-stoneBackground-4 hover:text-stoneBackgroundContrast-4 rounded-t-lg"
        >
          <span class="font-light"
            ><FontAwesomeIcon :icon="['fas', 'fa-person-digging']" class="mr-2" />Trabajadores</span
          >
          <FontAwesomeIcon
            :icon="['fas', 'caret-down']"
            :class="{ 'rotate-90': isOpenTrabajadores }"
          />
        </button>
        <transition name="fade">
          <div v-if="isOpenTrabajadores" class="p-5">
            <ul v-if="trabajadoresMaquina.length > 0">
              <li v-for="trabajador in trabajadoresMaquina" :key="trabajador.id">
                {{ trabajador.nombre }} {{ trabajador.apellidos }}: {{ trabajador.precio }}€
              </li>
            </ul>
            <p v-else class="text-stoneBackgroundContrast-3">Sin trabajadores asociados</p>
          </div>
        </transition>
      </div>
      <!-- Gastos -->
      <div class="border-b border-gray-200">
        <button
          @click="toggleGastos"
          class="flex items-center justify-between w-full px-5 py-3 text-xl text-stoneBackground-3 bg-stoneBackground-2 hover:bg-stoneBackground-4 hover:text-stoneBackgroundContrast-4 rounded-t-lg"
        >
          <span class="font-light"
            ><FontAwesomeIcon :icon="['fas', 'fa-bolt']" class="mr-2" />Gastos Energéticos</span
          >
          <FontAwesomeIcon :icon="['fas', 'caret-down']" :class="{ 'rotate-90': isOpenGastos }" />
        </button>
        <transition name="fade">
          <div v-if="isOpenGastos" class="p-5">
            <ul v-if="gastosMaquina.length > 0">
              <li v-for="gasto in gastosMaquina" :key="gasto.id">
                {{ gasto.nombre }}: {{ gasto.coste_energia }}€
              </li>
            </ul>
            <p v-else class="text-stoneBackgroundContrast-3">Sin gastos energéticos asociados</p>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isOpenConsumibles: false,
      isOpenTrabajadores: false,
      isOpenGastos: false,
      consumiblesMaquina: [],
      trabajadoresMaquina: [],
      gastosMaquina: []
    }
  },
  computed: {
    ...mapGetters('Consumible', ['getConsumibles']),
    ...mapGetters('Trabajadores', ['getTrabajadores']),
    ...mapGetters('GastosEnergeticos', ['getGastos'])
  },
  methods: {
    toggleConsumibles() {
      this.isOpenConsumibles = !this.isOpenConsumibles
    },
    toggleTrabajadores() {
      this.isOpenTrabajadores = !this.isOpenTrabajadores
    },
    toggleGastos() {
      this.isOpenGastos = !this.isOpenGastos
    },
    async obtenerConsumibles() {
      const response = await this.getConsumibles
      this.consumiblesMaquina = response.filter(
        (consumible) => consumible.id_maquina === this.data.id
      )
    },
    async obtenerTrabajadores() {
      const response = await this.getTrabajadores
      this.trabajadoresMaquina = response.filter(
        (trabajador) => trabajador.id_maquina === this.data.id
      )
    },
    async obtenerGastos() {
      const response = await this.getGastos
      this.gastosMaquina = response.filter((gasto) => gasto.id_maquina === this.data.id)
    }
  },
  mounted() {
    this.obtenerConsumibles()
    this.obtenerTrabajadores()
    this.obtenerGastos()
  }
}
</script>
