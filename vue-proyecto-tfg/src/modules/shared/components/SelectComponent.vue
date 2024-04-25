<template>
  <div>
    <label
      :for="label"
      class="block mb-2 text-xl font-medium first-letter:uppercase text-shadow text-stoneBackground-3"
    >
      {{ label }}
    </label>
    <select
      v-model="selected"
      @change="handleChange"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary focus:ring-1 focus:border-secondary focus:outline-none block w-full p-4 mb-4 placeholder:first-letter:uppercase shadow-sm"
    >
    <option disabled value="">{{ placeholder }}</option>
    <option v-for="(option, index) in options" :key="index" :value="option.value">
      {{ option.nombre }}
    </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String,
      default: 'Seleccione una máquina relacionada'
    },
    label: {
      type: String,
      required: true
    },
    options: {  // Aquí estás recibiendo las opciones
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selected: this.value,
      error: false
    }
  },
  methods: {
    updateValue(key, event) {
      this.newInputValue = event.target.value
      this.$emit('changeNumber', { [key]: Number(this.newInputValue) })
    },
    handleError() {
      console.log('Error', this.error)
      this.error = true
    },
    formatText(text) {
      let formattedText = text.replace(/_/g, ' ')

      if (formattedText.includes('m2')) {
        formattedText = formattedText.replace('m2', 'm²')
      }

      if (formattedText.includes('m3')) {
        formattedText = formattedText.replace('m3', 'm³')
      }

      return formattedText
    }
  },
  watch: {
    error(newValue) {
      if (newValue) {
        this.$emit('errorNumber', 'Este campo no puede estar vacio')
      }
    }
  }
}
</script>
