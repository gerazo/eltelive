<template>

    <div class="card text-center  container-md">

        <div class="card-body">
            <div v-if="message.length===0">
                <table class="table table-primary ">
                    <thead>
                        <th>CLEINT ID</th>
                        <th v-for="(val,k) in Object.values(stats)[0]" >
                            {{k}}
                        </th>
                    </thead>
                    <tbody>
                    <tr v-for="(value,key) in stats">
                        <td>{{key}}</td>
                        <td v-for="(val,k) in value" >
                            {{val}}
                        </td>
                    </tr>
                    </tbody>
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

    name:'Guests',
    props:{
        isModalVisible:Boolean,
    },
    data(){
        return {
            stats:{"9HQERALH":{"connectCreated":11,"bytes":187963.717,"ip":"::1","protocol":"http"},"6FD0AR2U":{"connectCreated":7,"bytes":130138.832,"ip":"::1","protocol":"http"}},
            last_update:  ((new Date())),
            message:"",
            server:null,
            total:0,

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
                delete this.stats['Live Time'];
                this.last_update = result["data"]["Live Time"]
                this.total = result["data"]['TOTAL'];
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
            if(this.isModalVisible){
              await this.getStreamData()
            }
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
        if(this.intervalHandle)
        clearInterval(this.intervalHandle)
    }

}
</script>
<style>

</style>
