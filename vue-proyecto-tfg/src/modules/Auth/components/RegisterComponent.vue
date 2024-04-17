<template>
  <div>
    <LoadingComponent :fullScreen="true" size="40px" :loading="loading" />
    <router-link to="/home" class="text-center text-lg font-bold text-secondary mb-4"
      ><FontAwesomeIcon :icon="['fas', 'house']" />&nbsp;Volver al inicio</router-link
    >
    <form @submit.prevent="handleSubmit">
      <MensajesComponent
        :type="messages.type"
        :message="messages.message"
        :mostrarMensaje="messages.show"
      />
      <h1 class="text-5xl text-stoneBackground-1 mb-5">{{ title }}</h1>
      <label for="email" class="block mb-2 text-sm font-medium text-gray-900">
        Correo Electrónico
      </label>
      <input
        v-model="userForm.email"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        type="email"
        name="email"
        id="email"
        placeholder="email@email.es"
      />
      <label for="password" class="block mb-2 text-sm font-medium text-gray-900">
        Contraseña
      </label>
      <input
        v-model="userForm.password"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        type="password"
        name="password"
        id="password"
        placeholder="•••••••••"
      />
      <label for="roles" class="block mb-2 text-sm font-medium text-gray-900"> Roles </label>
      <select
        v-model="userForm.roles"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        name="roles"
        id="roles"
      >
        <option value="" selected disabled hidden>Elige una opción</option>
        <option value="ADMIN">Admin</option>
        <option value="TRABAJADORES">Trabajador</option>
      </select>

      <ButtonComponent text="Registrar" bgColor="bg-primary" />
    </form>
  </div>
</template>

<script>
import useAuth from '../composables/useAuth'
import { defineAsyncComponent, ref } from 'vue'
import router from '../router'

export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  components: {
    ButtonComponent: defineAsyncComponent(() =>
      import('@/modules/shared/components/ButtonComponent.vue')
    ),
    MensajesComponent: defineAsyncComponent(() =>
      import('@/modules/shared/components/MensajesComponent.vue')
    ),
    LoadingComponent: defineAsyncComponent(() =>
      import('@/modules/shared/components/LoadingComponent.vue')
    )
  },
  setup() {
    const loading = ref(false)
    const { createUser } = useAuth()
    const userForm = ref({
      email: '',
      password: '',
      roles: ''
    })

    const messages = ref({
      type: '',
      show: true,
      message: ''
    })

    const handleSubmit = async () => {
      try {
        if (
          userForm.value.email === '' ||
          userForm.value.password === '' ||
          userForm.value.roles === ''
        ) {
          messages.value.type = 'warning'
          messages.value.show = true
          messages.value.message = 'Todos los campos son obligatorios'
          setTimeout(() => {
            messages.value.show = !messages.value.show
          }, 6 * 1000)
          return
        }
        loading.value = true
        const { ok, message } = await createUser(userForm.value)
        if (ok) {
          messages.value.type = 'success'
          messages.value.show = true
          messages.value.message = message
        } else {
          messages.value.type = 'error'
          messages.value.show = true
          messages.value.message = message
        }
        if (messages.value.show) {
          setTimeout(() => {
            messages.value.show = !messages.value.show
          }, 6 * 1000)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setTimeout(() => {
          loading.value = false
        }, 1 * 1000)
      }
    }
    return {
      userForm,
      loading,
      messages,
      handleSubmit
    }
  }
}
</script>
