<template>
  <form @submit.prevent="handleSubmit" class="p-10">
    <component
      v-for="(field, key) in fields"
      :key="key"
      :is="getFieldComponent(field)"
      :labelText="key"
      :placeHolder="`Introduce ${key}`"
      :inputValue="field"
      @input="updateValue(key, $event)"
    />
    <ButtonComponent
      @click="toggleModal"
      text="Modificar Consumible"
      type="submit"
      bgColor="bg-secondary"
    />
  </form>
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
  props: {
    fields: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      formValues: { ...this.fields },
      showModal: true
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
    toggleModal() {
      this.showModal = !this.showModal
    },
    getFieldComponent(value) {
      return typeof value === 'number' ? 'InputNumberComponent' : 'InputTextComponent'
    },
    updateValue(key, value) {
      this.formValues[key] = value
    },
    handleSubmit() {
     
      this.$emit('submit', this.formValues)
    }
  }
}
</script>
