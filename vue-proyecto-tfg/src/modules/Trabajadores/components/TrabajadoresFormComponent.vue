<template>
  <form @submit.prevent="handleSubmit" class="px-10 pb-10" novalidate>
    <SelectComponent
      :value="form.numero_trabajador || 0"
      label="Empleados"
      :options="selectFormattedEmpleados()"
      :placeholder="'Seleccione un empleado'"
      :isEditing="tipo === 'Editar trabajador' ? true : false"
      @changeSelect="selectEmpleado"
    />
    <label
      for="precio"
      class="block mt-4 mb-2 text-xl font-medium first-letter:uppercase text-shadow text-stoneBackground-3"
    >
      Coste trabajador
    </label>
    <input
      v-model="form.precio"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary focus:ring-1 focus:border-secondary focus:outline-none block w-full p-4 mb-4 placeholder:first-letter:uppercase shadow-sm"
      type="number"
      name="numWorker"
      id="numWorker"
      min="1"
      placeholder="Coste del trabajador"
      @keydown="preventNonNumericInput"
    />
    <span class="block mb-4 text-xs font-light text-red-400" :style="{ fontSize: '12px' }">
      {{ errorMsg }}
    </span>
    <SelectComponent
      :value="form.id_maquina"
      :label="'Máquina'"
      :options="getMaquinas"
      :placeholder="'Seleccione una máquina relacionada'"
      :isEditing="tipo === 'Editar trabajador' ? true : false"
      @changeSelect="selectMaquina"
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
import { mapGetters } from 'vuex'

export default {
  props: {
    data: {
      type: Object,
      required: true
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
      },
      errorMsg: ''
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
    ...mapGetters('Trabajadores', ['getEmpleados']),
    ...mapGetters('Maquinas', ['getMaquinas']),
    textoBoton() {
      return this.tipo === 'Editar trabajador' ? 'Modificar' : 'Guardar'
    }
  },
  watch: {
    data(newVal) {
      console.log(newVal)
      this.form = { ...newVal }
    }
  },
  methods: {
    selectFormattedEmpleados(){
      const empleados = this.getEmpleados
      console.log(empleados)
      return empleados.map(empleado => {
        return {
          id: empleado.numero_trabajador,
          nombre: `${empleado.numero_trabajador} - ${empleado.nombre} ${empleado.apellido1} ${empleado.apellido2}`
        }
      })
    },
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
    selectEmpleado(id) {
      console.log(id)
      this.form.numero_trabajador = id
    },
    selectMaquina(id) {
      console.log(id)
      this.form.id_maquina = id
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

      const requiredFields = ['numero_trabajador', 'precio', 'id_maquina']
      // Comprueba si algún campo del formulario está vacío
      const hasEmptyFields = requiredFields.some((field) => isEmpty(this.form[field]))

      if (hasEmptyFields) {
        this.error = {
          status: true,
          type: 'warning',
          message: 'No se pueden enviar campos vacíos'
        }
        this.$emit('errorForm', this.error)
      } else if (this.tipo === 'Editar trabajador' && this.objectsAreEqual(this.form, this.data)) {
        this.error = {
          status: true,
          type: 'warning',
          message: 'No se ha modificado ningún campo'
        }
        this.$emit('errorForm', this.error)
      } else {
        // Crea un nuevo objeto con solo los campos que quieres enviar
        const dataToSend = {
          id: this.form.id,
          numero_trabajador: this.form.numero_trabajador,
          precio: this.form.precio,
          id_maquina: this.form.id_maquina
        }
        console.log('Datos que se envían', dataToSend)
        this.$emit('send', dataToSend)
        this.form = {}
        this.toggleModal()
      }
    }
  }
}
</script>