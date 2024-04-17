<template>
  <div>
    <!-- <MensajesComponent type="error" message="mensaje" mostrarMensaje="true" /> -->
    <h1 class="text-5xl text-stoneBackground-1 mb-3">{{ title }}</h1>
    <form @submit.prevent="handleSubmit">
      <label for="email" class="block mb-2 text-sm font-medium text-gray-900">
        Correo Electrónico
      </label>
      <div
        class="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus-within:ring-blue-500 focus-within:border-blue-500 block w-full"
      >
        <FontAwesomeIcon
          :icon="['fas', 'envelope']"
          class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <input
          v-model="userForm.email"
          type="email"
          class="pl-10 bg-transparent w-full py-2.5"
          placeholder="email@email.es"
        />
      </div>
      <label for="password" class="block mb-2 text-sm font-medium text-gray-900">
        Contraseña
      </label>
      <div
        class="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus-within:ring-blue-500 focus-within:border-blue-500 block w-full"
      >
        <FontAwesomeIcon
          :icon="['fas', 'lock']"
          class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <input
          v-model="userForm.password"
          class="pl-10 bg-transparent w-full py-2.5"
          type="password"
          name="password"
          id="password"
          placeholder="•••••••••"
          autocomplete="current-password"
        />
      </div>
      <ButtonComponent text="Acceder" bgColor="bg-primary" :icon="['fas', 'right-to-bracket']" />
    </form>
  </div>
</template>

<script>
import { defineAsyncComponent, ref } from 'vue'
import useAuth from '../composables/useAuth'
import { useRouter } from 'vue-router'

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
    )
  },
  setup() {
    const userForm = ref({
      email: '',
      password: ''
    })
    const errorMessage = ref({
      show: true,
      message: 'error'
    })

    const router = useRouter()
    const { loginUser } = useAuth()

    const handleSubmit = () => {
      console.log('userForm', userForm.value)
      const { ok, message } = loginUser(userForm.value)
      if (!ok) {
        errorMessage.value.show = false
        errorMessage.value.message = message
        console.log('errorMessage', errorMessage.value.show)
      }
      router.push('/home')
    }

    return { userForm, errorMessage, handleSubmit }
  }
}
</script>