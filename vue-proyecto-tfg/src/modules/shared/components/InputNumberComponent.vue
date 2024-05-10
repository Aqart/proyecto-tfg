<template>
  <div>
    <label
      v-if="label"
      for="value"
      class="block mb-2 text-xl font-medium first-letter:uppercase text-shadow text-stoneBackground-3"
    >
      {{ formattedLabel }}
    </label>
    <input
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary focus:ring-1 focus:border-secondary focus:outline-none block w-full p-4 placeholder:first-letter:uppercase shadow-sm"
      type="number"
      step="0.01"
      min="0"
      :value="newValue"
      @input="(event) => updateValue(label, event)"
      @keydown="preventNonNumericInput"
      :name="value"
      :placeholder="formattedPlaceholder"
    />
    <span class="block mt-2 text-xs font-light text-red-400" :style="{ fontSize: '12px' }">
      {{ errorMsg }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: null
    },
    placeholder: {
      type: String,
      default: 'Numero'
    },
    label: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      newInputValue: this.value,
      errorMsg: ''
    }
  },
  computed: {
    newValue() {
      return this.newInputValue
    },
    formattedPlaceholder() {
      return this.formatText(this.placeholder)
    },
    formattedLabel() {
      return this.formatText(this.label) || ''
    }
  },
  methods: {
    preventNonNumericInput(event) {
      if (
        event.key === 'Backspace' ||
        event.key === 'Delete' ||
        event.key === 'ArrowUp' ||
        event.key === 'ArrowDown' ||
        event.key === 'Tab' ||
        event.key === 'Shift' ||
        event.key === 'CapsLock'
      ) {
        this.errorMsg = ''
        return
      }
      if (event.key < '0' || event.key > '9') {
        this.errorMsg = 'Solo se permiten números'
        event.preventDefault()
      } else {
        this.errorMsg = ''
      }
    },
    updateValue(key, event) {
      this.newInputValue = event.target.value
      this.$emit('changeNumber', { [key]: Number(this.newInputValue) })
    },
    handleError() {
      console.log('Error de campo vacío InputNumber')
      this.$emit('errorNumber', 'Este campo no puede estar vacio')
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
    },
    value(newValue) {
      if (newValue === 0 || newValue === null) {
        this.handleError()
      }
    }
  }
}
</script>
