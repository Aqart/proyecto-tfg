<template>
  <div>
    <label for="text" class="block mb-2 text-xl font-medium text-gray-900 first-letter:uppercase">
      {{ labelText }}
    </label>
    <input
      :value="inputValue"
      @input="updateValue"
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
  methods: {
    updateValue(event) {
      this.$emit('update:inputValue', event.target.value);
    }
  }
}
</script>