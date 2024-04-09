<template>
  <div>
    <label for="text" class="block mb-2 text-xl font-medium text-gray-900 first-letter:uppercase">
      {{ labelText }}
    </label>
    <input
      :value="inputValue"
      @input="updateValue($event.target.value)"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5 pb-4 mb-4"
      type="text"
      name="text"
      :placeholder="placeHolder"
    />
  </div>
</template>

<script>
export default {
  props: {
    form: {
      type: Object
    },
    labelText: {
      type: String,
      required: true
    },
    placeHolder: {
      type: String,
      required: true
  },
  inputValue: {
    type: String,
    default: ''
  }
  },
  data() {
    return {
      localInputValue: this.inputValue
    }
  },
  methods: {
    updateValue(event) {
      this.localInputValue = event.target.value
      this.$emit('input', this.localInputValue)
    }
  },
  watch: {
    inputValue(newVal) {
      this.localInputValue = newVal
    }
  }
}
</script>