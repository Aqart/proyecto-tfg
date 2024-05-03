<template>
  <div>
    <label
      for="value"
      class="block mb-2 text-xl font-medium first-letter:uppercase text-shadow text-stoneBackground-3"
    >
      {{ formattedLabel }}
    </label>
    <input
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary focus:ring-1 focus:border-secondary focus:outline-none block w-full p-4 mb-4 placeholder:first-letter:uppercase shadow-sm"
      type="number"
      step="0.01"
      min="0"
      :value="newValue"
      @input="(event) => updateValue(label, event)"
      :name="value"
      :placeholder="`Introduce ${formattedPlaceholder}`"
    />
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
      required: true
    }
  },
  data() {
    return {
      newInputValue: this.value
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
      return this.formatText(this.label)
    }
  },
  methods: {
    updateValue(key, event) {
      this.newInputValue = event.target.value
      this.$emit('changeNumber', { [key]: Number(this.newInputValue) })
    },
    handleError() {
      console.log('Error de campo vacío InputNumer')
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
        this.handleError();
      }
    }
  }
}
</script>
