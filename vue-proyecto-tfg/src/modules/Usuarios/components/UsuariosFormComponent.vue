<template>
  <form @submit.prevent="handleSubmit" class="px-10 pb-10" novalidate>
    <label
      for="email"
      class="block mb-2 text-xl font-medium first-letter:uppercase text-shadow text-stoneBackground-3"
    >
      Nº de trabajador
    </label>
    <input
      v-model="form.numero_trabajador"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary focus:ring-1 focus:border-secondary focus:outline-none block w-full p-4 mb-4 placeholder:first-letter:uppercase shadow-sm"
      type="number"
      name="numWorker"
      id="numWorker"
      min="1"
      placeholder="Número de trabajador"
    />
    <label
      for="email"
      class="block mb-2 text-xl font-medium first-letter:uppercase text-shadow text-stoneBackground-3"
    >
      Correo Electrónico
    </label>
    <input
      v-model="form.email"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary focus:ring-1 focus:border-secondary focus:outline-none block w-full p-4 mb-4 placeholder:first-letter:uppercase shadow-sm"
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
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary focus:ring-1 focus:border-secondary focus:outline-none block w-full p-4 mb-4 placeholder:first-letter:uppercase shadow-sm"
      type="password"
      name="password"
      id="password"
      placeholder="•••••••••"
    />
    <SelectComponent
      :value="form.roles || 0"
      label="Roles"
      :options="roles"
      :placeholder="'Seleccione un rol'"
      :isEditing="tipo === 'Editar usuario' ? true : false"
      @changeSelect="selectRol"
    />
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
    ButtonComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/ButtonComponent.vue')
    ),
    SelectComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/SelectComponent.vue')
    )
  },
  computed: {
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
      const isEmpty = (value) => value === '' || value === 0 || value === null

      const requiredFields = ['numero_trabajador', 'email', 'roles']
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
