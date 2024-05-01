<template>
  <div class="flex flex-col gap-3">
    <h1>Calcular tabla</h1>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-3">
      <InputNumberComponent
        label="Número 1"
        placeholder="Introduce un número"
        @changeNumber="handleChange"
        @errorNumber="handleError"
      />

      <SelectMaquinaComponent
        :maquinasSeleccionadas="maquinas"
        :options="getMaquinas"
        @addMaquina="addMaquinasArray"
      />

      <label for="maquina">Seleccione máquina</label>
      <select name="maquina" ref="maquina">
        <option v-for="maquina in getMaquinas" :key="maquina.id" :value="maquina.id">
          {{ maquina.nombre }}
        </option>
      </select>
      <label for="terminacion">Seleccione terminación</label>
      <select name="terminacion" ref="terminacion">
        <option value="10">Solo cortado</option>
        <option value="20">Apomazado</option>
        <option value="30">Envejecido</option>
        <option value="40">Abujardado</option>
      </select>

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
      console.log('TablaStone', maquina)
      this.maquinas.push(maquina)
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
