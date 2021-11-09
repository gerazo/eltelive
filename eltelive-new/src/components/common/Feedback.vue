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
                    <div v-if="isButton(key)">
                      <Button
                              :text="value.toString()"
                              :color="getColor(value,key)"
                      />
                    </div>
                    <div v-else-if="key.toUpperCase()==='VIEWERS'">
                        <a @click="showModal" style="cursor: pointer">{{value}}</a>
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
import Modal from "./Modal";
import Guests from "./Guests";
export default {

    name:'Feedback',
    props :{
        stats: Object,
        color:String,
        bandwidth:Number,
        last_update:Date,
        comments: Array,
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
                    return `rgb(${c2},${c1},20)`
                case 'CPU':
                    return `rgb(${c1},${c2},20)`
                case 'RAM' :
                    return `rgb(${c1},${c2},20)`
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
