<script src="flv.min.js"></script>
<template>
  <div>
    <div class="text-center pt-5 pb-5">
      <h1>Active Streams</h1>
    </div>
    <div class="d-flex justify-content-center">
      <div class="jumbotron w-50 p-3 mb-2">
      <p class="pt-3 pr-1 pl-3 lead">
        The <span class="h4">STREAM KEY</span> that is currently displayed is the key that you as a 
        streamer should copy to OBS. This key should be shared with your audience for them 
        to able to access your stream.
      </p>
      </div>
    </div>
    <div class="d-flex justify-content-center w-50 pt-5 pl-5">
      <div>
        <h6>Stream Key:</h6>
      </div>
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Stream Key" aria-label="Stream Key" readonly="readonly">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button">Copy</button>
          <button class="btn btn-primary" type="button">Generate Key</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "active-streams",
  data() {
    return {

    };
  },
  methods: {
  },
}
</script>
<style lang ="scss">
  .jumbotron{
    background-color: #215692;
  }
</style>
