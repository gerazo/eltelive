<template>

    <div class="card text-center container-sm">
        <div class="card-header">
            STREAM HEALTH FEEDBACK
        </div>
        <div class="card-body">
        <table class="table table-info container-sm">
            <tr v-for="(value,key) in stats">
                <td>{{key}}</td>
                <div v-if="key=='bandwidth'" >
                  <td>
                    <Button  :text="value" :color="getColor(value)" />
                  </td>

                </div>
                <div v-else >
                  <td v-if="value===true">&#9989;</td>
                  <td v-else-if="value===false">&#10060;</td>
                  <td v-else>{{value}}</td>
                </div>

            </tr>
        </table>
        </div>

        <div class="card-footer text-muted">
          {{last_update}}
        </div>
    </div>
</template>


<script>
import Button from './Button'
export default {

    name:'Feedback',
    props :{
        stats: Object,
        color:String,
        bandwidth:0,
        last_update:Date,
    },
    components: {
        Button,
    },
    methods:{
        getColor(bandwidth){
            const  green = 255*(bandwidth/100)
            const  red = 255-green

            return `rgb(${red},${green},20)`
        },
    },

  mounted() {
      this.bandwidth = this.health_stats.bandwidth

  }
}
</script>
<style>

</style>
