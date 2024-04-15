<template>
  <form @submit.prevent="handleSubmit">
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
    <label for="password" class="block mb-2 text-sm font-medium text-gray-900"> Contraseña </label>
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
      <option value="ADMIN" selected>Admin</option>
    </select>

    <ButtonComponent text="Registrar" bgColor="bg-primary" />
  </form>
</template>

<script>
import { ref } from 'vue'
import useAuth from '../composables/useAuth'
import { defineAsyncComponent } from 'vue'

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
    const { createUser } = useAuth()
    const userForm = ref({
      email: '',
      password: '',
      roles: ''
    })
    return {
      userForm,
      handleSubmit: async () => {
        const { ok, message } = await createUser(userForm.value)
        console.log(ok, message)
      }
    }
  }
}
</script>
