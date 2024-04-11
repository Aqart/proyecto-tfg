<template>
  <router-link
    :to="`/${name.toLowerCase()}`"
    class="inline-flex items-center justify-center bg-stone font-bold text-secondary rounded-lg border-secondary hover:ring-2 hover:ring-secondary hover:ring-offset-2 w-screen sm:w-48 h-48 text-center text-2xl sm:text-sm md:text-base"
  >
    {{ name }}
  </router-link>
</template>

<!-- ... Resto del código ... -->

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>

<style></style>
