<template>
    <button  type="button" @click="onClick()" :style="{background:color}" class="btn btn-primary mr-15 ">{{text}}%</button>
</template>


<script>
export default {

    name:'Button',
    props :{
        text:String,
        color:String,
    },

    methods:{

        onClick(){
            this.$emit('btn-click')
        }
    }
}
</script>
