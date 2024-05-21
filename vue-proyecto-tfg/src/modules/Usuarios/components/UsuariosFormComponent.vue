<template>
  <form @submit.prevent="handleSubmit" class="px-10 pb-10" novalidate>
    <label
      for="nombre"
      class="block mt-4 mb-2 text-xl font-medium first-letter:uppercase text-shadow text-stoneBackground-3"
    >
      Nombre
    </label>
    <input
      v-model="form.nombre"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary focus:ring-1 focus:border-secondary focus:outline-none block w-full px-4 py-3 mb-4 placeholder:first-letter:uppercase shadow-sm"
      type="text"
      name="nombre"
      id="nombre"
      placeholder="Nombre del empleado"
    />
    <div class="flex sm:flex-row flex-col items-start justify-between gap-x-3">
      <div class="sm:w-1/2 w-full">
        <label
          for="apellido1"
          class="block mb-2 text-xl font-medium first-letter:uppercase text-shadow text-stoneBackground-3"
        >
          Primer apellido
        </label>
        <input
          v-model="form.apellido1"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary focus:ring-1 focus:border-secondary focus:outline-none block w-full px-4 py-3 mb-4 placeholder:first-letter:uppercase shadow-sm"
          type="text"
          name="apellido1"
          id="apellido1"
          placeholder="Primer apellido"
        />
      </div>
      <div class="sm:w-1/2 w-full">
        <label
          for="apellido2"
          class="block mb-2 text-xl font-medium first-letter:uppercase text-shadow text-stoneBackground-3"
        >
          Segundo apellido
        </label>
        <input
          v-model="form.apellido2"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary focus:ring-1 focus:border-secondary focus:outline-none block w-full px-4 py-3 mb-4 placeholder:first-letter:uppercase shadow-sm"
          type="text"
          name="apellido2"
          id="apellido2"
          placeholder="Segundo apellido"
        />
      </div>
    </div>
    <label
      for="email"
      class="block mb-2 text-xl font-medium first-letter:uppercase text-shadow text-stoneBackground-3"
    >
      Correo Electrónico
    </label>
    <input
      v-model="form.email"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary focus:ring-1 focus:border-secondary focus:outline-none block w-full px-4 py-3 mb-4 placeholder:first-letter:uppercase shadow-sm"
      type="email"
      name="email"
      id="email"
      placeholder="email@email.es"
    />
    <label
      for="password"
      class="block mb-2 text-xl font-medium first-letter:uppercase text-shadow text-stoneBackground-3"
    >
      {{ labelPassword }}
    </label>
    <span
      v-if="tipo === 'Editar usuario'"
      class="block mb-2 text-xs font-light text-gray-400"
      :style="{ fontSize: '11px' }"
    >
      Introduce una nueva contraseña para el usuario
    </span>
    <input
      v-model="form.password"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary focus:ring-1 focus:border-secondary focus:outline-none block w-full px-4 py-3 mb-4 placeholder:first-letter:uppercase shadow-sm"
      type="password"
      name="password"
      id="password"
      placeholder="•••••••••"
    />
    <div class="flex sm:flex-row flex-col items-start justify-between gap-x-3">
      <div class="sm:w-1/2 w-full">
        <label
          for="numWorker"
          class="block mb-2 text-xl font-medium first-letter:uppercase text-shadow text-stoneBackground-3"
        >
          Nº de trabajador
        </label>
        <input
          v-model="form.numero_trabajador"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary focus:ring-1 focus:border-secondary focus:outline-none block w-full px-4 py-3 mb-4 placeholder:first-letter:uppercase shadow-sm"
          type="number"
          name="numWorker"
          id="numWorker"
          min="1"
          placeholder="Número de trabajador"
          @keydown="preventNonNumericInput"
        />
        <span class="block mt-0 mb-2 text-xs font-light text-red-400" :style="{ fontSize: '12px' }">
          {{ errorMsg }}
        </span>
      </div>
      <SelectComponent
        class="mb-4 sm:w-1/2 w-full"
        :value="form.roles || 0"
        label="Roles"
        :options="roles"
        :placeholder="'Seleccione un rol'"
        :isEditing="tipo === 'Editar usuario' ? true : false"
        @changeSelect="selectRol"
      />
    </div>
    <div class="flex flex-row items-center gap-4 mt-4">
      <ButtonComponent :text="textoBoton" bgColor="bg-secondary" 
        class="hover:bg-opacity-80 flex justify-center items-center gap-5 text-lg py-4 mt-4" 
        :icon="['fas', 'floppy-disk']"
      />
      <ButtonComponent
        :icon="['fas', 'circle-xmark']"
        :text="'Cancelar'"
        bgColor="bg-primary"
        class="hover:ring-2 hover:ring-primary hover:bg-opacity-80 flex justify-center items-center gap-5 text-lg py-4 mt-4"
        @click="toggleModal"
      />
    </div>
  </form>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters } from 'vuex'

export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    roles: {
      type: Array,
      default: () => [
        { id: 'ADMIN', nombre: 'Admin' },
        { id: 'TRABAJADOR', nombre: 'Trabajador' }
      ]
    },
    tipo: {
      type: String,
      required: true
    },
    users: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      form: {
        ...this.data
      },
      error: {
        status: false,
        type: '',
        message: ''
      },
      errorMsg: '',
      nombre: '',
      apellido1: '',
      apellido2: '',
    }
  },
  components: {
    ButtonComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/ButtonComponent.vue')
    ),
    SelectComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/SelectComponent.vue')
    )
  },
  created() {
    const empleado = this.getEmpleados.find(empleado => empleado.numero_trabajador == this.data.numero_trabajador);
    if(empleado){
      this.form.id_empleado = empleado.id
      this.nombre = empleado.nombre
      this.form.nombre = empleado.nombre
      this.apellido1 = empleado.apellido1
      this.form.apellido1 = empleado.apellido1
      this.apellido2 = empleado.apellido2
      this.form.apellido2 = empleado.apellido2
    }
  },
  computed: {
    ...mapGetters('Trabajadores', ['getEmpleados']),
    textoBoton() {
      return this.tipo === 'Editar usuario' ? 'Modificar' : 'Guardar'
    },
    labelPassword() {
      return this.tipo === 'Editar usuario' ? 'Nueva contraseña' : 'Contraseña'
    }
  },
  watch: {
    data(newVal) {
      console.log(newVal)
      this.form = { ...newVal }
    }
  },
  methods: {
    preventNonNumericInput(event) {
      // También se puede hacer con regex
      if (
        event.key === 'Backspace' ||
        event.key === 'Delete' ||
        event.key === 'ArrowUp' ||
        event.key === 'ArrowDown' ||
        event.key === 'Tab' ||
        event.key === 'Shift' ||
        event.key === 'CapsLock' ||
        event.key === '.' ||
        event.key === ',' ||
        event.key === 'ArrowRight' ||
        event.key === 'ArrowLeft'
      ) {
        this.errorMsg = ''
        return
      }
      if (event.key < '0' || event.key > '9') {
        this.errorMsg = 'Solo se permiten números'
        event.preventDefault()
      } else {
        this.errorMsg = ''
      }
    },
    handleError(e) {
      this.error.status = true
      this.error.message = e
      console.error('Dentro del handleError', this.error.message)
    },
    selectRol(id) {
      this.form.roles = id
    },
    toggleModal() {
      this.$emit('close')
    },
    objectsAreEqual(obj1, obj2) {
      const fieldsToCompare = ['email', 'numero_trabajador', 'roles'];

      if(this.form.password) return false

      if(this.form.nombre.trim().toLowerCase() !== this.nombre.toLowerCase() || this.form.apellido1.trim().toLowerCase() !== this.apellido1.toLowerCase() || this.form.apellido2.trim().toLowerCase() !== this.apellido2.toLowerCase()){
        return false
      }
      for (let prop in fieldsToCompare) {
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
      const isEmpty = (value) => value === '' || value === 0 || value === null

      const requiredFields = ['nombre', 'apellido1', 'numero_trabajador', 'email', 'roles']
      if (this.tipo === 'Añadir nuevo usuario') requiredFields.push('password')

      const hasEmptyFields = requiredFields.some((field) => isEmpty(this.form[field]))

      // Regex para el formato del email
      const emailFormat = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/

      if (hasEmptyFields) {
        this.error = {
          status: true,
          type: 'warning',
          message: 'No se pueden enviar campos vacíos'
        }
        this.$emit('errorForm', this.error)
      } else if (this.tipo === 'Editar usuario' && this.objectsAreEqual(this.form, this.data)) {
        this.error = {
          status: true,
          type: 'warning',
          message: 'No se ha modificado ningún campo'
        }
        this.$emit('errorForm', this.error)
      } else if (!emailFormat.test(this.form.email)) {
        this.error.status = true
        this.error.type = 'warning'
        this.error.message = 'El formato del email no es válido'
        this.$emit('errorForm', this.error)
        return
      } else if(this.tipo === 'Añadir nuevo usuario' && this.users.some(user => user.email === this.form.email)) {
        this.error.status = true
        this.error.type = 'warning'
        this.error.message = 'El email ya está registrado para otro usuario'
        this.$emit('errorForm', this.error)
        return
      } else {
        console.log('Datos que se envían', this.form)
        this.$emit('send', this.form)
        this.form = {}
        this.toggleModal()
      }
    }
  }
}
</script>
