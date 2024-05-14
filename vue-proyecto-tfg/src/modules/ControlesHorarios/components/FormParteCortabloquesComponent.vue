<template>
  <form class="text-xl mx-10">
    <div class="grid grid-cols-1 gap-6">
      <div class="flex flex-col sm:flex-row justify-between items-start">
        <div class="flex flex-col justify-between items-start h-full">
          <div class="mt-4">
            <label for="fecha" class="block text-xl font-medium text-gray-700">Fecha inicio</label>
            <input
              type="date"
              name="fecha"
              id="fecha"
              v-model="fechaInicioActual"
              class="mt-1 focus:ring-stoneBackground-2 focus:border-stoneBackground-2 block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label for="hora" class="block text-xl font-medium text-gray-700">Hora inicio</label>
            <input
              type="time"
              name="hora"
              id="hora"
              v-model="horaInicioActual"
              class="mt-1 focus:ring-stoneBackground-2 focus:border-stoneBackground-2 block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div class="flex flex-col justify-between items-start gap-2 h-full">
          <div class="mt-4">
            <label for="fecha" class="block text-xl font-medium text-gray-700">Fecha final</label>
            <input
              type="date"
              name="fecha"
              id="fecha"
              v-model="fechaFinActual"
              class="mt-1 focus:ring-stoneBackground-2 focus:border-stoneBackground-2 block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label for="hora" class="block text-xl font-medium text-gray-700">Hora final</label>
            <input
              type="time"
              name="hora"
              id="hora"
              v-model="horaFinActual"
              class="mt-1 focus:ring-stoneBackground-2 focus:border-stoneBackground-2 block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div class="mt-4">
          <span class="text-xl font-medium text-gray-700">Turno</span>
          <div class="mt-2 space-y-2">
            <div>
              <label class="inline-flex items-center">
                <input type="radio" class="form-radio" name="turno" value="Mañana" />
                <span class="ml-2">Mañana</span>
              </label>
            </div>
            <div>
              <label class="inline-flex items-center">
                <input type="radio" class="form-radio" name="turno" value="Tarde" />
                <span class="ml-2">Tarde</span>
              </label>
            </div>
            <div>
              <label class="inline-flex items-center">
                <input type="radio" class="form-radio" name="turno" value="Noche" />
                <span class="ml-2">Noche</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <ListaFabricacionComponent />
      <div>
        <label for="obsevaciones" class="block text-xl font-medium text-gray-700"
          >Observaciones</label
        >
        <textarea
          name="observaciones"
          id="observaciones"
          rows="3"
          class="mt-1 focus:ring-stoneBackground-2 focus:border-stoneBackground-2 block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
        />
      </div>
      <div class="flex flex-row gap-2">
        <ButtonComponent text="Guardar" bgColor="bg-secondary" />
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
      fechaInicioActual: '',
      horaInicioActual: '',
      fechaFinActual: '',
      horaFinActual: ''
    }
  },
  components: {
    ButtonComponent: defineAsyncComponent(() =>
      import('@/modules/shared/components/ButtonComponent.vue')
    ),
    ListaFabricacionComponent: defineAsyncComponent(() =>
      import('@/modules/ControlesHorarios/components/ListaFabricacionComponent.vue')
    )
  },
  created() {
    this.fechaInicioActual = this.getFechaActual()
    this.horaInicioActual = this.getHoraActual()
    this.fechaFinActual = this.getFechaActual()
    this.horaFinActual = this.getHoraActual()
  },
  methods: {
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
    }
  },
  computed: {
    ...mapGetters('Maquinas', ['getMaquinas'])
  }
}
</script>

<style></style>
