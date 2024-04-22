<template>
  <div>
    <label
      for="password"
      class="block mb-2 text-xl font-medium text-stoneBackground-3 first-letter:uppercase text-shadow"
    >
      Nueva contraseña
    </label>
    <span class="block mb-2 text-xs font-light text-gray-400 " :style="{ fontSize: '11px' }">
        Introduce una nueva contraseña para el usuario
    </span>
    <input
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary focus:ring-1 focus:border-secondary focus:outline-none block w-full p-4 mb-4 placeholder:first-letter:uppercase shadow-sm"
      type="password"
      name="password"
      placeholder="•••••••••"
      @input="(event) => updateValue(label, event)"
    />
  </div>
</template>

<script>

export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '•••••••••'
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


      this.$emit('changeText', { [key]: this.newInputValue })
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
  }
}
</script>
