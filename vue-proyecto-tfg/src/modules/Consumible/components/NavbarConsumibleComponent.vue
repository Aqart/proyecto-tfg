<template>
  <header>
      <div class="py-10 flex flex-col items-center">
          <h1 class="text-secondaryTitle text-6xl mb-auto">
              <router-link to="/consumibles" class="mr-4">Consumibles</router-link>
          </h1>
          <nav class="flex">
            <router-link to="/consumibles" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Ver los consumibles</router-link>
            <router-link to="/consumibles/add" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 rounded">Añadir Consumible</router-link>
          </nav>
      </div>
  </header>
  
  
  </template>
  <script>
  export default {
  
  }
  </script>