<template>
    <div>
        <h2 class="text-3xl" v-for="worker in workers" :key="worker.id">{{ worker.nombre + ' ' + worker.apellido1 + ' ' + worker.apellido2 }}</h2>
    </div>
</template>

<script>
export default {
    data(){
        return{
            workers: [],
        }
    },
    methods:{
        async getWorkers(){
            const response = await fetch('http://localhost:8000/trabajadores')
            const data = await response.json()
            this.workers = data["hydra:member"]
            }
    },
    created(){
        this.getWorkers()
    }
}
</script>
