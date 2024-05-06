<template>
  <div class="flex flex-col gap-3">
    <h1>Calcular Losa</h1>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-3">
      <InputNumberComponent
        label="Grosor de la Losa"
        placeholder="el grosor en centímetros"
        @changeNumber="handleChange"
        @errorNumber="handleError"
      />
      <SelectMaquinaComponent
        :maquinasSeleccionadas="maquinas"
        :options="getMaquinas"
        @addMaquina="addMaquinasArray"
        @removeMaquina="removeMaquinasArray"
      />

      <label
        for="terminacion"
        class="block mb-2 text-xl font-medium first-letter:uppercase text-shadow text-stoneBackground-3"
      >
        Terminación
      </label>
      <ul
        class="items-center w-full text-sm text-secondary bg-stoneBackground-2 bg-opacity-50 border border-stone border-opacity-50 rounded-lg sm:flex"
      >
        <li class="w-full border-b border-stone border-opacity-50 sm:border-b-0 sm:border-r">
          <div class="flex items-center ps-3">
            <input
              id="soloCortado"
              type="radio"
              value="10"
              name="terminacion"
              class="accent-stoneBackground-5 w-4 h-4 text-stone bg-stone border-stoneBackground-5"
            />
            <label for="soloCortado" class="w-full py-3 ms-2 text-sm font-medium text-secondary"
              >Solo cortado</label
            >
          </div>
        </li>
        <li class="w-full border-b border-stone border-opacity-50 sm:border-b-0 sm:border-r">
          <div class="flex items-center ps-3">
            <input
              id="apomazado"
              type="radio"
              value="20"
              name="terminacion"
              class="accent-stoneBackground-5 w-4 h-4 text-stone bg-stone border-stoneBackground-3"
            />
            <label for="apomazado" class="w-full py-3 ms-2 text-sm font-medium text-secondary"
              >Apomazado</label
            >
          </div>
        </li>
        <li class="w-full border-b border-stone border-opacity-50 sm:border-b-0 sm:border-r">
          <div class="flex items-center ps-3">
            <input
              id="envejecido"
              type="radio"
              value="30"
              name="terminacion"
              class="accent-stoneBackground-5 w-4 h-4 text-stone bg-stone border-stoneBackground-3"
            />
            <label for="envejecido" class="w-full py-3 ms-2 text-sm font-medium text-secondary"
              >Envejecido</label
            >
          </div>
        </li>
        <li class="w-full">
          <div class="flex items-center ps-3">
            <input
              id="abujardado"
              type="radio"
              value="40"
              name="terminacion"
              class="accent-stoneBackground-5 w-4 h-4 text-stone bg-stone border-stoneBackground-3"
            />
            <label for="abujardado" class="w-full py-3 ms-2 text-sm text-seconsary"
              >Abujardado</label
            >
          </div>
        </li>
      </ul>

      <label
        for="embalaje"
        class="block mb-2 text-xl font-medium first-letter:uppercase text-shadow text-stoneBackground-3"
      >
        Embalaje
      </label>
      <ul class="grid w-full gap-6 md:grid-cols-2">
        <li>
          <input
            type="radio"
            id="embalado"
            name="embalaje"
            value="20"
            class="hidden peer"
            required
          />
          <label
            for="embalado"
            c
            class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
          >
            <div class="block">
              <div class="w-full text-lg font-semibold">Embalado</div>
              <div class="w-full text-sm">Conlleva cargo extra</div>
            </div>
            <!-- En lugar de la flecha incluir un icono de FontAwesome -->
            <svg
              class="w-5 h-5 ms-3 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </label>
        </li>
        <li>
          <input
            type="radio"
            id="hosting-big"
            name="embalaje"
            value="hosting-big"
            class="hidden peer"
          />
          <label
            for="hosting-big"
            class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
          >
            <div class="block">
              <div class="w-full text-lg font-semibold">No embalado</div>
              <div class="w-full text-sm">No conlleva cargo extra</div>
            </div>
            <!-- En lugar de la flecha incluir un icono de FontAwesome -->
            <svg
              class="w-5 h-5 ms-3 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </label>
        </li>
      </ul>

      <label for="embalaje">Seleccione embalaje</label>
      <select name="embalaje" ref="embalaje">
        <option value="20">Sí</option>
        <option value="0">No</option>
      </select>

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
import authApi from '@/api/stoneApi'
import LoandingComponent from '@/modules/shared/components/LoadingComponent.vue'

export default {
  data() {
    return {
      numero1: 0,
      maquina: null,
      consumibles: null,
      maquinas: [],
      sumables: [],
      error: {
        status: false,
        message: ''
      },
      loading: false
    }
  },
  computed: {
    ...mapGetters('Maquinas', ['getMaquinas'])
  },
  methods: {
    async handleSubmit() {
      try {
        this.loading = true
        this.maquina = this.$refs.maquina.value
        await this.getConsumiblesPorMaquina(this.maquina)
        this.sumables = this.consumibles.map((consumible) => {
          return consumible.precio
        })
        this.sumables.push(this.numero1)
        this.sumables.push(Number(this.$refs.terminacion.value))
        this.sumables.push(Number(this.$refs.embalaje.value))

        this.sumables = this.sumables.reduce((a, b) => a + b, 0)
      } catch (e) {
        //this.handleError(e)
      } finally {
        setTimeout(() => {
          this.loading = false
        }, 1000)
      }
    },
    addMaquinasArray(maquinaId) {
      let maquina = this.getMaquinas.find((m) => m.id === maquinaId)
      this.maquinas.push(maquina)
    },
    removeMaquinasArray(maquinaId) {
      this.maquinas = this.maquinas.filter((m) => m.id !== maquinaId)
    },
    handleChange(e) {
      this.numero1 = e
      let sum = 0
      for (const key in this.numero1) {
        sum += this.numero1[key]
      }
      this.numero1 = sum
      return this.numero1
    },
    handleError(e) {
      this.error.status = true
      this.error.message = e
      console.error(this.error.message)
    },
    async getConsumiblesPorMaquina(id) {
      const response = await authApi.get(`/maquinas/${id}/consumibles`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('idToken')}`
        }
      })
      this.consumibles = response.data
    }
  },
  components: {
    // InputTextComponent: defineAsyncComponent(
    //   () => import('@/modules/shared/components/InputTextComponent.vue')
    // ),
    SelectMaquinaComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/SelectMaquinaComponent.vue')
    ),
    InputNumberComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/InputNumberComponent.vue')
    ),
    ButtonComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/ButtonComponent.vue')
    ),
    LoandingComponent
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
