<template>
    <header class="p-4 text-primaryTitle">
        <nav class="flex flex-row justify-between items-center">
            <div class="flex items-center gap-3">
                <LogoComponent class="w-10 h-10" />
                <router-link to="/" class="text-4xl font-bold">Transforstone</router-link>
            </div>

            <div class="relative inline-block text-left">
                <button @click="open = !open" class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-secondary" id="options-menu" aria-haspopup="true" aria-expanded="true">
                    <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H4ZM7 12C7 11.4477 7.44772 11 8 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H8C7.44772 13 7 12.5523 7 12ZM13 18C13 17.4477 13.4477 17 14 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H14C13.4477 19 13 18.5523 13 18Z" fill="#000000"/>
                </svg>
                </button>

                <div v-show="open" class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <router-link to="/register" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Nuevo usuario</router-link>
                        <router-link to="/logout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Desconectar</router-link>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
import LogoComponent from './components/LogoComponent.vue';

export default {
    data() {
        return {
            open: false
        }
    },
    components: {
        LogoComponent
    }
}
</script>
