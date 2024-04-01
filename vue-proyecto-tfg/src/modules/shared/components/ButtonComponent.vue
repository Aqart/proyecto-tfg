<template>
    <button 
        :class="buttonClasses" 
        :type="type">{{ text }}
    </button>
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
        otherClasses:{
            type: String,
            default: 'rounded-lg w-full p-2.5 mt-4'
        },
        type:{
            type: String,
            default: ''
        }
    },
    data() {
        return {
            isHovered: false
        }
    },
    computed: {
        buttonClasses() {

            let classes = `${this.bgColor} `;
            
            
            if(this.bgColor === 'bg-primary'){
                classes += 'text-secondary hover:bg-secondary hover:text-primary';
            }

            if(this.bgColor === 'bg-secondary'){
                classes += 'text-primary hover:bg-primary hover:text-secondary';
            }
            classes += ` ${this.otherClasses} ease-in-out transition-all duration-75`
            return classes
            
        }
    }
}
</script>