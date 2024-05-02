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
      <option v-if="nullOption !== ''" :value="null">{{ nullOption }}</option>
      <option :value="'placeholder'" :selected="!isEditing" disabled hidden>
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
      default: 'Seleccione una opción'
    },
    label: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      default: () => []
    },
    nullOption: {
      type: String,
      default: ''
    },
    isEditing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selected: this.isEditing ? this.value : 'placeholder'
    }
  },
  methods: {
    handleChange() {
      this.$emit('changeSelect', this.selected)
    }
  },
  watch: {
    isEditing(newVal) {
      this.selected = newVal ? this.value : 'placeholder'
    },
    value(newValue) {
      this.selected = newValue
    }
  }
}
</script>
