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
      name="máquinas"
      @change="handleChange"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary focus:ring-1 focus:border-secondary focus:outline-none block w-full p-4 mb-4 shadow-sm"
    >
      <option :value="null" selected disabled hidden >
        {{ placeholder }}
      </option>
      <option v-for="(option, index) in options" :key="index" :value="option.id">
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
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selected: this.value
    }
  },
  methods: {
    handleChange() {
      this.$emit('changeSelect', this.selected)
    }
  },
  watch: {
    value(newValue) {
      this.selected = newValue
    }
  }
}
</script>
