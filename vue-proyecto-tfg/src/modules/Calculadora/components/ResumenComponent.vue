<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-row gap-5">
      <ul v-for="maquina in maquinas" :key="maquina.id">
        <!--RECORRER LAS MAQUINAS-->
        <li>{{ maquina.nombre }}</li>
        <li class="flex flex-col gap-1">
          <h1>Consumibles</h1>
          <ul v-for="consumible in getConsumiblesMaquina(maquina.id)" :key="consumible.id">
            <li>{{ consumible.nombre }} - {{ consumible.precio }}€</li>
          </ul>
          <h1>Gastos Energeticos</h1>
          <ul v-for="gastoEnergetico in getGastosEnergeticos(maquina.id)" :key="gastoEnergetico.id">
            <li>{{ gastoEnergetico.nombre }} - {{ gastoEnergetico.coste_energia }}€</li>
          </ul>
          <h1>Trabajadores</h1>
          <ul v-for="trabajador in getTrabajadores(maquina.id)" :key="trabajador.id">
            <li>{{ trabajador.nombre }} - {{ trabajador.precio }}€</li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="flex flex-col">
      <h3 class="text-center text-2xl">Gastos generales: {{ gastoGeneral }}€</h3>
      <h3 class="text-center text-2xl">Coste material: {{ costeMaterial }}€</h3>
      <h1 class="text-center text-3xl">TOTAL: {{ precio }}€</h1>
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
    }
  },
  data() {
    return {
      consumiblesMaquina: [],
      gastosEnergeticosMaquina: [],
      trabajadoresMaquina: []
    }
  },
  onMounted() {
    this.consumiblesMaquina = this.consumibles
  },
  methods: {
    getConsumiblesMaquina(maquina) {
      this.consumiblesMaquina = this.consumibles.filter(
        (consumible) => consumible.id_maquina === maquina
      )
      return this.consumiblesMaquina
    },
    getGastosEnergeticos(maquina) {
      this.gastosEnergeticosMaquina = this.gastosEnergeticos.filter(
        (gasto) => gasto.id_maquina === maquina
      )
      return this.gastosEnergeticosMaquina
    },
    getTrabajadores(maquina) {
      this.trabajadoresMaquina = this.trabajadores.filter(
        (trabajador) => trabajador.id_maquina === maquina
      )
      return this.trabajadoresMaquina
    }
  }
}
</script>

<style>
</style>