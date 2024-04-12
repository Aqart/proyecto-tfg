<template>
  <form @submit.prevent="handleSubmit" class="p-10">
    <div v-for="(el, index) in data" :key="index">
      <component
        v-if="index !== 'id'"
        :is="checkType(typeof el)"
        :label="index"
        :placeholder="index"
        :value="el"
        @changeText="handleChange"
        @changeNumber="handleChange"
        @errorNumber="handleError"
      />
    </div>
    <ButtonComponent @click="toggleModal" text="Modificar Consumible" bgColor="bg-secondary" />
  </form>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    tipo: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      form: { ...this.data },
      error: {
        status: false,
        message: ''
      }
    }
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
  },
  methods: {
    handleError(e) {
      this.error.status = true
      this.error.message = e
      console.error(this.error.message)
    },
    toggleModal() {
      //si alguno de los campos esta vacio no se envia
      if (Object.values(this.form).some((el) => el === '')) {
        this.$emit('send', 'No se pueden enviar campos vacios')
        return
      } else {
        delete this.form
        this.$emit('send', this.form)
        this.$emit('close')
      }
    },
    handleChange(e) {
      if (this.tipo === 'Editar') {
        this.form.id = this.data.id
      } else {
        delete this.form.id
      }
      this.form = { ...this.form, ...e }
      return this.form
    },
    checkType(type) {
      if (type === 'string') {
        return 'InputTextComponent'
      } else if (type === 'number') {
        return 'InputNumberComponent'
      } else {
        return 'InputTextComponent'
      }
    }
  }
}
</script>
