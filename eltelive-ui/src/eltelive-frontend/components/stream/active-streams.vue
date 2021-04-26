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
      <form id="keyGeneration" ref="keyGeneration">
        <div class="d-flex">
          <div class="streamKeyField border">
            <p placeholder="Stream Key" class="pt-2" id="key_textfield"></p>
          </div>
          <div class="input-group-append">
            <input class="btn btn-primary" ref="keyGenerationStream" type="button" value="Generate Key"/>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "active-streams",
  methods: {
    changeText(){
    	document.getElementById('boldStuff').innerHTML = 'Fred Flinstone';
    }
  },
  mounted() {
    const butt = this.$refs['keyGenerationStream']
    butt.addEventListener('click',generateStreamKey)
    
    async function generateStreamKey(event) {
      event.preventDefault()
      
      const result = await fetch('http://localhost:4000/api/generate_key', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token') 
        },
        }).then((res) => res.json())

      document.getElementById("key_textfield").innerHTML = result.stream_key;
    }
    
  },
}
</script>
<style lang ="scss">
  .jumbotron{
    background-color: #215692;
  }

  .streamKeyField {
    height: 3rem;
    min-width: 7rem;
    padding-left: 1rem;
    padding-right: 2rem;
  }
</style>
