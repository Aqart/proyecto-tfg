<template>
  <div>
    <label :for="value" class="block mb-2 text-xl font-medium text-gray-900 first-letter:uppercase">
      {{ label }}
    </label>
    <input
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5 pb-4 mb-4 placeholder:first-letter:uppercase"
      type="text"
      :name="value"
      :placeholder="placeholder"
      :value="newValue"
      @input="(event) => updateValue(label, event)"
    />
  </div>
</template>

<script>
//class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5 pb-4 mb-4"
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Texto'
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
    }
  },
  methods: {
    updateValue(key, event) {
      this.newInputValue = event.target.value
      this.$emit('changeText', { [key]: this.newInputValue })
    }
  }
}
</script>
