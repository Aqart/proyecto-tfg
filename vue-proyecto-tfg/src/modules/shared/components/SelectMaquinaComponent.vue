<template>
  <div class="mt-4">
    <!-- AñADIR QUE SI NO SE SELECCIONA NINGUNA MÁQUINA MANDE UN MENSAJE DE ERROR -->
    <h2 v-if="maquinasSeleccionadas.length > 0">Máquinas seleccionadas:</h2>
    <div v-for="(maquina, index) in maquinasSeleccionadas" :key="index" class="grid grid-cols-2">
      <div class="align-middle">
        {{ maquina.nombre }}
      </div>
    </div>
    <div class="flex items-center">
      <div class="flex-auto">
        <label
          for="máquinas"
          class="block mb-2 text-xl font-medium first-letter:uppercase text-shadow text-stoneBackground-3"
        >
          Seleccione máquinas
        </label>
        <select
          v-model="selected"
          name="máquinas"
          @change="handleChange"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary focus:ring-1 focus:border-secondary focus:outline-none block w-full p-3 mb-4 shadow-sm"
        >
          <option :value="null" selected disabled hidden>Seleccione máquina</option>
          <option v-for="(option, index) in options" :key="index" :value="option.id">
            {{ option.nombre }}
          </option>
        </select>
      </div>
      <div class="pl-4 w-1/4">
        <ButtonComponent
          :text="'Añadir'"
          bgColor="bg-secondary"
          class="hover:bg-opacity-80"
          @click="addMaquina"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  props: {
    options: {
      type: Array,
      default: () => []
    },
    maquinasSeleccionadas: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selected: null
    }
  },
  components: {
    ButtonComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/ButtonComponent.vue')
    )
  },
  methods: {
    handleChange() {
      this.$emit('changeSelect', this.selected)
    },
    addMaquina() {
      if (this.selected) {
        console.log('SelectMaquinaComponent', this.selected)
        this.$emit('addMaquina', this.selected)
        this.selected = null
      }
    }
  },
  watch: {
    value(newValue) {
      this.selected = newValue
    },
    maquinasSeleccionadas: {
      handler(newValue) {
        console.log(newValue)
      },
      deep: true
    }
  }
}
</script>
