<script src="flv.min.js"></script>
<template>
  <div class="background">
    <div class="text-center pt-5 pb-5">
      <h1>Active Streams</h1>
    </div>
    <div class="d-flex justify-content-center pb-5">
      <div class="jumbotron w-50 p-3 mb-2">
      <p class="pt-3 pr-1 pl-3 lead">
        The <span class="h4 font-weight-bold">STREAM KEY</span> that is currently displayed is the key that you as a 
        streamer should copy to OBS. This key should be shared with your audience for them 
        to able to access your stream.
      </p>
      </div>
    </div>
    <div class="d-flex justify-content-center pt-5 pl-5">
      <div>
        <h4 class="pt-2 pr-4 font-weight-bold">Stream Key:</h4>
      </div>
      <form id="keyGeneration" ref="keyGeneration">
        <div class="d-flex">
          <div class="streamKeyField border">
            <p placeholder="Stream Key" class="pt-2 font-weight-bold" id="key_textfield"></p>
          </div>
          <div class="input-group-append">
            <input class="btn btn-primary" ref="keyGenerationStream" type="button" value="Generate Key"/>
          </div>
          <div class="input-group-append">
            <input class="btn btn-danger" ref="keyDeletionStream" type="button" value="Delete Key"/>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "active-streams",
  mounted() {
    
    if( window.localStorage ){
      if( !localStorage.getItem('firstLoad') )
      {
        localStorage['firstLoad'] = true;
        document.location.reload();
      }  
    else
      localStorage.removeItem('firstLoad');
  }
    const generateButton = this.$refs['keyGenerationStream']
    generateButton.addEventListener('click',generateStreamKey)

    const deleteButton = this.$refs['keyDeletionStream']
    deleteButton.addEventListener('click',deleteStreamKey)

    document.getElementById("key_textfield").innerHTML = localStorage.getItem('streamKey') || '';
    async function generateStreamKey(event) {
      event.preventDefault()
      
      const result = await fetch('http://localhost:4000/api/generate_key', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token') 
        },
        }).then((res) => res.json())
      localStorage.setItem('streamKey',result.stream_key);
      document.getElementById("key_textfield").innerHTML = result.stream_key;
    }

    async function deleteStreamKey(event) {
      event.preventDefault()
      console.log("keyDeleted2");
      
      const result = await fetch('http://localhost:4000/api/delete_key', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token') 
        },
        }).then((res) => res.json())
      localStorage.removeItem('streamKey',result.stream_key);
      if(result.stream_key === undefined){
        document.getElementById("key_textfield").innerHTML = '';
      }else{
        document.getElementById("key_textfield").innerHTML = result.stream_key;
      }
    }
    
  },
}
</script>
<style lang ="scss">
  .jumbotron{
    background: rgb(41,170,224);
  }

  .streamKeyField {
    height: 3rem;
    min-width: 7rem;
    padding-left: 1rem;
    padding-right: 2rem;

    p{
      font-size:1.3rem;
    }
  }

</style>
