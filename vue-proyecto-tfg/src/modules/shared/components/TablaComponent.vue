<template>
  <div class="relative w-full shadow-md flex flex-col mb-10">
    <div class="flex flex-row flex-wrap bg-stoneBackground-2 rounded-t-lg">
      <h1 class="text-4xl font-bold text-center p-10 text-stoneBackground-3 flex-grow table-title">
        Listado de {{ formattedRoute.toLowerCase() }}
      </h1>
      <div class="flex flex-col my-3">
        <span
          class="inline-flex items-center justify-end mx-4 my-2 border border-transparent text-lg font-bold rounded-md text-stoneBackgroundContrast-1 transition-all duration-150 ease-linear text-bold cursor-pointer hover:text-shadow hover:scale-105"
          @click="toggleModalOpenNew()"
        >
          <FontAwesomeIcon :icon="['fas', 'plus']" class="mr-1" />Añadir nuevo
        </span>
        <span
          class="inline-flex items-center justify-end mx-4 my-2 border border-transparent text-lg font-bold rounded-md text-stoneBackgroundContrast-1 transition-all duration-150 ease-linear text-bold cursor-pointer hover:text-shadow hover:scale-105"
          @click="exportToPDF()"
        >
          <FontAwesomeIcon :icon="['fas', 'file-pdf']" class="mr-1" />Exportar a PDF
        </span>
      </div>
    </div>
    <div
      class="flex gap-4 items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 px-4 py-4 bg-stoneBackground-2"
    >
      <div class="relative inline-block text-left flex-shrink-0">
        <a
          class="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-5 py-2 bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:ring-2 hover:ring-secondary"
          :class="disabled"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          @click="toggleModalDeletedSelected"
        >
          <FontAwesomeIcon :icon="['fas', 'trash-can']" class="mr-2 hover:text-secondary" />
          Eliminar seleccionados
          <span v-if="selectedCheckboxes.length > 0">&nbsp;({{ selectedCheckboxes.length }})</span>
        </a>
      </div>
      <label for="table-search" class="sr-only">Buscar</label>
      <div class="relative flex-grow">
        <div
          class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none"
        >
          <SearchIconComponent
            :class="'w-4 h-4 text-gray-500 focus:text-secondary transition-colors duration-200'"
          />
        </div>
        <div v-if="show">
          <input
            type="text"
            id="table-search"
            class="block pt-2 pb-2 px-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-secondary focus:ring-1 focus:border-secondary focus:outline-none shadow-sm"
            :placeholder="`Buscar ${formattedRoute.toLowerCase()}`"
            v-model="searchQuery"
          />
        </div>
      </div>
    </div>

    <div class="flex-grow overflow-auto">
      <table class="min-w-full divide-y divide-gray-200 text-left" id="table">
        <thead class="text-lg font-bold text-stoneBackground-3 bg-stoneBackground-2 sticky top-0">
          <tr>
            <th scope="col" class="p-6 no-print">
              <div class="flex items-center">
                <input
                  @change="selectAllCheckboxes"
                  v-model="isAllChecked"
                  id="checkbox-all-search"
                  type="checkbox"
                  class="accent-stoneBackgroundContrast-1 w-4 h-4 bg-secondary-100 border-gray-300 rounded focus:ring-secondary"
                  :class="disabledCheckbox"
                />
                <label for="checkbox-all-search" class="sr-only">checkbox</label>
              </div>
            </th>
            <template v-for="key in formattedHeader" :key="key">
              <th
                v-if="key !== 'fecha_registro' && key !== 'ultima_conexion'"
                :colspan="key === 'Apellidos' ? 2 : 1"
                scope="col"
                class="px-6 py-3"
              >
                <button
                  @click="sortTable(key)"
                  class="flex items-center w-full"
                  :class="key !== 'nombre' && key !== 'email' ? 'justify-center' : 'justify-start'"
                >
                  <div
                    v-html="formatIndex(key)"
                    :class="key !== 'nombre' || key !== 'email' ? 'text-center' : ''"
                  ></div>
                  <div v-show="sortField === key" class="relative ml-2">
                    <FontAwesomeIcon
                      :icon="['fas', 'sort-up']"
                      class="absolute w-4 h-4 bottom-[-.4rem] no-print"
                      :class="{ 'opacity-50': sortDirection === -1 }"
                    />
                    <FontAwesomeIcon
                      :icon="['fas', 'sort-down']"
                      class="absolute w-4 h-4 top-[-.4rem] no-print"
                      :class="{ 'opacity-50': sortDirection === 1 }"
                    />
                  </div>
                </button>
              </th>
            </template>
            <th scope="col" class="px-6 py-3 text-center no-print">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-gray-200 max-h-screen overflow-auto">
          <tr
            v-for="body in searchFilteredData"
            :key="body.id"
            class="bg-gray-50 border-b hover:bg-gray-100"
          >
            <td class="w-4 p-6 no-print">
              <div class="flex items-center">
                <input
                  id="checkbox-table-search-1"
                  type="checkbox"
                  :value="body.id"
                  v-model="selectedCheckboxes"
                  class="accent-stoneBackgroundContrast-1 w-4 h-4 border-stoneBackground-3 rounded"
                />
                <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
              </div>
            </td>
            <template v-for="(el, index) in body">
              <td
                v-if="index === 'id_maquina'"
                :key="`${el}-td-${index}-maquina`"
                class="px-6 py-4"
              >
                <div class="text-sm text-center text-stoneBackgroun-3">
                  {{
                    el !== null
                      ? getMaquinas.find((maquina) => maquina.id === el).nombre
                      : 'Sin máquina asociada'
                  }}
                </div>
              </td>
              <th
                v-else-if="index === 'nombre' || index === 'email'"
                :key="`${el}-th`"
                class="px-6 py-4"
              >
                <div class="text-sm text-stoneBackgroun-3 font-bold">
                  {{ el }}
                </div>
              </th>
              <td
                v-else-if="
                  index !== 'id' && index !== 'fecha_registro' && index !== 'ultima_conexion'
                "
                :key="`${el}-td-${index}`"
                class="px-6 py-4"
              >
                <div class="text-sm text-center text-stoneBackground-3">
                  {{ el }}
                </div>
              </td>
            </template>
            <td
              class="flex flex-col px-6 py-4 no-print"
              :class="
                formattedRoute === 'Usuarios' || formattedRoute === 'Máquinas'
                  ? 'items-start gap-1'
                  : 'items-center'
              "
            >
              <span
                class="flex flex-row items-center justify-start text-md text-stoneBackgroundContrast-1 hover:text-stoneBackgroundContrast-5 cursor-pointer group"
                :class="
                  formattedRoute === 'Máquinas' || formattedRoute === 'Usuarios'
                    ? 'md:pl-6 lg:pl-16'
                    : ''
                "
                v-if="formattedRoute === 'Máquinas' || formattedRoute === 'Usuarios'"
                @click="toggleModalOpenInfo(body.id)"
                :data-id="body.id"
              >
                <FontAwesomeIcon :icon="['far', 'eye']" />
                <span
                  class="invisible group-hover:visible ml-2 transition-all duration-100 ease-in-out"
                  >Info
                </span>
              </span>
              <span
                class="flex flex-row items-center justify-start text-md text-stoneBackgroundContrast-1 hover:text-stoneBackgroundContrast-5 cursor-pointer group"
                :class="
                  formattedRoute === 'Máquinas' || formattedRoute === 'Usuarios'
                    ? 'md:pl-6 lg:pl-16'
                    : ''
                "
                @click="toggleModalOpenEdit(body.id)"
                :data-id="body.id"
              >
                <FontAwesomeIcon :icon="['fas', 'pen-to-square']" />
                <span
                  class="invisible group-hover:visible ml-2 transition-all duration-100 ease-in-out"
                  >Editar</span
                >
              </span>
            </td>
          </tr>
          <tr v-if="searchFilteredData.length === 0" class="bg-gray-50 border-b hover:bg-gray-100">
            <td
              :colspan="filteredHeader.length * 2 + 1"
              class="text-center font-bold py-3 text-stoneBackgroundContrast-2 text-lg"
            >
              No hay registros
            </td>
          </tr>
          <tr
            v-if="filteredHeader.includes('precio')"
            class="bg-gray-50 border-b hover:bg-gray-100"
          >
            <td
              :colspan="filteredHeader.length * 2"
              class="text-center font-bold py-3 text-stoneBackgroundContrast-2 text-2xl"
            >
              <span class="text-stoneBackgroundContrast-3">Total:&nbsp;</span>
              {{ totalPrecio }}€
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <LoadingComponent :fullScreen="true" :loading="loading" size="48px" />
    <ModalComponent :title="modalTitle" :modalActive="showModal" @close="toggleModalClose">
      <InfoMaquinaComponent
        v-if="modalType === 'infoMaquina'"
        :data="item"
        @close="toggleModalClose"
      />
      <InfoUsuarioComponent
        v-if="modalType === 'infoUsuario'"
        :data="item"
        @close="toggleModalClose"
      />
      <TrabajadoresFormComponent
        v-if="modalType === 'trabajador'"
        :data="item || {}"
        :tipo="modalTitle"
        :users="data"
        @send="getNewData"
        @errorForm="handleError"
        @close="toggleModalClose"
      />
      <UsuariosFormComponent
        v-if="modalType === 'register'"
        :data="item || {}"
        :tipo="modalTitle"
        :users="data"
        @send="getNewData"
        @errorForm="handleError"
        @close="toggleModalClose"
      />
      <DeleteConfirmationComponent
        v-if="modalType === 'delete'"
        :items="selectedItems"
        :itemType="formattedRoute.toLowerCase()"
        :total="data.length"
        @delete="deleteData"
        @close="toggleModalClose"
        @deselectItem="deselectCheckbox"
      />
      <FormComponent
        v-if="modalType === 'form'"
        :data="item || {}"
        @send="getNewData"
        :tipo="modalTitle"
        :maquinas="getMaquinas"
        @errorForm="handleError"
        @close="toggleModalClose"
      />
    </ModalComponent>
  </div>
</template>

<script>
import useShared from '@/modules/shared/composables/useShared'
import { mapGetters } from 'vuex'
import { ref } from 'vue'
import { defineAsyncComponent } from 'vue'
import html2pdf from 'html2pdf.js'

export default {
  props: {
    data: {
      type: Array,
      required: true
    },
    headers: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      modalTitle: '',
      searchQuery: '',
      show: true,
      selectedCheckboxes: [],
      selectedItems: [],
      isAllChecked: false,
      showModal: false,
      modalType: null,
      itemId: null,
      item: null,
      newData: {},
      formType: 'Editar',
      sortField: null,
      sortDirection: 1,
      loading: false,
      apellidos: ''
    }
  },
  components: {
    SearchIconComponent: defineAsyncComponent(() =>
      import('@/assets/images/SearchIconComponent.vue')
    ),
    ModalComponent: defineAsyncComponent(() =>
      import('@/modules/shared/components/ModalComponent.vue')
    ),
    FormComponent: defineAsyncComponent(() =>
      import('@/modules/shared/components/FormComponent.vue')
    ),
    DeleteConfirmationComponent: defineAsyncComponent(() =>
      import('@/modules/shared/components/DeleteConfirmationComponent.vue')
    ),
    UsuariosFormComponent: defineAsyncComponent(() =>
      import('@/modules/Usuarios/components/UsuariosFormComponent.vue')
    ),
    TrabajadoresFormComponent: defineAsyncComponent(() =>
      import('@/modules/Trabajadores/components/TrabajadoresFormComponent.vue')
    ),
    InfoMaquinaComponent: defineAsyncComponent(() =>
      import('@/modules/Maquinas/components/InfoMaquinaComponent.vue')
    ),
    InfoUsuarioComponent: defineAsyncComponent(() =>
      import('@/modules/Usuarios/components/InfoUsuarioComponent.vue')
    ),
    LoadingComponent: defineAsyncComponent(() =>
      import('@/modules/shared/components/LoadingComponent.vue')
    )
  },
  setup() {
    const { actualizarMensaje, actualizarMostrarMensaje } = useShared()

    const cerrarMensaje = () => {
      actualizarMostrarMensaje(false)
    }

    const handleError = (error) => {
      actualizarMensaje(error.type, error.message)
      actualizarMostrarMensaje(error.status)
    }

    const formatIndex = (index) => {
      let formattedIndex = index.replace('_', ' ')
      formattedIndex =
        formattedIndex.charAt(0).toUpperCase() + formattedIndex.slice(1).toLowerCase()

      if (formattedIndex.includes('Id ')) {
        formattedIndex = formattedIndex.replace('Id ', '')
        formattedIndex =
          formattedIndex.charAt(0).toUpperCase() + formattedIndex.slice(1).toLowerCase()
      }
      if (formattedIndex.includes('m2')) {
        formattedIndex = formattedIndex.replace('m2', 'm<sup>2</sup>')
      }

      if (formattedIndex.includes('m3')) {
        formattedIndex = formattedIndex.replace('m3', 'm<sup>3</sup>')
      }
      if (formattedIndex.includes('Apellido1')) {
        formattedIndex = 'Apellidos'
      }

      if (formattedIndex.includes('Apellido2')) {
        formattedIndex = ''
      }

      return formattedIndex
    }
    const showDropdown = ref(false)

    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value
    }

    return {
      cerrarMensaje,
      formatIndex,
      showDropdown,
      toggleDropdown,
      handleError
    }
  },
  methods: {
    async exportToPDF() {
      // Crea un contenedor para el título y la tabla
      const container = document.createElement('div')

      // Agrega la tabla al contenedor
      const originalElement = document.getElementById('table')
      container.appendChild(originalElement)

      // Crea una copia del contenedor
      const printableElement = container.cloneNode(true)

      // Elimina las columnas de acciones de la copia
      const noPrintElements = printableElement.querySelectorAll('.no-print')
      noPrintElements.forEach((element) => {
        element.remove()
      })
      // Elimina todos los estilos de printableElement, excepto los necesarios para el formato de la tabla
      const allElements = printableElement.getElementsByTagName('*')
      for (let i = 0; i < allElements.length; i++) {
        if (
          allElements[i].tagName !== 'TABLE' &&
          allElements[i].tagName !== 'TH' &&
          allElements[i].tagName !== 'TD'
        ) {
          allElements[i].removeAttribute('style')
          allElements[i].removeAttribute('class')
        }
      }
      // Obtiene el título de la tabla
      const title = document.querySelector('.table-title').innerText

      // Crea un nuevo elemento para el título
      const titleElement = document.createElement('h1')
      titleElement.style.textAlign = 'center'
      titleElement.style.fontSize = '48px'
      titleElement.style.paddingBottom = '20px'
      titleElement.innerText = title

      // Agrega el título al inicio de la copia de la tabla
      printableElement.prepend(titleElement)

      const date = new Date()
      const dateStr = date.toLocaleDateString().replace(/\//g, '')
      const timeStr = date.toLocaleTimeString().replace(/:/g, '')
      const dateTimeStr = `${dateStr}${timeStr}`

      const formattedRoute =
        this.$route.path.slice(1).charAt(0).toLowerCase() + this.$route.path.slice(2)

      // Genera el PDF de la copia
      const opt = {
        margin: [1, 0.5, 1, 0.5],
        filename: `${formattedRoute}_${dateTimeStr}.pdf`,
        image: { type: 'webp', quality: 1 },
        html2canvas: { scale: 5 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      }
      try {
        this.loading = true
        await html2pdf().set(opt).from(printableElement).save()
      } catch (e) {
        console.error('Error al generar el pdf', e)
      } finally {
        this.loading = false
        location.reload()
      }
    },
    sortTable(field) {
      if (this.sortField === field) {
        this.sortDirection *= -1
      } else {
        this.sortField = field
        this.sortDirection = 1
      }
    },
    handleFormType(type) {
      this.formType = type
    },
    getNewData(data) {
      if (data) {
        this.newData = data
        this.$emit('saveData', this.newData, this.modalTitle)
      }
    },
    selectAllCheckboxes(event) {
      if (event.target.checked) {
        this.selectedCheckboxes = this.searchFilteredData.map((item) => item.id)
      } else {
        this.selectedCheckboxes = []
      }
    },
    deselectCheckbox(id) {
      this.selectedCheckboxes = this.selectedCheckboxes.filter((item) => item !== id)
    },
    modalName(name) {
      return (this.modalTitle = name)
    },
    toggleModalOpenNew() {
      this.cerrarMensaje()
      // Cuando abre el modal tiene que comprobar la ruta de la que viene para asignar el título
      const formattedRoute =
        this.$route.path.slice(1).charAt(0).toLowerCase() + this.$route.path.slice(2)
      if (formattedRoute == 'usuarios') {
        this.modalType = 'register'
        this.modalTitle = 'Añadir nuevo usuario'
      } else if (formattedRoute == 'trabajadores') {
        this.modalType = 'trabajador'
        this.modalTitle = 'Añadir nuevo trabajador'
      } else {
        this.modalType = 'form'
        this.modalTitle = 'Añadir nuevo'
      }
      if (this.data.length > 0) {
        // Obtener el tipo de dato de cada elemento en data
        this.item = Object.keys(this.data[0]).reduce((obj, key) => {
          if (typeof this.data[0][key] == 'string') {
            obj[key] = ''
          } else if (typeof this.data[0][key] == 'number') {
            obj[key] = null
          } else {
            obj[key] = null
          }
          return obj
        }, {})
      } else {
        this.item = Object.keys(this.headers[0]).reduce((obj, key) => {
          if (typeof this.headers[0][key] == 'string') {
            obj[key] = ''
          } else if (typeof this.headers[0][key] == 'number') {
            obj[key] = null
          } else {
            obj[key] = null
          }
          return obj
        }, {})
      }
      this.showModal = !this.showModal
    },
    toggleModalOpenEdit(id) {
      this.cerrarMensaje()
      const formattedRoute =
        this.$route.path.slice(1).charAt(0).toLowerCase() + this.$route.path.slice(2)
      if (formattedRoute == 'usuarios') {
        this.modalTitle = 'Editar usuario'
        this.modalType = 'register'
      } else if (formattedRoute == 'trabajadores') {
        this.modalTitle = 'Editar trabajador'
        this.modalType = 'trabajador'
      } else {
        this.modalTitle = 'Editar'
        this.modalType = 'form'
      }
      this.itemId = id
      this.getItemById(this.itemId)
      this.showModal = !this.showModal
    },
    toggleModalOpenInfo(id) {
      const formattedRoute =
        this.$route.path.slice(1).charAt(0).toLowerCase() + this.$route.path.slice(2)
      this.cerrarMensaje()
      this.itemId = id
      this.getItemById(this.itemId)
      console.log(this.item)
      this.modalTitle = `Información de ${this.item.nombre}`
      this.modalType = 'infoMaquina'
      if (formattedRoute == 'usuarios') {
        // const empleado = this.getEmpleados.find(empleado => empleado.numero_trabajador == this.item.numero_trabajador)
        // const nombreEmpleado = empleado.nombre + " " + empleado.apellido1 + " " + empleado.apellido2 + " (" + empleado.numero_trabajador + ")"
        this.modalTitle = `Información del empleado`
        this.modalType = 'infoUsuario'
      }
      this.showModal = !this.showModal
    },
    toggleModalClose() {
      this.cerrarMensaje()
      this.showModal = !this.showModal
      this.modalTitle = ''
      this.modalType = null
      this.itemId = null
      this.item = null
      this.selectedItems = []
    },
    getItemById(id) {
      this.item = this.data.find((item) => item.id === id)
    },
    toggleModalDeletedSelected() {
      this.cerrarMensaje()
      this.modalTitle = 'Eliminar'
      this.modalType = 'delete'
      this.showModal = !this.showModal
      // Método para obtener los elementos a eliminar de selectedCheckboxes de data
      this.selectedItems = this.data.filter((item) => this.selectedCheckboxes.includes(item.id))
    },
    deleteData(data) {
      this.$emit('deleteSelected', data)
      this.selectedCheckboxes = []
      this.isAllChecked = false
      this.showModal = !this.showModal
      this.modalType = null
    }
    // async maquinaById(id) {
    //   const maquina = await this.getMaquinas().find((maquina) => maquina.id === id)
    //   console.log(maquina)
    //   return maquina
    // }
  },
  computed: {
    ...mapGetters('Maquinas', ['getMaquinas']),
    ...mapGetters('Trabajadores', ['getEmpleados']),
    disabledCheckbox() {
      return this.searchFilteredData.length > 0 ? '' : 'pointer-events-none opacity-50 cursor-not-allowed'
    },
    formattedHeader() {
      return this.filteredHeader
        .map((key) => {
          if (key === 'apellido1') {
            return 'Apellidos'
          } else if (key !== 'apellido2') {
            return key
          }
        })
        .filter(Boolean) // elimina los valores undefined
    },
    totalPrecio() {
      return this.data.reduce((total, item) => total + item.precio, 0)
    },
    disabled() {
      return this.selectedCheckboxes.length > 0
        ? ''
        : 'pointer-events-none opacity-50 cursor-not-allowed'
    },
    sortedData() {
      if (!this.sortField) {
        return this.data
      }

      return [...this.data].sort((a, b) => {
        const aValue = a[this.sortField] || ''
        const bValue = b[this.sortField] || ''

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return (aValue - bValue) * this.sortDirection
        }
        if (aValue < bValue) {
          return -1 * this.sortDirection
        }
        if (aValue > bValue) {
          return 1 * this.sortDirection
        }
        return 0
      })
    },
    formattedRoute() {
      const route = this.$route.path.slice(1).charAt(0).toUpperCase() + this.$route.path.slice(2)
      switch (route) {
        case 'Consumibles':
          return 'Consumibles'
        case 'Gastos-energeticos':
          return 'Gastos energéticos'
        case 'Gastos-generales':
          return 'Gastos generales'
        case 'Maquinas':
          return 'Máquinas'
        case 'Materias-primas':
          return 'Materias primas'
        case 'Trabajadores':
          return 'Trabajadores'
        case 'Transportes':
          return 'Transportes'
        case 'Usuarios':
          return 'Usuarios'
        default:
          return route
      }
    },
    filteredHeader() {
      if (this.data && this.data.length > 0) {
        return Object.keys(this.data[0]).filter((key) => key !== 'id')
      } else {
        return Object.keys(this.headers[0])
      }
    },
    searchFilteredData() {
      let result = this.data

      if (this.searchQuery) {
        // Utiliza el tipo de normalización Unicode "NFD" para eliminar los diacríticos
        const searchValue = this.searchQuery
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
        result = result.filter((item) => {
          return Object.keys(item).some((key) => {
            if (key === 'id_maquina') {
              // Busca la máquina usando item[key] (que es el id_maquina)
              // El rango u0300-u036f es para los caracteres acentuados en unicode
              const maquina = this.getMaquinas.find((maquina) => maquina.id === item[key])
              if (maquina) {
                return maquina.nombre
                  .normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '')
                  .toLowerCase()
                  .includes(searchValue)
              } else {
                const maquinaNull = 'Sin máquina asociada'
                return maquinaNull
                  .normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '')
                  .toLowerCase()
                  .includes(searchValue)
              }
            }
            // else if (key === 'ultima_conexion' || key === 'fecha_registro') {
            //   if(item[key] === null){
            //     return 'Registro sin completar'.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(searchValue);
            //   }
            //   // Convierte la fecha a una cadena de texto en el formato dd/mm/yyyy, hh:mm
            //   const fechaObj = new Date(item[key]);
            //   const fecha = `${fechaObj.getDate().toString().padStart(2, '0')}/${(fechaObj.getMonth() + 1).toString().padStart(2, '0')}/${fechaObj.getFullYear()}, ${fechaObj.getHours().toString().padStart(2, '0')}:${fechaObj.getMinutes().toString().padStart(2, '0')}`;
            //   return fecha.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(searchValue);
            // }
            else if (item[key]) {
              return item[key]
                .toString()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .toLowerCase()
                .includes(searchValue)
            }
          })
        })
      }

      if (this.sortField) {
        const sortDirection = this.sortDirection
        result = [...result].sort((a, b) => {
          const aValue = a[this.sortField] || ''
          const bValue = b[this.sortField] || ''

          if (typeof aValue === 'number' && typeof bValue === 'number') {
            return (aValue - bValue) * sortDirection
          }
          if (aValue < bValue) {
            return -1 * sortDirection
          }
          if (aValue > bValue) {
            return 1 * sortDirection
          }
          return 0
        })
      }

      return result
    }
  }
}
</script>
<style scoped>
.table-body-enter-active,
.table-body-leave-active {
  transition: opacity 0.5s;
}
.table-body-enter,
.table-body-leave-to {
  opacity: 0;
}
</style>
