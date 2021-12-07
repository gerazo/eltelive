<template>

    <div class="ant-card text-center">
        <div class="card-header">
            STREAM HEALTH FEEDBACK
        </div>
        <div class="card-body">
            <div v-show="Object.keys(health_stats).length>0" class="ant-table-wrapper">

                <table class="table  table-primary ">
                <thead class="ant-table-column-title" >
                <th v-for="(val,k) in health_stats" >
                    {{k}}
                </th>
                </thead>
                <tbody class=ant-table-body>

                <td v-for="(value,key) in health_stats">
                    <div v-if="isButton(key)">
                      <Button
                              :value="value"
                              :title="key.toString()"
                              :color="getColor(value,key)"
                      />
                    </div>
                    <div v-else-if="key.toUpperCase()==='VIEWERS'">
                        <a @click="showModal" style="cursor:pointer">{{value}}</a>
                        <Modal
                                v-show="isModalVisible"
                                @close="closeModal"
                        >

                            <template v-slot:body>
                                <Guests :isModalVisible="isModalVisible"/>
                            </template>

                        </Modal>

                        </div>
                    <div v-else>
                        <div v-if="value===true">&#9989;</div>
                        <div v-else-if="value===false">&#10060;</div>
                        <div v-else>{{value}}</div>
                    </div>
                </td>
                </tbody>
              </table>
            </div>
            <div class="table-danger">
                <div v-for="(value,key) in warnings" class="text-dark">
                    {{value}}
                </div>
            </div>



        </div>
        <div class="card-footer text-muted">
            {{Date(lastUpdate)}}
        </div>
    </div>
</template>


<script>
import Button from './SpecialButton'
import Modal from "./Modal";
import Guests from "./Guests";
export default {

    name:'Feedback',
    props :{
        health_stats: Object,
        lastUpdate:Date,
        warnings: Array,
    },
    components: {
        Modal,
        Button,
        Guests,
    },
    data() {
        return {
            isModalVisible: false,
        };
    },
    methods:{
        getColor(value,key){

            const  c1 = 255*(value/100)
            const  c2 = 255-c1
            switch(key.toUpperCase()){
                case 'BANDWIDTH':
                    return `rgb(${c2},${c1},0,0.7)`
                case 'CPU':
                    return `rgb(${c1},${c2},0,0.7)`
                case 'RAM' :
                    return `rgb(${c1},${c2},0,0.7)`
                case 'VIEWERS':
                    return `rgb(136,124,124)`
            }
        },
        isButton(key){
          return  key.toUpperCase()==='BANDWIDTH'
            || key.toUpperCase()==='RAM'
            || key.toUpperCase()==='CPU'
        },
        showModal() {
            console.log("SHOW")
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        }
    },
}
</script>
<style>

</style>
