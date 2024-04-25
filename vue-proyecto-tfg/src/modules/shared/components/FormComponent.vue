<template>
  <form @submit.prevent="handleSubmit" class="px-10 pb-10">
    <div v-for="(el, index) in data" :key="index">
      <!-- Hay que hacer un input password que ofrezca introducir una nueva contraseña -->
      <!--  && (index !== 'password' && tipo === 'Editar') -->
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
        :label="'Selecciona máquina'"
        :options="maquinas"
        :value="tipo === 'Editar' ? el : 0"
        @change="handleChange"
      />

    </div>
    <!-- Problema a la hora de resetear los campos cuando se cambia el modal -->
    <InputPasswordComponent v-if="tipo === 'Añadir nuevo usuario' || tipo === 'Editar usuario'" />
    <!-- <label
        for="password"
        title="Introduce una nueva contraseña para el usuario"
        class="block mb-2 text-xl font-medium text-stoneBackground-3 first-letter:uppercase text-shadow"
      >
        Nueva contraseña
      </label>
      <span class="block mb-2 text-xs font-light text-gray-400 " :style="{ fontSize: '11px' }">
        Introduce una nueva contraseña para el usuario
      </span>
      <input
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary focus:ring-1 focus:border-secondary focus:outline-none block w-full p-4 mb-4 shadow-sm"
        type="password"
        name="password"
        id="password"
        placeholder="•••••••••"
      /> -->
    <ButtonComponent :text="textoBoton" bgColor="bg-secondary" />
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
    handleSubmit() {
      //si alguno de los campos esta vacio no se envia
      // Comprobamos si this.form se ha inicializado
      if (
        Object.keys(this.form).length === 0 ||
        Object.values(this.form).some((el) => el == '' || el == null)
      ) {
        //this.$emit('send', 'No se pueden enviar campos vacios')
        // Introducir los métodos de los mensajes
        // this.error.status = true
        // this.error.message = 'No se pueden enviar campos vacíos'
        // console.error(this.error.message)
        // return
      } else {
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

      this.form = { ...this.form, ...e }

      return this.form
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
