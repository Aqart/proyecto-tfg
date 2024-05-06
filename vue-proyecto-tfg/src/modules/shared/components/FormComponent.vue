<template>
  <form @submit.prevent="handleSubmit" class="px-10 pb-10">
    <div v-for="(el, index) in data" :key="index">
      <component
        v-if="index !== 'id' && index !== 'id_maquina'"
        :is="checkType(typeof el)"
        :label="index"
        :placeholder="index"
        :value="el"
        @changeText="handleChange"
        @changeNumber="handleChange"
        @errorNumber="handleError"
      />

      <SelectComponent
        v-else-if="index === 'id_maquina'"
        :label="'Máquina'"
        :options="maquinas"
        :value="el"
        :placeholder="'Seleccione una máquina relacionada'"
        :nullOption="'Sin máquina asociada'"
        :isEditing="tipo === 'Editar' ? true : false"
        @changeSelect="handleSelectChange"
      />
    </div>
    <div class="flex flex-row items-center gap-4">
      <ButtonComponent :text="textoBoton" bgColor="bg-secondary" class="hover:bg-opacity-80" />
      <ButtonComponent
        :text="'Cancelar'"
        bgColor="bg-primary"
        class="hover:ring-2 hover:ring-primary hover:bg-opacity-80"
        @click="toggleModal"
      />
    </div>
  </form>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    tipo: {
      type: String,
      required: true
    },
    maquinas: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      form: { ...this.data },
      error: {
        status: false,
        type: '',
        message: ''
      }
    }
  },
  components: {
    InputTextComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/InputTextComponent.vue')
    ),
    InputNumberComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/InputNumberComponent.vue')
    ),
    InputPasswordComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/InputPasswordComponent.vue')
    ),
    ButtonComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/ButtonComponent.vue')
    ),
    SelectComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/SelectComponent.vue')
    )
  },
  computed: {
    textoBoton() {
      return this.tipo === 'Editar' ? 'Modificar' : 'Guardar'
    }
  },
  watch: {
    data(newVal) {
      this.form = { ...newVal }
    }
  },
  methods: {
    handleError(e) {
      this.error.status = true
      this.error.message = e
      console.error('Dentro del handleError', this.error.message)
    },
    toggleModal() {
      this.$emit('close')
    },
    objectsAreEqual(obj1, obj2) {
      for (let prop in obj1) {
        if (typeof obj1[prop] === 'string' && typeof obj2[prop] === 'string') {
          if (obj1[prop].trim() !== obj2[prop].trim()) {
            return false
          }
        } else if (obj1[prop] !== obj2[prop]) {
          return false
        }
      }
      return true
    },
    handleSubmit() {
      //si alguno de los campos esta vacio no se envia
      // Comprobamos si this.form se ha inicializado
      if (
        Object.keys(this.form).length === 0 ||
        Object.entries(this.form).some(
          ([key, value]) => key !== 'id_maquina' && (value == '' || value == null)
        )
      ) {
        this.error.status = true
        this.error.type = 'warning'
        this.error.message = 'No se pueden enviar campos vacíos'
        this.$emit('errorForm', this.error)
        // return
      } else if (this.objectsAreEqual(this.form, this.data)) {
        this.error.status = true
        this.error.type = 'warning'
        this.error.message = 'No se ha modificado ningún campo'
        this.$emit('errorForm', this.error)
      } else {
        console.log('Datos que se envían', this.form)
        this.$emit('send', this.form)
        this.form = {}
        this.toggleModal()
      }
    },
    handleChange(e) {
      if (this.tipo === 'Editar') {
        this.form.id = this.data.id
      } else {
        delete this.form.id
      }

      // Accede a la primera propiedad de e
      let firstProp = Object.keys(e)[0]
      if (typeof e[firstProp] === 'string') {
        e[firstProp] = e[firstProp].trim()
      }

      this.form = { ...this.form, ...e }
      return this.form
    },
    handleSelectChange(value) {
      console.log('Valor', value)
      this.form.id_maquina = value
      console.log('Form', this.form)
    },
    checkType(type) {
      if (type === 'string') {
        return 'InputTextComponent'
      } else if (type === 'number' || type === 'object') {
        return 'InputNumberComponent'
      } else {
        return 'InputTextComponent'
      }
    }
  }
}
</script>
