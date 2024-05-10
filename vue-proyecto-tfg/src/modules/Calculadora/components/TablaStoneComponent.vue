<template>
  <div class="flex flex-col gap-5">
    <h1
      class="text-center text-4xl font-bold first-letter:uppercase text-shadow text-stoneBackground-3"
    >
      Calcular el precio de una {{ $route.path.split('/').pop() }}
    </h1>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-10">
      <div>
        <h3
          class="block text-xl font-bold first-letter:uppercase text-shadow text-stoneBackground-3 mb-4"
        >
          Medidas de corte:
        </h3>
        <div class="flex flex-row justify-between items-center gap-2">
          <div class="relative w-full">
            <InputNumberComponent
              placeholder="Grosor"
              class="w-full"
              @changeNumber="handleChangeGrosor"
              @errorNumber="handleError"
            />
            <span v-if="grosor" class="absolute inset-y-3.5 right-10 text-gray-400">cm</span>
          </div>
          <FontAwesomeIcon
            :icon="['fas', 'xmark']"
            class="w-6 h-6 text-stoneBackgroundContrast-1 text-shadow-md font-bold"
          />
          <div class="relative w-full">
            <InputNumberComponent
              placeholder="Ancho"
              class="w-full"
              @changeNumber="handleChangeAncho"
              @errorNumber="handleError"
            />
            <span v-if="ancho" class="absolute inset-y-3.5 right-10 text-gray-400">cm</span>
          </div>
          <FontAwesomeIcon
            :icon="['fas', 'xmark']"
            class="w-6 h-6 text-stoneBackgroundContrast-1 text-shadow-md font-bold"
          />
          <div class="relative w-full">
            <InputNumberComponent
              placeholder="Largo"
              class="w-full"
              @changeNumber="handleChangeLargo"
              @errorNumber="handleError"
            />
            <span v-if="largo" class="absolute inset-y-3.5 right-10 text-gray-400">cm</span>
          </div>
        </div>
      </div>
      <newSelectMaquinaComponent
        :maquinasSeleccionadas="maquinas"
        :options="filteredOptions"
        @addMaquina="addMaquinasArray"
        @removeMaquina="removeMaquinasArray"
      />
      <div>
        <label
          for="terminacion"
          class="block text-xl mb-4 font-bold first-letter:uppercase text-shadow text-stoneBackground-3"
        >
          Terminación
        </label>
        <ul
          class="py-2 items-center w-full text-lg text-secondary bg-stoneBackground-2 bg-opacity-50 border border-stone border-opacity-50 rounded-lg sm:flex"
        >
          <li class="w-full border-b border-stone border-opacity-50 sm:border-b-0 sm:border-r">
            <div class="flex items-center ps-3">
              <input
                id="soloCortado"
                type="radio"
                v-model="terminacion"
                value="0"
                name="terminacion"
                class="accent-stoneBackgroundContrast-1 w-8 h-8 text-stone bg-stone border-stoneBackground-5"
                checked
              />
              <label
                for="soloCortado"
                class="w-full py-3 ms-2 text-lg font-bold text-secondary flex flex-row gap-1.5 items-center"
                >Solo cortado <span class="text-xs">(por defecto)</span></label
              >
            </div>
          </li>
          <li class="w-full border-b border-stone border-opacity-50 sm:border-b-0 sm:border-r">
            <div class="flex items-center ps-3">
              <input
                id="apomazado"
                type="radio"
                v-model="terminacion"
                value="20"
                name="terminacion"
                class="accent-stoneBackgroundContrast-1 w-8 h-8 text-stone bg-stone border-stoneBackground-3"
              />
              <label for="apomazado" class="w-full py-3 ms-2 text-lg font-bold text-secondary"
                >Apomazado</label
              >
            </div>
          </li>
          <li class="w-full border-b border-stone border-opacity-50 sm:border-b-0 sm:border-r">
            <div class="flex items-center ps-3">
              <input
                id="envejecido"
                type="radio"
                v-model="terminacion"
                value="30"
                name="terminacion"
                class="accent-stoneBackgroundContrast-1 w-8 h-8 text-stone bg-stone border-stoneBackground-3"
              />
              <label for="envejecido" class="w-full py-3 ms-2 text-lg font-bold text-secondary"
                >Envejecido</label
              >
            </div>
          </li>
          <li class="w-full">
            <div class="flex items-center ps-3">
              <input
                id="abujardado"
                type="radio"
                v-model="terminacion"
                value="40"
                name="terminacion"
                class="accent-stoneBackgroundContrast-1 w-8 h-8 text-stone bg-stone border-stoneBackground-3"
              />
              <label for="abujardado" class="w-full py-3 ms-2 text-lg font-bold text-secondary"
                >Abujardado</label
              >
            </div>
          </li>
        </ul>
      </div>
      <div>
        <label
          for="embalaje"
          class="block mb-4 text-xl font-bold first-letter:uppercase text-shadow text-stoneBackground-3"
        >
          Embalaje
        </label>
        <ul class="grid w-full gap-6 md:grid-cols-2">
          <li>
            <input
              v-model="embalaje"
              type="radio"
              id="noEmbalado"
              name="embalaje"
              value="0"
              class="hidden peer"
              checked
            />
            <label
              for="noEmbalado"
              class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-stoneBackgroundContrast-1 peer-checked:text-stoneBackgroundContrast-1 hover:text-stoneBackgroundContrast-1 hover:bg-gray-100 peer-checked:shadow peer-checked:text-shadow"
            >
              <div class="block">
                <div class="w-full text-lg font-semibold flex flex-row gap-1.5 items-center">
                  No embalado <span class="text-xs">(por defecto)</span>
                </div>
                <div class="w-full text-lg">No conlleva cargo extra</div>
              </div>
            </label>
          </li>
          <li>
            <input
              v-model="embalaje"
              type="radio"
              id="embalado"
              name="embalaje"
              value="20"
              class="hidden peer"
              required
            />
            <label
              for="embalado"
              class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-stoneBackgroundContrast-1 peer-checked:text-stoneBackgroundContrast-1 hover:text-stoneBackgroundContrast-1 hover:bg-gray-100 peer-checked:shadow peer-checked:text-shadow"
            >
              <div class="block">
                <div class="w-full text-lg font-semibold">Embalado</div>
                <div class="w-full text-lg">Conlleva cargo extra</div>
              </div>
            </label>
          </li>
        </ul>
      </div>
      <template v-if="typeof sumables === 'number'">
        <h1 class="text-center text-4xl">{{ sumables }}€</h1>
      </template>
      <ButtonComponent text="Calcular" bgColor="bg-primary" type="submit" />
    </form>
    <LoandingComponent :fullScreen="true" :loading="loading" size="40px" />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      grosor: 0,
      largo: 0,
      ancho: 0,
      embalaje: 0,
      terminacion: 0,
      gastoGeneral: 0,
      maquina: null,
      consumibles: null,
      trabajadores: null,
      gastosEnergeticos: null,
      maquinas: [],
      sumables: [],
      error: {
        status: false,
        message: ''
      },
      loading: false,
      consumiblesMaquina: [],
      tabajadoresMaquina: [],
      gastosEnergeticosMaquina: [],
      options: []
    }
  },
  computed: {
    ...mapGetters('Maquinas', ['getMaquinas']),
    ...mapGetters('Consumible', ['getConsumibles']),
    ...mapGetters('Trabajadores', ['getTrabajadores']),
    ...mapGetters('GastosEnergeticos', ['getGastos']),
    ...mapGetters('GastosGenerales', ['getGastosGenerales']),
    filteredOptions() {
      let maquinas = this.getMaquinas

      return maquinas.filter((maquina) => {
        return !this.maquinas.some((m) => m.id === maquina.id)
      })
    }
  },
  methods: {
    async calculatePrice() {
      try {
        this.loading = true
        this.consumibles = []
        this.sumables = []

        this.consumibles = await this.getConsumiblesPorMaquina(this.maquinas)
        this.trabajadores = await this.getTrabajadoresPorMaquina(this.maquinas)
        this.gastosEnergeticos = await this.getGastosEnergeticosPorMaquina(this.maquinas)

        const consumiblesSum = this.consumibles.reduce(
          (sum, consumible) => sum + consumible.precio,
          0
        )
        console.log('Suma de consumibles', consumiblesSum)
        const trabajadoresSum = this.trabajadores.reduce(
          (sum, trabajador) => sum + trabajador.precio,
          0
        )
        console.log('Suma de trabajadores', trabajadoresSum)
        const gastosEnergeticosSum = this.gastosEnergeticos.reduce(
          (sum, gastoEnergetico) => sum + gastoEnergetico.coste_energia,
          0
        )
        console.log('Suma de gastos energeticos', gastosEnergeticosSum)
        this.gastoGeneral =
          (this.getGastosGenerales.reduce((sum, gastoGeneral) => sum + gastoGeneral.precio, 0) /
            this.getMaquinas.length) *
          this.maquinas.length
        console.log('Gasto general', this.gastoGeneral)
        this.sumables =
          Number(consumiblesSum) +
          Number(trabajadoresSum) +
          Number(gastosEnergeticosSum) +
          Number(this.gastoGeneral)
        this.sumables +=
          Number(this.grosor) +
          Number(this.largo) +
          Number(this.ancho) +
          Number(this.terminacion) +
          Number(this.embalaje)
      } catch (e) {
        //418
        this.handleError(e)
      } finally {
        setTimeout(() => {
          this.loading = false
        }, 1000)
      }
    },
    async handleSubmit() {
      await this.calculatePrice()
    },
    addMaquinasArray(maquinaId) {
      if (!this.maquinas.some((maquina) => maquina === maquinaId)) {
        this.maquinas.push(maquinaId)
      } else {
        this.handleError('La máquina está seleccionada')
      }
    },
    removeMaquinasArray(maquinaId) {
      this.maquinas = this.maquinas.filter((m) => m.id !== maquinaId)
      this.consumiblesMaquina = []
    },
    handleChangeGrosor(e) {
      this.grosor = e
      let sum = 0
      for (const key in this.grosor) {
        sum += this.grosor[key]
      }
      this.grosor = sum
      return this.grosor
    },
    handleChangeLargo(e) {
      this.largo = e
      let sum = 0
      for (const key in this.largo) {
        sum += this.largo[key]
      }
      this.largo = sum
      console.log(this.largo)
      return this.largo
    },
    handleChangeAncho(e) {
      this.ancho = e
      let sum = 0
      for (const key in this.ancho) {
        sum += this.ancho[key]
      }
      this.ancho = sum
      return this.ancho
    },
    handleError(e) {
      this.error.status = true
      this.error.message = e
    },

    async getConsumiblesPorMaquina(maquinas) {
      this.consumibles = []
      this.consumiblesMaquina = []
      this.consumibles = await this.getConsumibles
      for (const maquina of maquinas) {
        let consumible = this.consumibles.filter(
          (consumible) => consumible.id_maquina === maquina.id
        )

        this.consumiblesMaquina.push(...consumible)
      }
      // Remove duplicates from this.consumiblesMaquina
      this.consumiblesMaquina = [...new Set(this.consumiblesMaquina)]
      return this.consumiblesMaquina
    },
    async getTrabajadoresPorMaquina(maquinas) {
      this.trabajadores = []
      this.tabajadoresMaquina = []
      this.trabajadores = await this.getTrabajadores
      for (const maquina of maquinas) {
        let trabajador = this.trabajadores.filter(
          (trabajador) => trabajador.id_maquina === maquina.id
        )

        this.tabajadoresMaquina.push(...trabajador)
      }
      // Remove duplicates from this.consumiblesMaquina
      this.tabajadoresMaquina = [...new Set(this.tabajadoresMaquina)]
      return this.tabajadoresMaquina
    },
    async getGastosEnergeticosPorMaquina(maquinas) {
      this.gastosEnergeticos = []
      this.gastosEnergeticosMaquina = []
      this.gastosEnergeticos = await this.getGastos
      for (const maquina of maquinas) {
        let gastoEnergetico = this.gastosEnergeticos.filter(
          (gastoEnergetico) => gastoEnergetico.id_maquina === maquina.id
        )

        this.gastosEnergeticosMaquina.push(...gastoEnergetico)
      }
      // Remove duplicates from this.consumiblesMaquina
      this.gastosEnergeticosMaquina = [...new Set(this.gastosEnergeticosMaquina)]
      return this.gastosEnergeticosMaquina
    }
  },
  components: {
    // InputTextComponent: defineAsyncComponent(
    //   () => import('@/modules/shared/components/InputTextComponent.vue')
    // ),
    newSelectMaquinaComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/newSelectMaquinaComponent.vue')
    ),
    InputNumberComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/InputNumberComponent.vue')
    ),
    ButtonComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/ButtonComponent.vue')
    ),
    LoandingComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/LoadingComponent.vue')
    )
  }
}
</script>
<style scoped>
.form-radio:checked {
  background-color: #2563eb;
}
.wrapper {
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 10px;
}
.card {
  position: relative;
  width: 150px;
  height: 100px;
  background: #fff;
  border-radius: 10px;
  transition: all 0.3s;
}
.card:hover {
  transform: scale(1.05);
}
.input {
  position: relative;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  cursor: pointer;
  appearance: none;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  z-index: 10;
  box-shadow:
    1px 1px 10px #aaaaaa,
    -1px -1px 10px #ffffff;
}
.input + .check::before {
  content: '';
  position: absolute;
  top: 15px;
  right: 15px;
  width: 16px;
  height: 16px;
  border: 2px solid #d0d0d0;
  border-radius: 50%;
  background-color: #e8e8e8;
}
.input:checked + .check::after {
  content: '';
  position: absolute;
  top: 19px;
  right: 19px;
  width: 12px;
  height: 12px;
  background-color: rgba(255, 0, 0, 0.7);
  border-radius: 50%;
}
.input[value='standart']:checked + .check::after {
  background-color: rgba(255, 165, 0, 0.7);
}
.input[value='premium']:checked + .check::after {
  background-color: rgba(0, 128, 0, 0.7);
}
.input[value='basic']:checked {
  border: 1.5px solid rgba(255, 0, 0, 0.7);
}
.input[value='standart']:checked {
  border: 1.5px solid rgba(255, 165, 0, 0.7);
}
.input[value='premium']:checked {
  border: 1.5px solid rgba(0, 128, 0, 0.7);
}
.label {
  color: #323232;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}
.label .title {
  margin: 15px 0 0 15px;
  font-weight: 900;
  font-size: 15px;
  letter-spacing: 1.5px;
}
.label .price {
  margin: 20px 0 0 15px;
  font-size: 20px;
  font-weight: 900;
}
.label .span {
  color: gray;
  font-weight: 700;
  font-size: 15px;
}
</style>
