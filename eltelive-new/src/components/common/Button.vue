<template>
    <div>
    <button  type="button"
             @click="showModal"
             :style="{background:color}"
             class="btn btn-primary mr-15 "

    >
        {{text}}%
    </button>
        <transition  name="modal-fade">
        <Modal
                v-show="isModalVisible"
                @close="closeModal"
        >
            <template v-slot:header>
                This is a new modal header.
            </template>

            <template v-slot:body>
                This is a new modal body.
            </template>

            <template v-slot:footer>
                This is a new modal footer.
            </template>
            </Modal>
        </transition>
    </div>

</template>


<script>

import Modal from "./Modal";

export default {

    name:'Button',
    props :{
        text:String,
        color:String,
    },
    components:{
        Modal,
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
