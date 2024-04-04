<template>
      <div class="py-10 flex flex-col items-center">
          <h1 class="text-secondaryTitle text-6xl mb-auto">
              <router-link to="/gastos-generales" class="mr-4">Gastos Generales</router-link>
          </h1>
          <nav class="flex">
            <router-link to="/gastos-generales" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Ver los gastos generales</router-link>
            <router-link to="/gastos-generales/add" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 rounded">Añadir gastos generales</router-link>
          </nav>
      </div>  
  </template>
  <script>
  export default {
  
  }
  </script>