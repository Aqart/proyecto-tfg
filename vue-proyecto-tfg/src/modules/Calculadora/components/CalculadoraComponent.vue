<template>
  <div class="flex flex-col gap-3">
    <h1>Calculadora</h1>
    <InputNumberComponent
      label="numero"
      placeholder="Introduce un número"
      @changeNumber="handleChange"
      @errorNumber="handleError"
    />

    <label for="maquina">Seleccione máquina</label>
    <select  name="maquina" id="">
      <option v-for="maquina in getMaquinas" :key="maquina.id" value="maquina.id">{{ maquina.nombre }}</option>
    </select>
    <label for="terminacion">Seleccione terminación</label>
    <select name="terminacion" id="">
      <option value="">Selecciona terminación</option>
      <option value="">Solo cortado</option>
      <option value="">Apomazado</option>
      <option value="">Envejecido</option>
      <option value="">Abujardado</option>
    </select>

    <label for="embalaje">Seleccione embalaje</label>
    <select name="embalaje" id="">
      <option value="">embalaje</option>
      <option value="">Sí</option>
      <option value="">No</option>
    </select>

    <ButtonComponent text="Calcular" bgColor="bg-primary" @click="handleClik" />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      numero1: 0,
      error: {
        status: false,
        message: ''
      }
    }
  },
  computed: {
    ...mapGetters('Maquinas', ['getMaquinas'])
  },
  methods: {
    handleClick() {
      console.log('Click')
    },
    handleChange(e){
      this.numero1 = e
      console.log('Numero1', this.numero1)
      return this.numero1
    },
    handleError(e) {
      this.error.status = true
      this.error.message = e
      console.error(this.error.message)
    },
  },
  components: {
    InputTextComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/InputTextComponent.vue')
    ),
    InputNumberComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/InputNumberComponent.vue')
    ),
    ButtonComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/ButtonComponent.vue')
    )
  }
}
</script>
