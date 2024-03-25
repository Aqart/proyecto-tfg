<template>
    <div>
        <h1 class="text-5xl">{{title}}</h1>
        <label 
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900">
            Correo Electrónico
        </label>
        <input 
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
            type="email"
            name="email"
            id="email"
            placeholder="email@email.es">
        <label 
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900">
            Contraseña
        </label>
        <input 
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            type="password" 
            name="password"
            id="password"
            placeholder="•••••••••">

        <button>Acceder</button>

        </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        }
    }
  
}
</script>