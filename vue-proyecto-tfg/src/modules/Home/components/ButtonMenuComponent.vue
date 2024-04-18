<template>
  <router-link
    :to="`/${path.toLowerCase()}`"
    class="relative flex flex-row sm:items-center sm:justify-center items-start justify-center bg-stoneBackground-4 font-bold text-secondary rounded-lg border-secondary hover:ring-2 hover:ring-secondary hover:ring-offset-2 w-4/5 sm:w-full sm:h-96 h-24 text-center text-2xl sm:text-sm md:text-base"
  >
    <div
      class="absolute top-0 left-0 w-full h-1/2 rounded-t-lg bg-stoneBackground-1 shadow-sm"
    ></div>
    <div
      class="relative w-32 h-32 rounded-full bg-stoneBackground-4 border border-stoneBackground-1 shadow-sm"
    >
    
      <FontAwesomeIcon
        :icon="icon"
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-stoneBackground-3 text-6xl"
      />
    </div>
    <div class="absolute bottom-20 text-stoneBackground-3">
      {{ name }}
    </div>
  </router-link>
</template>
<!-- ... Resto del código  ... -->

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    icon: {
      type: Array,
      default: null
    }
  }
}
</script>
