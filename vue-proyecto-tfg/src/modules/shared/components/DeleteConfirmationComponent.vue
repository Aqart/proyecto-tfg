<template>
  <div class="grid grid-cols-1 pt-5 p-7 rounded gap-10">
    <div v-if="listItems.length === 0" class="text-gray-500 w-full">
      <p>No hay {{ itemType }} para eliminar</p>
    </div>

    <div
      v-else-if="listItems.length === total"
      class="sm:w-90 mx-auto flex items-center justify-end mb-2 relative"
      role="alert"
    >
      <FontAwesomeIcon
        :icon="['far', 'circle-question']"
        class="sm:mr-3 text-6xl sm:text-8xl sm:inline-block text-stoneBackgroundContrast-2 absolute left-2 -top-1 sm:top-3 sm:left-10 sm:-mt-9 sm:-ml-0"
      />
      <div
        class="rounded-lg bg-stoneBackground-2 text-stoneBackground-3 p-4 sm:w-3/4 w-5/6 text-center"
      >
        <span class="sr-only">Info</span>
        <div>
          <span class="font-regular text-lg"
            >¿Desea eliminar todos los registros de {{ itemType }}?</span
          >
        </div>
        <div v-if="checkTrabajadores()">
          <span v-if="listItems.length === 1">
            <span class="font-semibold text-md text-red-500">Advertencia:</span>
            <span class="font-regular text-md"
              >El usuario a eliminar tiene un coste y/o máquina asociados</span
            >
          </span>
          <span v-else>
            <span class="font-semibold text-md text-red-500">Advertencia:</span>
            <span class="font-regular text-md"
              >Algunos usuarios a eliminar tienen un coste y/o máquina asociados</span
            >
          </span>
        </div>
      </div>
    </div>
    <div v-else class="w-full sm:w-90 mx-auto items-center" role="alert">
      <div class="flex items-center pb-11">
        <FontAwesomeIcon
          :icon="['fas', 'triangle-exclamation']"
          class="mr-3 text-2xl hidden sm:inline-block text-stoneBackground-3"
        />
        <div class="rounded-lg bg-stoneBackground-2 text-stoneBackground-3">
          <span class="sr-only">Info</span>
          <div>
            <span class="font-regular text-md"
              >Va a eliminar los siguientes registros de {{ itemType }}:</span
            >
          </div>
          <div v-if="checkTrabajadores()">
            <span v-if="listItems.length === 1">
              <span class="font-semibold text-md text-red-500">Advertencia:</span>
              <span class="font-regular text-md"
                >El usuario a eliminar tiene un coste y/o máquina asociados</span
              >
            </span>
            <span v-else>
              <span class="font-semibold text-md text-red-500">Advertencia:</span>
              <span class="font-regular text-md"
                >Algunos usuarios a eliminar tienen un coste y/o máquina asociados</span
              >
            </span>
          </div>
        </div>
      </div>
      <div
        class="max-h-[18rem] sm:max-h-72 xl:max-h-80 overflow-hidden overflow-y-scroll py-2"
      >
        <ul class="w-full gap-2 flex justify-between flex-wrap list-none pl-0">
          <li
            v-for="item in listItems"
            :key="item.id"
            class="flex justify-between items-center w-full bg-stoneBackground-4 px-6 rounded-md text-md font-semibold text-stoneBackgroundContrast-1
            min-h-16"
            :class="{
              'col-span-full':
                (item.nombre + ' ' + (item.email || '')).length > 30 ||
                (item.email && item.email.length > 30) ||
                listItems.length === 1
            }"
          >
            <div class="">
              <template v-for="(el, index) in item">
                <span :key="`${el}-del`" class="text-wrap" v-if="index == 'nombre'">{{
                  el
                }}</span>
                <span
                  :key="`${el}-del`"
                  class="text-wrap"
                  v-if="index == 'apellido1'"
                  v-html="`&nbsp;${el}`"
                ></span>
                <span :key="`${el}-del`" class="text-wrap" v-if="index == 'email'">{{ el }}</span>
                <span :key="`${el}-del`" class="text-wrap" v-if="index == 'nombre_completo'">{{ el }}</span>
                <span :key="`${el}-del`" class="text-wrap" v-if="index == 'id_maquina'"> - {{ getNombreMaquina(el) }}</span>
              </template>
            </div>
            <ButtonComponent
              type="button"
              text="X"
              bgColor="bg-transparent"
              otherClasses="h-6 w-6 rounded-md text-stoneBackgroundContrast-2 hover:scale-105 ml-2"
              @click="deselectItem(item.id)"
            />
          </li>
        </ul>
      </div>
    </div>
    <div class="sm:w-90 mx-auto flex justify-between gap-9">
      <ButtonComponent
        :icon="['fas', 'floppy-disk']"
        :hidden="listItems.length === 0"
        text="Confirmar"
        @click="confirmDelete"
        bgColor="bg-primary"
        otherClasses="flex justify-center items-center gap-5 text-lg rounded-lg w-full py-4 mt-4 hover:ring-2 hover:ring-primary hover:bg-opacity-80"
      />
      <ButtonComponent
        :icon="['fas', 'circle-xmark']"
        text="Cancelar"
        @click="toggleModal"
        bgColor="bg-secondary"
        otherClasses="flex justify-center items-center gap-5 text-lg rounded-lg w-full py-4 mt-4 hover:ring-2 hover:bg-opacity-80"
      />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters } from 'vuex'

export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    itemType: {
      type: String,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      listItems: []
    }
  },
  computed: {
    ...mapGetters('Maquinas', ['getMaquinas']),
    ...mapGetters('Trabajadores', ['getTrabajadores']),
  },
  components: {
    ButtonComponent: defineAsyncComponent(
      () => import('@/modules/shared/components/ButtonComponent.vue')
    )
  },
  methods: {
    getNombreMaquina(id){
      const maquinas = this.getMaquinas
      const maquina = maquinas.find(maquina => maquina.id === id)
      return maquina.nombre
    },
    checkTrabajadores(){
      const trabajadores = this.getTrabajadores
      return this.listItems.some(item => trabajadores.some(trabajador => trabajador.numero_trabajador === item.numero_trabajador));
    },
    confirmDelete() {
      this.$emit('delete', this.listItems)
    },
    toggleModal() {
      this.$emit('close')
    },
    openLoader() {
      return this.listItems.length === this.total
    },
    deselectItem(id) {
      this.listItems = this.listItems.filter((item) => item.id !== id)
      this.$emit('deselectItem', id)
    }
  },
  watch: {
    items: {
      handler: function (newVal) {
        this.listItems = newVal
      },
      immediate: true
    }
  }
}
</script>
