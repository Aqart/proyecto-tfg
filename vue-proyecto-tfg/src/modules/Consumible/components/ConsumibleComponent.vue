<template>
  <div>
    <h1 class="text-5xl">{{title}}</h1>
    <!-- foreach para mostrar los consumibles -->
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