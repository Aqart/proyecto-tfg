<template>
  <div class="w-full mx-auto">
    <div class="rounded-md shadow-md my-6 mx-4">
      <!-- Información del usuario -->
      <div class="rounded-t-md bg-stoneBackground-1 bg-opacity-20">
        <div class="rounded-t-md flex items-center justify-between w-full px-5 py-3 text-xl text-stoneBackground-3 bg-stoneBackground-1 bg-opacity-10 hover:bg-stoneBackground-4 hover:text-stoneBackgroundContrast-4">
          <span class="font-semibold">
            <FontAwesomeIcon :icon="['fas', 'fa-user']" class="mr-4" />{{ dataEmpleado.nombreCompleto }} ({{ data.numero_trabajador }})
          </span>
        </div>
        <div class="p-3 flex justify-center">
          <ul class="min-w-full sm:px-24 max-w-md divide-y divide-stoneBackground-1 divide-opacity-50">
            <li class="pb-2 pt-2 sm:pt-3 sm:pb-3">
              <p class="text-stoneBackgroundContrast-4 text-lg font-semibold truncate">
                Email: {{ data.email }}
              </p>
            </li>
            <li class="pb-2 pt-2 sm:pt-3 sm:pb-3">
              <p class="text-stoneBackgroundContrast-4 text-lg font-semibold truncate">
                Rol: {{ data.roles }}
              </p>
            </li>
            <li class="pb-2 pt-2 sm:pt-3 sm:pb-3">
              <p class="text-stoneBackgroundContrast-4 text-lg font-semibold truncate">
                Fecha de registro: {{ dataEmpleado.fechaRegistro }}
              </p>
            </li>
            <li class="pb-2 pt-2 sm:pt-3 sm:pb-3">
              <p class="text-stoneBackgroundContrast-4 text-lg font-semibold truncate">
                Última conexión: {{ dataEmpleado.ultimaConexion }}
              </p>
            </li>
            <li class="pb-2 pt-2 sm:pt-3 sm:pb-3">
              <p class="text-stoneBackgroundContrast-4 text-lg font-semibold truncate">
                Coste asociado: {{ dataEmpleado.costeAsociado }} €
              </p>
            </li>
            <li class="pb-2 pt-2 sm:pt-3 sm:pb-3">
            <p class="text-stoneBackgroundContrast-4 text-lg font-semibold truncate">
              Máquinas asociadas:
              <ul>
                <li v-for="(maquina, index) in dataEmpleado.maquinasAsociadas" :key="index">
                  {{ maquina }}
                </li>
              </ul>
            </p>
          </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dataEmpleado: {
        nombreCompleto: '',
        fechaRegistro: '',
        ultimaConexion: '',
        costeAsociado: 'Sin coste asociado',
        maquinasAsociadas: []
      }
    }
  },
  computed: {
    ...mapGetters('Trabajadores', ['getTrabajadores']),
  },
  created(){
    this.dataEmpleado.fechaRegistro = new Date(this.data.fecha_registro).toLocaleString('es-ES', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })
    this.dataEmpleado.ultimaConexion = new Date(this.data.ultima_conexion).toLocaleString('es-ES', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })

    const trabajador = this.getTrabajadores.find(
      (trabajador) => trabajador.numero_trabajador === this.data.numero_trabajador
    )

    if (trabajador) {
      this.dataEmpleado.nombreCompleto = trabajador.nombre_completo
      this.dataEmpleado.costeAsociado = trabajador.precio
    }

  },
  methods: {
    
  }
}
</script>
