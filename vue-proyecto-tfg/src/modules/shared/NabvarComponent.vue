<template>
<header>
    <div class="py-10 flex flex-col items-center">
        <h1 class="text-primaryTitle text-6xl mb-auto">
            <router-link to="/" class="mr-4">Transforstone</router-link>
        </h1>
        <nav class="flex">
            <router-link to="/login" class="mr-4">Login</router-link>
            <router-link to="/register" class="mr-4">Register</router-link>
            <router-link to="/consumibles">Consumibles</router-link>
        </nav>
    </div>
</header>


</template>
<script>
export default {

}
</script>