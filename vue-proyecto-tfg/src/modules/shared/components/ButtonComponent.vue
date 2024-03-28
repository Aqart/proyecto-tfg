<template>
    <button :class="[bgColor, textColor, otherClasses]" :type="type">{{ text }}</button>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            required: true
        },
        bgColor:{
            type: String,
            default: 'bg-primary'
        },
        textColor:{
            type: String,
            default: 'text-secondary'
        },
        otherClasses:{
            type: String,
            default: `rounded-lg w-full p-2.5 mt-4`
        },
        type:{
            type: String,
            default: ''
        }
    }
}
</script>