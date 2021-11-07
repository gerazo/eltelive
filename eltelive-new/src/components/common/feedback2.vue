<template>

    <div class="card text-center">
        <div class="card-header">
            STREAM HEALTH FEEDBACK
        </div>
        <div class="card-body">
            <table class="table table-primary ">
                <thead class="ant-table-column-title" >
                <th v-for="(val,k) in stats" >
                    {{k}}
                </th>
                </thead>
                <tbody>
                <th v-for="(value,key) in stats">
                  <div v-if="key==='bandwidth' || key==='RAM' || key==='CPU'">
                      <Button  :text="value.toString()" :color="getColor(value,key==='bandwidth')" />
                  </div>
                  <div v-else-if="value===true">&#9989;</div>
                  <div v-else-if="value===false">&#10060;</div>
                  <div v-else>{{value}}</div>
                </th>
                </tbody>
            </table>
            <div class="table-danger">
                <div v-for="(value,key) in comments" class="text-dark">
                    {{value}}
                </div>
            </div>



        </div>
        <div class="card-footer text-muted">
            {{Date(last_update)}}
        </div>
    </div>
</template>


<script>
import Button from './Button'
export default {

    name:'Feedback2',
    props :{
        stats: Object,
        color:String,
        bandwidth:Number,
        last_update:Date,
        comments: Array,
    },
    components: {
        Button,
    },
    methods:{
        getColor(value,flag){

            const  c1 = 255*(value/100)
            const  c2 = 255-c1

            return flag ? `rgb(${c2},${c1},20)`: `rgb(${c1},${c2},20)`
        },
    },
}
</script>
<style>

</style>
