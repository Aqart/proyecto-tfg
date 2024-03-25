<template>
  <div>
    <h1 class="text-5xl">{{title}}</h1>
    <!-- foreach para mostrar los consumibles -->
    <div v-for="consumible in consumibles" :key="consumible.id">
      <h2>{{consumible.nombre}}</h2>
      <p>{{consumible.precio}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    consumibles: {
      type: Array,
      required: true
    }
  }
}
</script>