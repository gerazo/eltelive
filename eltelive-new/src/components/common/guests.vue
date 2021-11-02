<template>

    <div class="card text-center container-sm">
        <div class="card-header">
            STREAM HEALTH FEEDBACK
        </div>
        <div class="card-body">
            <div v-if="message.length===0">
                <table class="table table-info container-sm">
                    <tr v-for="(value,key) in stats">
                        <td>{{key}}</td>

                        <td>{{value}}</td>
                    </tr>
                </table>
            </div>
            <div  v-else>
              <div class="alert-warning">{{message}}</div>
            </div>
        </div>
        <div class="card-footer text-dark">
            {{server}}
        </div>

        <div class="card-footer text-muted">
          {{stats.last_update}}
        </div>
    </div>
</template>


<script>

export default {

    name:'Feedback',
    data(){
        return {
            stats:{},
            last_update:  ((new Date())),
            message:"",
            server:null,

        }
    },
    methods:{

        async getStreamData(){

            const result = await fetch(
                "http://" +
                process.env.VUE_APP_HOST +
                ":" +
                process.env.VUE_APP_NODE_JS_PORT +
                "/api/get_guests",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                }
            ).then(res => res.json());

            if (result["status"]==="NA"){
                this.message = result["data"]
            }else{

                this.stats= result["data"]

            }
            // this.bandwidth = this.stats.bandwidth

            //console.log(this.stats)
        },
        async getServerData(){
            const result = await fetch(
                "http://" +
                process.env.VUE_APP_HOST +
                ":" +
                process.env.VUE_APP_NODE_JS_PORT +
                "/api/get_server",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                }
            ).then(res => res.json());


            this.server=result
            console.log(result)

        },
        async getInfo(){
            this.getStreamData()

        }

    },
   async created() {

       // const webSocket = require('socket.io-client')('wss://localhost:3000');

       //
       // console.log(webSocket)
       // webSocket.onmessage= (event)=>{
       //     console.log(event.data)
       // }
       // webSocket.onopen = function(event) {
       //     console.log(event)
       //     console.log("Successfully connected to the echo websocket server...")
       // }

       this.intervalHandle = setInterval(this.getInfo,2000)
    },
    beforeDestroy(){
        if(this.intervalHandle !==null)
        clearInterval(this.intervalHandle)
    }

}
</script>
<style>

</style>
