<template>
    <div>
    <button  type="button"
             @click="showModal"
             :style="`background-color:${color}`"
             class="btn btn-group-sm"

    >
        <div class="buttonText">
        {{value}}%
        </div>
    </button>
        <transition  name="modal-fade">
        <Modal
                v-show="isModalVisible"
                @close="closeModal"
        >
            <template v-slot:header>
                {{title}} Usage
            </template>

            <template v-slot:body>
                <div v-if="isModalVisible">
                    <LineChart :isModalVisible="isModalVisible" :title="title.toString()" :chartData="value"  />
                </div>
                <div v-else>
                    This is Default Body
                </div>
            </template>
            </Modal>
        </transition>
    </div>

</template>


<script>

import Modal from "./Modal";
import LineChart from "./LineChart";
export default {

    name:'Button',
    props :{

        title:String,
        value:Number,
        color:String,
    },
    components:{
        Modal,
        LineChart,
    },
    data() {
        return {
            isModalVisible: false,
        };
    },
    methods: {
        showModal() {
            console.log("SHOW")
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        }
    }
}
</script>
<style lang="scss">

.buttonText{
    font-size: large;
    font-weight: bolder;
    color: rgb(70, 68, 68);
}
</style>
