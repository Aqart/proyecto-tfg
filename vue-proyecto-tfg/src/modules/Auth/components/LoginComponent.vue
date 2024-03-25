<template>
  <div>
    <h1 class="text-5xl">{{ title }}</h1>
    <form @submit.prevent="handleSubmit">
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

      <button type="submit">Acceder</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import useAuth from '../composables/useAuth'
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
   setup() {

    const { loginUser } = useAuth()
    const userForm = ref({
      email: '',
      password: ''
    })
    return {
      userForm,
       handleSubmit: async () => {
        const { ok, message } = await loginUser(userForm.value)
        console.log(userForm.value)
        console.log(ok, message)
      }
    }
  }
  
}
</script>
