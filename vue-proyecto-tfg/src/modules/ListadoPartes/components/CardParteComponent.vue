<template>
  <div class="h-full">
    <!-- CardParteComponent -->
    <div class="w-full mx-auto overflow-hidden h-full">
      <div class="h-full">
        <div
          class="p-10 text-md bg-white rounded-lg shadow-lg h-full border border-stoneBackgroundContrast-1"
        >
          <ul class="text-stoneBackground-3 font-bold flex flex-col gap-1">
            <li v-if="!toggleRetalActive" class="flex justify-between break-words">
              <span>Nº de bloque:</span>
              <span class="font-bold text-xl text-stoneBackgroundContrast-2">{{ nbloque }}</span>
            </li>
            <li v-else class="flex justify-between break-words">
              <span class="font-bold text-xl text-stoneBackgroundContrast-2">Retal</span>
            </li>
            <li class="flex justify-between break-words">
              <span>Trabajador:</span>
              <span class="font-normal">{{ employeeNumber }} - {{ employeeName }}</span>
            </li>
            <li class="flex justify-between break-words">
              <span>¿Es un bis?:</span>
              <span class="font-normal">{{ toggleBisActive ? 'Sí' : 'No' }}</span>
            </li>
            <li class="flex justify-between break-words">
              <span>Inicio:</span>
              <span class="font-normal">{{ formattedFechaInicioActual }}</span>
            </li>
            <li class="flex justify-between break-words">
              <span>Fin:</span>
              <span class="font-normal">{{ formattedFechaFinActual }}</span>
            </li>
            <li class="mt-2 break-words">
              <span>Producción de la máquina:</span>
              <ul class="ml-2 mt-1">
                <li v-for="item in produccionMaquina" :key="item.id" class="font-normal">
                  > {{ item.largo }} x {{ item.ancho }} x {{ item.grosor }} -
                  {{ item.numeroPiezas }} piezas
                </li>
                <li class="flex flex-col mt-2 break-words">
                  <span>Observaciones:</span>
                  <span class="mt-1 font-normal">{{ observaciones }}</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    employeeNumber: {
      type: Number,
      required: true
    },
    employeeName: {
      type: String,
      required: true
    },
    toggleRetalActive: {
      type: Boolean,
      required: true
    },
    nbloque: {
      type: Number,
      default: 0
    },
    toggleBisActive: {
      type: Boolean,
      required: true
    },
    fechaInicioActual: {
      type: String,
      required: true
    },
    horaInicioActual: {
      type: String,
      required: true
    },
    fechaFinActual: {
      type: String,
      required: true
    },
    horaFinActual: {
      type: String,
      required: true
    },
    observaciones: {
      type: String,
      required: true
    },
    produccionMaquina: {
      type: Array,
      required: true
    }
  },
  computed: {
    formattedFechaInicioActual() {
      console.log(this.fechaInicioActual)
      if (!this.fechaInicioActual || !this.horaInicioActual) {
        return ''
      }
      const fecha = new Date(this.fechaInicioActual.split('T')[0] + 'T' + this.horaInicioActual)
      const optionsFecha = { day: '2-digit', month: '2-digit', year: 'numeric' }
      const optionsHora = { hour: '2-digit', minute: '2-digit', hour12: false }
      console.log(fecha.toLocaleDateString('es-ES', optionsFecha))
      return (
        fecha.toLocaleDateString('es-ES', optionsFecha) +
        ' - ' +
        fecha.toLocaleTimeString('es-ES', optionsHora)
      )
    },
    formattedFechaFinActual() {
      if (!this.fechaFinActual || !this.horaFinActual) {
        return ''
      }
      const fecha = new Date(this.fechaFinActual.split('T')[0] + 'T' + this.horaFinActual)
      const optionsFecha = { day: '2-digit', month: '2-digit', year: 'numeric' }
      const optionsHora = { hour: '2-digit', minute: '2-digit', hour12: false }
      console.log(this.fechaFinActual)
      console.log(fecha.toLocaleDateString('es-ES', optionsFecha))
      return (
        fecha.toLocaleDateString('es-ES', optionsFecha) +
        ' - ' +
        fecha.toLocaleTimeString('es-ES', optionsHora)
      )
    }
  }
}
</script>

<style>
</style>