<template>
  <div class="flex flex-col gap-3">
    <h1>Calcular tabla</h1>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-3">
      <SelectMaquinaComponent
        :maquinasSeleccionadas="maquinas"
        :options="getMaquinas"
        @addMaquina="addMaquinasArray"
        @removeMaquina="removeMaquinasArray"
      />

      <div class="flex flex-col justify-center gap-5">
        <div class="flex items-center">
          <div class="flex flex-row gap-4 items-center justify-center text-xl">
            <span
              class="block text-md font-medium first-letter:uppercase text-shadow text-stoneBackground-3"
              >Terminación:</span
            >
            <div>
              <label class="inline-flex items-center justify-center">
                <input type="radio" class="form-radio h-8 w-8" name="terminacion" value="0" />
                <span class="ml-2">Solo cortado</span>
              </label>
            </div>
            <div>
              <label class="inline-flex items-center justify-center">
                <input
                  type="radio"
                  class="form-radio h-8 w-8 text-stoneBackground-5"
                  name="terminacion"
                  value="10"
                />
                <span class="ml-2">Apomazado</span>
              </label>
            </div>
            <div>
              <label class="inline-flex items-center justify-center">
                <input type="radio" class="form-radio h-8 w-8" name="terminacion" value="20" />
                <span class="ml-2">Envejecido</span>
              </label>
            </div>
            <div>
              <label class="inline-flex items-center justify-center">
                <input type="radio" class="form-radio h-8 w-8" name="terminacion" value="30" />
                <span class="ml-2">Abujardado</span>
              </label>
            </div>
          </div>
        </div>
        <!-- Botón switch -->
        <div class="flex items-center gap-4">
          <span
            class="block text-xl font-medium first-letter:uppercase text-shadow text-stoneBackground-3"
            >Embalaje:</span
          >
          <div class="flex justify-between items-center" @click="toggleActive = !toggleActive">
            <div
              class="w-16 h-10 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out cursor-pointer"
              :class="{ 'bg-stoneBackground-5': toggleActive }"
            >
              <div
                class="bg-white w-8 h-8 rounded-full shadow-md transform duration-300 ease-in-out flex items-center justify-center select-none"
                :class="{ 'translate-x-6': toggleActive }"
              >
                {{ toggleActive ? 'Sí' : 'No' }}
              </div>
            </div>
          </div>
        </div>
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
      toggleActive: false, // Agregamos la variable para el estado del botón switch
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
        this.sumables.push(this.embalaje ? 1 : 0) // Añadimos el valor del embalaje según el estado del botón switch

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
    SelectMaquinaComponent: defineAsyncComponent(() =>
      import('@/modules/shared/components/SelectMaquinaComponent.vue')
    ),
    ButtonComponent: defineAsyncComponent(() =>
      import('@/modules/shared/components/ButtonComponent.vue')
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
  box-shadow: 1px 1px 10px #aaaaaa, -1px -1px 10px #ffffff;
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