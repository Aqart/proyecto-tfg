<template>
  <router-link
    :to="`/${path.toLowerCase()}`"
    class="flex flex-row sm:items-center sm:justify-center items-center justify-center bg-stone font-bold text-secondary rounded-lg border-secondary hover:ring-2 hover:ring-secondary hover:ring-offset-2 w-2/5 sm:w-full sm:h-96 h-24 text-center text-4xl sm:text-5xl"
  >
    <FontAwesomeIcon v-if="icon" :icon="icon" class="mr-2" />
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
