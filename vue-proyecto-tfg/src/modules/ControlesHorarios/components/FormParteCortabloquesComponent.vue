<template>
  <form class="text-xl mx-10">
    <div class="grid grid-cols-1 gap-6">
      <h3
        class="font-bold mb-4 block text-xl w-full border border-gray-300 rounded-lg py-2 px-5 bg-stoneBackground-2 text-stoneBackgroundContrast-1"
      >
        Trabajador:
        <span class="ml-3 text-2xl font-bold">{{ employeeNumber }} - {{ employeeName }}</span>
      </h3>
      <div class="flex flex-col md:flex-row justify-between items-start">
        <div class="flex flex-col w-1/3">
          <div class="flex flex-col gap-2">
            <div class="flex flex-row items-center justify-between md:gap-4">
              <span class="block text-xl font-medium text-gray-700 w-full">¿Es un Bis?</span>
              <div
                class="flex justify-between items-center"
                @click="toggleBisActive = !toggleBisActive"
              >
                <div
                  class="w-[4.5rem] h-12 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out cursor-pointer select-none"
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
            <div class="flex items-center gap-4">
              <span class="block text-xl font-medium text-gray-700 w-full">¿Es un retal?</span>
              <div
                class="flex justify-between items-center"
                @click="toggleAptoActive = !toggleAptoActive"
              >
                <div
                  class="w-[4.5rem] h-12 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out cursor-pointer select-none"
                  :class="{ 'bg-stoneBackgroundContrast-1': toggleAptoActive }"
                >
                  <div
                    class="bg-white w-10 h-10 rounded-full shadow-md transform duration-300 ease-in-out flex items-center justify-center select-none"
                    :class="{ 'translate-x-6': toggleAptoActive }"
                  >
                    {{ toggleAptoActive ? 'Sí' : 'No' }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Transition name="fade">
            <div v-if="!toggleAptoActive" class="mt-4 flex flex-col gap-2">
              <label for="nbloque" class="block text-xl font-medium text-gray-700"
                >Número de Bloque</label
              >
              <input
                type="text"
                ref="nbloqueInput"
                name="nbloque"
                v-model="nbloque"
                placeholder="Exactamente 5 dígitos"
                class="p-2 border border-gray-300 rounded-md focus:ring-stoneBackground-2 block w-full focus:border-stoneBackground-2 shadow-sm sm:text-xl"
                @blur="checkInput"
              />

              <div v-if="showAlert">
                <div
                  class="bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3"
                  role="alert"
                >
                  <p class="font-bold text-lg">Oops! Has introducido {{ inputLength }} dígitos.</p>
                  <p class="text-sm">Debes introducir exactamente 5.</p>
                </div>
              </div>
            </div>
          </Transition>
        </div>
        <div class="flex flex-col justify-between items-start h-full gap-5">
          <div>
            <label for="fecha" class="block text-xl font-medium text-gray-700">Fecha Entrada</label>
            <input
              type="date"
              name="fecha"
              id="fecha"
              v-model="fechaInicioActual"
              class="mt-1 focus:ring-stoneBackground-2 focus:border-stoneBackground-2 block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label for="hora" class="block text-xl font-medium text-gray-700">Hora Entrada</label>
            <input
              type="time"
              name="hora"
              id="hora"
              v-model="horaInicioActual"
              class="mt-1 focus:ring-stoneBackground-2 focus:border-stoneBackground-2 block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div class="flex flex-col justify-between items-start gap-20 h-full">
          <div>
            <label for="fecha" class="block text-xl font-medium text-gray-700">Fecha Salida</label>
            <input
              type="date"
              name="fecha"
              id="fecha"
              v-model="fechaFinActual"
              class="mt-1 focus:ring-stoneBackground-2 focus:border-stoneBackground-2 block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label for="hora" class="block text-xl font-medium text-gray-700">Hora Salida</label>
            <input
              type="time"
              name="hora"
              id="hora"
              v-model="horaFinActual"
              class="mt-1 focus:ring-stoneBackground-2 focus:border-stoneBackground-2 block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>

      <TablaFabricacionComponent @updateItems="getTableItems" class="my-4" />
      <div class="shadow border border-opacity-0 p-2 rounded-lg">
        <label for="obsevaciones" class="block text-xl font-medium text-gray-700"
          >Observaciones</label
        >
        <textarea
          name="observaciones"
          id="observaciones"
          placeholder="Escribe aquí tus observaciones..."
          rows="3"
          class="mt-1 p-5 focus:ring-stoneBackground-2 focus:border-stoneBackground-2 block w-full sm:text-xl border-gray-300 rounded-md"
        />
      </div>
      <div class="flex flex-row gap-2">
        <ButtonComponent text="Firmar parte" bgColor="bg-secondary" @click.prevent="handleSubmit" />
        <ButtonComponent text="Limpiar" bgColor="bg-secondary" />
      </div>
    </div>
  </form>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters } from 'vuex'
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
      toggleAptoActive: false,
      toggleBisActive: false,
      showAlert: false,
      tableItems: localStorage.getItem('tableItems')
        ? JSON.parse(localStorage.getItem('tableItems'))
        : []
    }
  },
  components: {
    ButtonComponent: defineAsyncComponent(() =>
      import('@/modules/shared/components/ButtonComponent.vue')
    ),
    TablaFabricacionComponent: defineAsyncComponent(() =>
      import('@/modules/ControlesHorarios/components/TablaFabricacionComponent.vue')
    )
  },
  created() {
    this.fechaInicioActual = this.getFechaActual()
    this.horaInicioActual = this.getHoraActual()
    this.fechaFinActual = this.getFechaActual()
    this.horaFinActual = this.getHoraActual()
    this.employeeNumber = this.getEmployeeNumber || localStorage.getItem('employeeNumber')
    this.employeeName = this.getEmployeeName || localStorage.getItem('employeeName')
  },
  methods: {
    checkInput() {
      // Actualiza inputLength con la longitud de la entrada
      this.inputLength = this.nbloque.length

      // Comprueba si la entrada es numérica y tiene exactamente 5 dígitos
      if (!/^\d{5}$/.test(this.nbloque)) {
        this.showAlert = true
        this.$nextTick(() => {
          this.$refs.nbloqueInput.focus()
        })
      } else {
        this.showAlert = false
      }
    },
    getTableItems(items) {
      this.tableItems = items
      delete this.tableItems.editing
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
      delete this.tableItems[0].editing
      const form = {
        employeeNumber: this.employeeNumber,
        fechaInicio: this.fechaInicioActual,
        horaInicio: this.horaInicioActual,
        fechaFin: this.fechaFinActual,
        horaFin: this.horaFinActual,
        apto: this.toggleAptoActive,
        bis: this.toggleBisActive,
        observaciones: this.observaciones,
        tableItems: this.tableItems
      }
      alert(JSON.stringify(form, null, 2))
    }
  },
  computed: {
    ...mapGetters('Auth', ['getEmployeeNumber']),
    ...mapGetters('Auth', ['getEmployeeName'])
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