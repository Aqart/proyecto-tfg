<template>
  <div>
    <label for="value" class="block mb-2 text-xl font-medium text-gray-900 first-letter:uppercase">
      {{ label }}
    </label>
    <input
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5 pb-4 mb-4"
      type="number"
      step="0.01"
      min="0"
      v-if="value === null ? handleError : value"
      :value="newValue"
      @input="(event) => updateValue(label, event)"
      :name="value"
      :placeholder="placeholder"
    />
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
      default: 'Numero'
    },
    label: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      newInputValue: this.value,
      error: false
    }
  },
  computed: {
    newValue() {
      return this.newInputValue
    }
  },
  methods: {
    updateValue(key, event) {
      this.newInputValue = event.target.value
      this.$emit('changeNumber', { [key]: Number(this.newInputValue) })
    },
    handleError() {
      this.error = true
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
