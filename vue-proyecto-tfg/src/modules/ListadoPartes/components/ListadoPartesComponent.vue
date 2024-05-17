<template>
  <div class="flex items-center justify-center">
    <div class="flex flex-col gap-5 w-full">
      <h1 class="text-4xl text-center text-stoneBackground-3 font-bold">Listado de partes</h1>
      <div>
        <div class="flex justify-center items-center">
          <div
            class="flex flex-col lg:flex-row py-5 sm:py-10 gap-3 w-full lg:justify-center items-center"
          >
            <div
              class="flex flex-col sm:flex-row gap-2 justify-between lg:justify-start items-center w-full"
            >
              <div
                class="flex flex-col sm:flex-row gap-5 justify-between lg:justify-start items-center w-full"
              >
                <label
                  for="fechaInicio"
                  class="text-xl font-medium first-letter:uppercase text-shadow text-stoneBackground-3"
                  >Fecha inicio</label
                >
                <input
                  type="date"
                  class="rounded-lg p-2.5 shadow w-full sm:w-1/2"
                  v-model="fechaInicio"
                />
              </div>
              <div
                class="flex flex-col sm:flex-row gap-5 justify-between lg:justify-start items-center w-full"
              >
                <label
                  for="fechaFin"
                  class="text-xl font-medium first-letter:uppercase text-shadow text-stoneBackground-3"
                  >Fecha fin</label
                >
                <input
                  type="date"
                  class="rounded-lg p-2.5 shadow w-full sm:w-1/2"
                  v-model="fechaFin"
                />
              </div>
            </div>
            <div
              class="flex flex-col lg:flex-row items-center justify-between gap-2 w-full lg:w-auto"
            >
              <ButtonComponent
                text="Mostrar partes"
                bgColor="bg-secondary"
                otherClasses="rounded-lg p-2.5 mt-0 shadow w-full lg:w-1/2"
                @click="changeFilter"
                :icon="['fas', 'fa-clipboard-list']"
              />
              <ButtonComponent
                text="Cambiar vista"
                bgColor="bg-secondary"
                otherClasses="rounded-lg p-2.5 mt-0 shadow w-full lg:w-1/2"
                @click="toggleView"
                :icon="['fas', 'fa-exchange-alt']"
              />
            </div>
          </div>
        </div>
      </div>
      <template v-if="beforeFilter">
        <div v-if="cards.length === 0" class="flex justify-center items-center gap-5">
          <div class="flex flex-col gap-5">
            <!--Si no se encuentran resultados-->
            <h2 class="text-2xl text-center text-stoneBackground-3 font-bold">
              No se han encontrado resultados
            </h2>
          </div>
        </div>
        <div v-else>
          <SelectComponent
            label="Ordenar por"
            :options="orderByOptions"
            @changeSelect="callMethod"
            class="p-2 text-md"
          />
          <div>
            <template v-if="isTableView">
              <TablaListadoPartesComponent :cards="cards" />
            </template>
            <template v-else>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="(card, index) in cards" :key="index" class="p-2">
                  <CardParteComponent
                    :employeeNumber="card.employeeNumber"
                    :employeeName="card.employeeName"
                    :toggleRetalActive="card.toggleRetalActive"
                    :nbloque="card.nbloque"
                    :toggleBisActive="card.toggleBisActive"
                    :fechaInicioActual="card.fechaInicioActual"
                    :horaInicioActual="card.horaInicioActual"
                    :fechaFinActual="card.fechaFinActual"
                    :horaFinActual="card.horaFinActual"
                    :observaciones="card.observaciones"
                    :produccionMaquina="card.produccionMaquina"
                  />
                </div>
              </div>
            </template>
          </div>
        </div>
        </div>
      </template>
      <LoadingComponent :loading="loading" :fullScreen="true" size="48px" />
  </div>
</template>
  
<script>
import { defineAsyncComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      isSortedAscending: true,
      isSortedBlockNumberAsc: true,
      isTableView: true,
      beforeFilter: false,
      fechaInicio: '',
      fechaFin: '',
      loading: false,
      cards: [],
      orderByOptions: [
        { id: 'ordenarPorNumeroBloque', nombre: 'Número de bloque' },
        { id: 'ordenarPorTrabajador', nombre: 'Trabajador' }
      ]
    }
  },
  async created() {
    this.fechaInicio = this.getFechaActual()
    this.fechaFin = this.getFechaActual()
    await this.fetchPartesCortabloques()
  },
  methods: {
    callMethod(methodName) {
      console.log(methodName)
      if (this[methodName]) {
        this[methodName]()
      } else {
        console.error(`El método ${methodName} no existe en este componente.`)
      }
    },
    ordenarPorNumeroBloque() {
      if (this.isSortedBlockNumberAsc) {
        this.cards.sort((a, b) => {
          if (a.nbloque === null) return 1
          if (b.nbloque === null) return -1
          return a.nbloque - b.nbloque || (a.retal === true ? -1 : b.retal === true ? 1 : 0)
        })
      } else {
        this.cards.sort((a, b) => {
          if (a.nbloque === null) return 1
          if (b.nbloque === null) return -1
          return b.nbloque - a.nbloque || (a.retal === true ? -1 : b.retal === true ? 1 : 0)
        })
      }
      this.isSortedBlockNumberAsc = !this.isSortedBlockNumberAsc
    },
    ordenarPorTrabajador() {
      if (this.isSortedAscending) {
        this.cards.sort((a, b) => a.employeeName.localeCompare(b.employeeName))
      } else {
        this.cards.sort((a, b) => b.employeeName.localeCompare(a.employeeName))
      }
      this.isSortedAscending = !this.isSortedAscending
    },
    toggleView() {
      this.isTableView = !this.isTableView
    },
    getEmployeeByNumber(employeeNumber) {
      return this.getEmpleados.find((empleado) => empleado.numero_trabajador === employeeNumber)
    },
    async changeFilter() {
      this.loading = true
      this.cards = []
      let response = await this.getPartesCortabloques

      // Convertir las fechas a objetos Date y establecer la hora
      const fechaInicioDate = new Date(this.fechaInicio)
      fechaInicioDate.setHours(0, 0, 0, 0)
      const fechaFinDate = new Date(this.fechaFin)
      fechaFinDate.setHours(23, 59, 59, 999)

      // Comprobar si las fechas son válidas
      if (isNaN(fechaInicioDate.getTime()) || isNaN(fechaFinDate.getTime())) {
        alert('Debes rellenar los campos de fecha')
        return
      } else if (fechaFinDate < fechaInicioDate) {
        alert('La fecha de inicio no puede ser mayor que la fecha de fin')
        return
      }

      let filteredParts = response.partesCortabloques.filter((parte) => {
        const fechaInicioParte = new Date(parte.fecha_inicio)
        fechaInicioParte.setMinutes(
          fechaInicioParte.getMinutes() + fechaInicioParte.getTimezoneOffset()
        )
        const fechaFinParte = new Date(parte.fecha_fin)
        fechaFinParte.setMinutes(fechaFinParte.getMinutes() + fechaFinParte.getTimezoneOffset())

        const fechaInicioParteSeg = fechaInicioParte.getTime()
        const fechaFinParteSeg = fechaFinParte.getTime()
        const fechaInicioDateSeg = fechaInicioDate.getTime()
        const fechaFinDateSeg = fechaFinDate.getTime()

        // Devolver true si la fecha de inicio de la parte ocurre dentro del rango de fechas y la fecha de fin no excede el límite superior del rango
        return (
          fechaInicioParteSeg >= fechaInicioDateSeg &&
          fechaInicioParteSeg <= fechaFinDateSeg &&
          fechaFinParteSeg <= fechaFinDateSeg
        )
      })

      // Ahora puedes trabajar con filteredParts, que solo incluye las partes que ocurren en el rango de fechas especificado
      filteredParts.forEach((parte) => {
        this.cards.push({
          employeeNumber: parte.numero_trabajador,
          employeeName: `${this.getEmployeeByNumber(parte.numero_trabajador).nombre} ${
            this.getEmployeeByNumber(parte.numero_trabajador).apellido1
          }`,
          toggleRetalActive: parte.retal,
          nbloque: parte.numero_bloque,
          toggleBisActive: parte.bis,
          fechaInicioActual: parte.fecha_inicio,
          horaInicioActual: parte.hora_inicio,
          fechaFinActual: parte.fecha_fin,
          horaFinActual: parte.hora_fin,
          observaciones: parte.observaciones,
          produccionMaquina: parte.produccionMaquina
        })
      })

      this.beforeFilter = true
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    getFechaActual() {
      const fecha = new Date()
      const año = fecha.getFullYear()
      const mes = ('0' + (fecha.getMonth() + 1)).slice(-2) // Los meses en JavaScript comienzan en 0
      const dia = ('0' + fecha.getDate()).slice(-2)
      return `${año}-${mes}-${dia}`
    },
    ...mapActions('ListadoPartes', ['fetchPartesCortabloques'])
  },
  computed: {
    ...mapGetters('ListadoPartes', ['getPartesCortabloques']),
    ...mapGetters('Trabajadores', ['getEmpleados'])
  },
  components: {
    ButtonComponent: defineAsyncComponent(() =>
      import('@/modules/shared/components/ButtonComponent.vue')
    ),
    TablaListadoPartesComponent: defineAsyncComponent(() =>
      import('@/modules/ListadoPartes/components/TablaListadoPartesComponent.vue')
    ),
    CardParteComponent: defineAsyncComponent(() =>
      import('@/modules/ListadoPartes/components/CardParteComponent.vue')
    ),
    LoadingComponent: defineAsyncComponent(() =>
      import('@/modules/shared/components/LoadingComponent.vue')
    ),
    SelectComponent: defineAsyncComponent(() =>
      import('@/modules/shared/components/SelectComponent.vue')
    )
  }
}
</script>

<style>
</style>