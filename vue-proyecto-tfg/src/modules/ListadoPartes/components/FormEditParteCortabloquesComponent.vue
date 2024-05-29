<template>
  <div>
    <form class="text-sm md:text-md mx-3 px-3 break-words">
      <div class="grid grid-cols-1 gap-2 items-center">
        <div class="flex flex-col">
          <!--SELECT COMPONENT-->
          <Transition name="fade">
            <div
              v-if="!toggleRetalActive"
              class="mt-4 flex flex-col gap-2 bg-gray-50 border rounded-lg p-5"
            >
              <label for="nbloque" class="block text-md md:text-md font-medium text-gray-700"
                >Número de bloque</label
              >
              <input
                type="text"
                ref="nbloqueInput"
                name="nbloque"
                v-model="nbloque"
                placeholder="Exactamente 5 dígitos"
                class="p-2 border border-gray-300 rounded-md focus:ring-stoneBackground-2 block w-full focus:border-stoneBackground-2 shadow-sm sm:text-md md:text-md"
                @blur="checkInput"
              />

              <div v-if="showAlert">
                <div
                  class="bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3"
                  role="alert"
                >
                  <p class="font-bold text-md">Has introducido {{ inputLength }} dígitos.</p>
                  <p class="text-sm">Debes introducir exactamente 5.</p>
                </div>
              </div>
            </div>
          </Transition>
          <SelectComponent
            :options="trabajadores"
            :value="employeeNumber"
            label=""
            :isEditing="true"
          />
        </div>
        <div
          class="flex flex-col sm:flex-row gap-2 justify-between items-start h-full bg-gray-50 border rounded-lg p-5"
        >
          <div
            class="flex flex-col justify-around items-center sm:items-start px-2 w-full xl:w-auto h-full"
          >
            <div class="flex flex-row sm:flex-col gap-2 w-full justify-between h-full">
              <div
                class="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-1 xl:gap-10"
              >
                <span class="block text-md md:text-md font-medium text-gray-700 w-full"
                  >¿Es un bis?</span
                >
                <div
                  class="flex justify-between items-center"
                  @click="toggleBisActive = !toggleBisActive"
                >
                  <div
                    class="w-[4.5rem] h-12 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out cursor-pointer select-none scale-75"
                    :class="{ 'bg-stoneBackgroundContrast-1': toggleBisActive }"
                  >
                    <div
                      class="bg-white w-10 h-10 rounded-full shadow-md transform duration-300 ease-in-out flex items-center justify-center select-none"
                      :class="{ 'translate-x-6': toggleBisActive }"
                    >
                      {{ toggleBisActive ? 'Sí' : 'No' }}
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-1 xl:gap-4"
              >
                <span class="block text-md md:text-md font-medium text-gray-700 w-full"
                  >¿Es un retal?</span
                >
                <div
                  class="ml-auto sm:ml-0 flex justify-between items-center"
                  @click="toggleRetalActive = !toggleRetalActive"
                >
                  <div
                    class="w-[4.5rem] h-12 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out cursor-pointer select-none scale-75"
                    :class="{ 'bg-stoneBackgroundContrast-1': toggleRetalActive }"
                  >
                    <div
                      class="bg-white w-10 h-10 rounded-full shadow-md transform duration-300 ease-in-out flex items-center justify-center select-none"
                      :class="{ 'translate-x-6': toggleRetalActive }"
                    >
                      {{ toggleRetalActive ? 'Sí' : 'No' }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="flex flex-row items-center sm:items-start justify-between md:justify-around w-full md:w-3/4"
          >
            <div class="flex flex-col justify-between items-start h-full gap-10">
              <div>
                <label for="fecha" class="block text-md md:text-md font-medium text-gray-700"
                  >Fecha de entrada</label
                >
                <input
                  type="date"
                  name="fecha"
                  id="fecha"
                  v-model="fechaInicioActual"
                  class="mt-1 focus:ring-stoneBackground-2 focus:border-stoneBackground-2 block w-full shadow-sm sm:text-md md:text-md border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label for="hora" class="block text-md md:text-md font-medium text-gray-700"
                  >Hora de entrada</label
                >
                <input
                  type="time"
                  name="hora"
                  id="hora"
                  v-model="horaInicioActual"
                  class="mt-1 focus:ring-stoneBackground-2 focus:border-stoneBackground-2 block w-full shadow-sm sm:text-md md:text-md border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div class="flex flex-col justify-between items-start gap-10 h-full">
              <div>
                <label for="fecha" class="block text-md md:text-md font-medium text-gray-700"
                  >Fecha de salida</label
                >
                <input
                  type="date"
                  name="fecha"
                  id="fecha"
                  v-model="fechaFinActual"
                  class="mt-1 focus:ring-stoneBackground-2 focus:border-stoneBackground-2 block w-full shadow-sm sm:text-md md:text-md border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label for="hora" class="block text-md md:text-md font-medium text-gray-700"
                  >Hora de salida</label
                >
                <input
                  type="time"
                  name="hora"
                  id="hora"
                  v-model="horaFinActual"
                  class="mt-1 focus:ring-stoneBackground-2 focus:border-stoneBackground-2 block w-full shadow-sm sm:text-md md:text-md border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>

        <TablaEditFabricacionComponent @updateItems="getproduccionMaquina" />
        <div class="shadow bg-gray-50 border rounded-lg p-5">
          <label for="obsevaciones" class="block text-md md:text-md font-medium text-gray-700"
            >Observaciones</label
          >
          <textarea
            name="observaciones"
            id="observaciones"
            placeholder="Escribe aquí tus observaciones..."
            rows="1"
            v-model="observaciones"
            class="mt-1 p-5 focus:ring-stoneBackground-2 focus:border-stoneBackground-2 block w-full sm:text-md md:text-md border-gray-300 rounded-md"
          />
        </div>
        <div class="flex flex-row gap-2">
          <ButtonComponent
            text="Firmar parte"
            bgColor="bg-secondary"
            @click.prevent="handleClick"
            :icon="['fas', 'file-signature']"
          />
          <ButtonComponent
            text="Limpiar"
            bgColor="bg-secondary"
            @click="handleClean"
            :icon="['fas', 'eraser']"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      nbloque: null,
      inputLength: 0,
      fechaInicioActual: '',
      horaInicioActual: '',
      fechaFinActual: '',
      horaFinActual: '',
      observaciones: '',
      employeeNumber: null,
      employeeName: null,
      toggleRetalActive: false,
      toggleBisActive: false,
      showAlert: false,
      showModal: false,
      produccionMaquina: [],
      trabajadores: []
    }
  },
  components: {
    ButtonComponent: defineAsyncComponent(() =>
      import('@/modules/shared/components/ButtonComponent.vue')
    ),
    TablaEditFabricacionComponent: defineAsyncComponent(() =>
      import('@/modules/ListadoPartes/components/TablaEditFabricacionComponent.vue')
    ),
    SelectComponent: defineAsyncComponent(() =>
      import('@/modules/shared/components/SelectComponent.vue')
    )
  },
  async created() {
    if (localStorage.getItem('fechaInicioActual')) {
      //Si hay una diferencia de más de 1 día entre la fecha actual y la fecha de inicio, se limpian los campos
      const fechaActual = new Date()
      const fechaInicio = new Date(localStorage.getItem('fechaInicioActual'))
      const diferencia = fechaActual - fechaInicio
      if (diferencia > 86400000) {
        this.handleClean()
      }
    }
    this.toggleBisActive = localStorage.getItem('toggleBisActive') === 'true' || false
    this.toggleRetalActive = localStorage.getItem('toggleRetalActive') === 'true' || false
    this.fechaInicioActual = localStorage.getItem('fechaInicioActual') || this.getFechaActual()
    this.horaInicioActual = localStorage.getItem('horaInicioActual') || this.getHoraActual()
    this.fechaFinActual = localStorage.getItem('fechaFinActual') || this.getFechaActual()
    this.horaFinActual = localStorage.getItem('horaFinActual') || this.getHoraActual()
    this.nbloque = localStorage.getItem('nbloque') || null
    this.observaciones = localStorage.getItem('observaciones') || ''
    this.employeeNumber = this.getEmployeeNumber || localStorage.getItem('employeeNumber')
    this.employeeName = this.getEmployeeName || localStorage.getItem('employeeName')
    this.actualizarMostrarMensaje(false)
    this.trabajadores = await this.getTrabajadores.map((trabajador) => ({
      id: trabajador.numero_trabajador,
      nombre: `${trabajador.numero_trabajador} - ${trabajador.nombre_completo}`
    }))
  },
  methods: {
    ...mapActions('Shared', ['actualizarMensaje', 'actualizarMostrarMensaje']),
    handleClick() {
      this.showModal = true
      this.actualizarMostrarMensaje(false)
    },
    checkInput() {
      // Actualiza inputLength con la longitud de la entrada
      if (this.nbloque) {
        this.inputLength = this.nbloque.length
      } else {
        this.inputLength = 0
      }
      console.log('Input length', this.inputLength)
      // Comprueba si la entrada es numérica y tiene exactamente 5 dígitos
      if (!this.toggleRetalActive && this.inputLength > 0) {
        if (!/^\d{5}$/.test(this.nbloque)) {
          this.showAlert = true
        } else {
          this.showAlert = false
          localStorage.setItem('nbloque', this.nbloque)
        }
      } else {
        this.showAlert = false
      }
    },
    getproduccionMaquina(items) {
      this.produccionMaquina = items
      delete this.produccionMaquina.editing
    },
    setHoraFin() {
      const horaFin = this.getHoraActual()
      if (horaFin > this.horaInicioActual) {
        this.horaFinActual = horaFin
      } else {
        alert('La hora de finalización debe ser mayor que la hora de inicio')
      }
    },
    getFechaActual() {
      const fecha = new Date()
      const año = fecha.getFullYear()
      const mes = ('0' + (fecha.getMonth() + 1)).slice(-2) // Los meses en JavaScript comienzan en 0
      const dia = ('0' + fecha.getDate()).slice(-2)
      return `${año}-${mes}-${dia}`
    },
    getHoraActual() {
      const fecha = new Date()
      const horas = ('0' + fecha.getHours()).slice(-2)
      const minutos = ('0' + fecha.getMinutes()).slice(-2)
      return `${horas}:${minutos}`
    },
    handleSubmit() {
      if (this.toggleRetalActive === true) {
        this.nbloque = null
      } else {
        if (!/^\d{5}$/.test(this.nbloque)) {
          this.showModal = false
          this.showAlert = true
          return
        } else {
          this.showAlert = false
        }
      }

      if (this.produccionMaquina.length === 0) {
        this.actualizarMensaje({
          tipo: 'warning',
          mensaje: 'Debes añadir al menos un registro de producción'
        })
        this.actualizarMostrarMensaje(true)
        return
      }

      if (this.produccionMaquina.length > 0) {
        for (const item of this.produccionMaquina) {
          delete item.editing
          item.largo = parseFloat(item.largo)
          item.ancho = parseFloat(item.ancho)
          item.grosor = parseFloat(item.grosor)
          item.numeroPiezas = Number(item.numeroPiezas)
        }
      }
      const form = {
        numero_bloque: parseInt(this.nbloque) || null,
        numero_trabajador: parseInt(this.employeeNumber),
        fecha_inicio: this.fechaInicioActual,
        hora_inicio: this.horaInicioActual,
        fecha_fin: this.fechaFinActual,
        hora_fin: this.horaFinActual,
        retal: this.toggleRetalActive,
        bis: this.toggleBisActive,
        observaciones: this.observaciones,
        produccionMaquina: this.produccionMaquina
      }

      this.$store
        .dispatch('ControlesHorarios/addParteCortabloques', form)
        .then(() => {
          this.handleClean()
          this.showModal = false
          this.actualizarMensaje({
            tipo: 'success',
            mensaje: 'Parte de cortabloques firmado correctamente'
          })
          this.actualizarMostrarMensaje(true)
          this.$emit('closeCortabloques', false)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    handleClean() {
      this.nbloque = null
      this.fechaInicioActual = this.getFechaActual()
      this.horaInicioActual = this.getHoraActual()
      this.fechaFinActual = this.getFechaActual()
      this.horaFinActual = this.getHoraActual()
      this.observaciones = ''
      this.toggleRetalActive = false
      this.toggleBisActive = false
      this.showAlert = false
      this.produccionMaquina = []
      localStorage.removeItem('items')
      localStorage.removeItem('nbloque')
      localStorage.removeItem('fechaInicioActual')
      localStorage.removeItem('horaInicioActual')
      localStorage.removeItem('fechaFinActual')
      localStorage.removeItem('horaFinActual')
      localStorage.removeItem('observaciones')
      localStorage.removeItem('toggleBisActive')
      localStorage.removeItem('toggleRetalActive')
    }
  },
  computed: {
    ...mapGetters('Auth', ['getEmployeeNumber']),
    ...mapGetters('Auth', ['getEmployeeName']),
    ...mapGetters('Trabajadores', ['getTrabajadores'])
  },
  watch: {
    toggleBisActive() {
      localStorage.setItem('toggleBisActive', this.toggleBisActive)
    },
    toggleRetalActive() {
      localStorage.setItem('toggleRetalActive', this.toggleRetalActive)
    },
    fechaInicioActual() {
      localStorage.setItem('fechaInicioActual', this.fechaInicioActual)
    },
    horaInicioActual() {
      localStorage.setItem('horaInicioActual', this.horaInicioActual)
    },
    fechaFinActual() {
      localStorage.setItem('fechaFinActual', this.fechaFinActual)
    },
    horaFinActual() {
      localStorage.setItem('horaFinActual', this.horaFinActual)
    },
    observaciones() {
      localStorage.setItem('observaciones', this.observaciones)
    },
    employeeNumber() {
      localStorage.setItem('employeeNumber', this.employeeNumber)
    }
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>