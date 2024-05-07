<template>
  <div class="mt-4">
    <!-- AñADIR QUE SI NO SE SELECCIONA NINGUNA MÁQUINA MANDE UN MENSAJE DE ERROR -->
    <div>
      <h2
        class="block text-xl font-medium first-letter:uppercase text-shadow text-stoneBackground-3"
      >
        Máquinas usadas en el proceso:
      </h2>

      <div
        v-if="maquinasSeleccionadas.length > 0"
        class="mt-2 max-h-24 sm:max-h-44 md:max-h-56 lg:max-h-64 xl:max-h-80 overflow-hidden py-5 bg-stone rounded-lg bg-opacity-20"
      >
        <div class="flex flex-row items-start justify-start gap-3 list-none pl-2">
          <div
            v-for="(maquina, index) in maquinasSeleccionadas"
            :key="index"
            class="flex items-center bg-stoneBackground-2 shadow py-2 px-4 rounded-md text-md font-bold text-stoneBackgroundContrast-1 border border-stone border-opacity-50"
          >
            <span>{{ index + 1 + ': ' + maquina.nombre }}</span>
            <ButtonComponent
              type="button"
              text="X"
              bgColor="bg-transparent"
              otherClasses="h-5 w-5 rounded-md text-stoneBackgroundContrast-2 hover:scale-105 justify-self-end ml-2"
              @click="removeMaquina(maquina.id)"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-center">
      <div
        v-if="errorMessage"
        class="inline-block text-sm mt-3 bg-primary bg-opacity-20 text-stoneBackgroundContrast-2 text-opacity-80 px-3 py-1 rounded-sm text-center"
      >
        <FontAwesomeIcon
          :icon="['fas', 'triangle-exclamation']"
          class="text-stoneBackgroundContrast-2 scale-125 flex-shrink-0 inline w-3 h-3 me-1"
        />
        {{ errorMessage }}
      </div>
    </div>
    <div class="flex items-center">
      <select
        v-model="selected"
        name="máquinas"
        @change="handleChange"
        class="mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-secondary focus:ring-1 focus:border-secondary focus:outline-none block w-full p-3 shadow-sm"
      >
        <option :value="null" selected disabled hidden>Seleccione máquina de corte</option>
        <option v-for="(option, index) in options" :key="index" :value="option.id">
          {{ option.nombre }}
        </option>
      </select>
      <div class="pl-4 w-1/4">
        <ButtonComponent
          type="button"
          :text="'Añadir'"
          bgColor="bg-primary"
          class="hover:bg-opacity-70"
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
      selected: null,
      errorMessage: ''
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
        if (!this.maquinasSeleccionadas.some((maquina) => maquina.id === this.selected)) {
          this.$emit('addMaquina', this.selected)
          this.selected = null
          this.errorMessage = ''
        } else {
          this.errorMessage = 'La máquina está seleccionada'
          setTimeout(() => {
            this.errorMessage = ''
          }, 6000)
        }
      } else {
        this.errorMessage = 'No ha seleccionado ninguna máquina'
        setTimeout(() => {
          this.errorMessage = ''
        }, 6000)
      }
    },
    removeMaquina(id) {
      this.$emit('removeMaquina', id)
      this.errorMessage = ''
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
