<!-- template for the modal component -->
<template>
<div class="modal-mask">
<div class="modal-wrapper">
    <div class="modal-container">

        <div class="modal-header">
            <slot name="header">
                <div></div>
            </slot>
            <button
                    type="button"
                    class="close"
                    aria-label="Close"
                    @click="$emit('close')"
            >
                x
            </button>
        </div>

        <div class="modal-body">
            <slot name="body">

            </slot>
        </div>

        <div class="modal-footer">
            <slot name="footer">
                <button
                        type="button"
                        class="btn btn-secondary"
                        @click="$emit('close')">
                    OK
                </button>
            </slot>
        </div>
    </div>

</div>
</div>


</template>
<style lang="scss">
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 950px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 0px 0;
}

.modal-default-button {
    display: block;
    margin-top: 1rem;
}



.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity .5s ease;
}
</style>


