<template>
  <div>
    <label for="number" class="block mb-2 text-xl font-medium text-gray-900">
        {{labelText}}
      </label>
      <input
        :value="inputValue"
        @input="updateValue($event.target.value)"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5 pb-4 mb-4"
        type="number"
        name="number"
        id="number"
        step="0.01"
        :placeholder="placeHolder"
        min=0
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
    type: Number,
    default: null
},
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