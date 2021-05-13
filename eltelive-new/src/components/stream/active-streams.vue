<script src="flv.min.js"></script>
<template>
  <div class="background">
    <div class="pt-5 pb-5">
      <h1 class="text-center">Active Streams</h1>
      <div class="float-right mr-5">
        <button
          type="button"
          class="btn btn-primary mr-5"
          data-toggle="modal"
          data-target="#exampleModalCenter"
        >
          Streamer Guide
        </button>
      </div>
    </div>
    <div class="d-flex justify-content-center mt-5 pb-5">
      <div class="jumbotron w-50 p-3 mb-2">
        <p class="pt-3 pr-1 pl-3 lead">
          The
          <span class="h4 text-danger font-weight-bold">STREAM KEY</span> that
          is currently displayed is the key that you as a streamer should copy
          to OBS. This key should be shared with your audience for them to able
          to access your stream.
        </p>
      </div>
    </div>

    <div
      class="modal fade"
      id="exampleModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="exampleModalLongTitle">
              Streamer Guide
            </h4>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p class="pb-2">
              To be able to stream, here are steps that can help you:
            </p>
            <ol>
              <li class="pb-1">Generate a Stream key</li>
              <li class="pb-1">
                Share the stream key with your audience/guests
              </li>
              <li class="pb-1">Open any streaming app, we recommend OBS</li>
              <li class="pb-1">
                In OBS, click on settings button then click on Stream
              </li>
              <li class="pb-1">Set the Service to Custom</li>
              <li class="pb-1">Set the Server with the server link</li>
              <li class="pb-1">
                Paste the Stream Key you generated in the Stream Key input
              </li>
              <li class="pb-1">
                Click Apply then ok and you will be directed back to OBS main
                page
              </li>
              <li class="pb-1">
                Click on start streaming to start your streaming
              </li>
            </ol>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center pt-5 pl-5">
      <div>
        <h4 class="pt-2 pr-4 font-weight-bold">Stream Key:</h4>
        <h4 class="pt-2 pr-4 font-weight-bold">Streaming Server:</h4>
      </div>
      <form id="keyGeneration" ref="keyGeneration">
        <div class="d-flex">
          <div class="streamKeyField border">
            <p
              placeholder="Stream Key"
              class="pt-2 font-weight-bold"
              id="key_textfield"
            ></p>
          </div>
          <div class="input-group-append">
            <input
              class="btn btn-primary"
              ref="keyGenerationStream"
              type="button"
              value="Generate Key"
            />
          </div>
          <div class="input-group-append">
            <input
              class="btn btn-danger"
              ref="keyDeletionStream"
              type="button"
              value="Delete Key"
            />
          </div>
        </div>
        <div class="serverLinkField border">
            <p
              placeholder="Server"
              class="pt-2 font-weight-bold"
              id="server_textfield"
            ></p>
        </div>
      </form>
      <button
        id="notificationSuccessG"
        class="notification btn text-white font-weight-bold"
        style="display:none;"
      >
      </button>
      <button
        id="notificationErrorG"
        class="notification btn text-white font-weight-bold"
        style="display:none;"
      >
      </button>
      <button
        id="notificationSuccessD"
        class="notification btn font-weight-bold"
        style="display:none;"
      >
      </button>
      <button
        id="notificationErrorD"
        class="notification btn text-white font-weight-bold"
        style="display:none;"
      >
      </button>
      <script
        type="application/javascript"
        defer
        src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"
      ></script>
    </div>
  </div>
</template>
<script>
export default {
  name: "active-streams",
  mounted() {
    const generateButton = this.$refs["keyGenerationStream"];
    generateButton.addEventListener("click", generateStreamKey);

    const deleteButton = this.$refs["keyDeletionStream"];
    deleteButton.addEventListener("click", deleteStreamKey);

    document.getElementById("key_textfield").innerHTML =
      localStorage.getItem("streamKey") || "";
    
    document.getElementById("server_textfield").innerHTML =
      localStorage.getItem("server") || "";

    /**
     * Returns a promise from the backend with the result. 
     * Promise fields used:[status,title]
     */
    async function generateStreamKey(event) {
      event.preventDefault();

      const result = await fetch("/api/generate_key", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }).then(res => res.json());
      localStorage.setItem("streamKey", result.stream_key);
      localStorage.setItem("server", result.stream_address);
      document.getElementById("server_textfield").innerHTML = result.stream_address;
      document.location.reload();

      if (result.status === "ok") {
        //Success notification for generating a key
        document.getElementById("notificationSuccessG").style.display = "block";
        document.getElementById("notificationSuccessG").innerHTML=result.title;
        setTimeout(function() {
          $("#notificationSuccessG").fadeOut("fast");
        }, 4000);
      }else if (!localStorage.getItem('token')){
        //Error notification for deletion in case user is not logged in
        document.getElementById("notificationErrorD").style.display = "block";
         document.getElementById("notificationErrorD").innerHTML='Login to Generate';
        setTimeout(function() {
          $("#notificationErrorD").fadeOut("fast");
        }, 4000);
      }else {
        //Error notification for deletion in case of any other error
         document.getElementById("notificationErrorG").style.display = "block";
         document.getElementById("notificationErrorG").innerHTML=result.title;
        setTimeout(function() {
          $("#notificationErrorG").fadeOut("fast");
        }, 4000);
      }
    }
    /**
     * Returns a promise from the backend with the result. 
     * Promise fields used:[status,title]
     */
    async function deleteStreamKey(event) {
      event.preventDefault();

      const result = await fetch("/api/delete_key", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }).then(res => res.json());
      localStorage.removeItem("streamKey", result.stream_key);

      if (result.stream_key === undefined) {
        document.getElementById("key_textfield").innerHTML = "";
      } else {
        document.getElementById("key_textfield").innerHTML = result.stream_key;
      }
      if (result.status === "ok") {
        //Success Notification for deletion
        document.getElementById("notificationSuccessD").style.display = "block";
        document.getElementById("notificationSuccessD").innerHTML=result.title;
        setTimeout(function() {
          $("#notificationSuccessD").fadeOut("fast");
        }, 4000);
      } else if (!localStorage.getItem('token')){
        //Error notification for deletion in case user is not logged in
        document.getElementById("notificationErrorD").style.display = "block";
        document.getElementById("notificationErrorD").innerHTML='Login to Delete';
        setTimeout(function() {
          $("#notificationErrorD").fadeOut("fast");
        }, 4000);
      } else {
        //Error notification for deletion in case anything else is wrong
         document.getElementById("notificationErrorD").style.display = "block";
         document.getElementById("notificationErrorD").innerHTML=result.title;
        setTimeout(function() {
          $("#notificationErrorD").fadeOut("fast");
        }, 4000);
      }
    }
  }
};
</script>
<style lang="scss">
.jumbotron {
  background: rgb(210, 224, 230);
}

.streamKeyField {
  height: 3rem;
  min-width: 10rem;
  padding-left: 1rem;
  padding-right: 2rem;

  p {
    font-size: 1.3rem;
  }
}
.serverLinkField {
  height: 3rem;
  min-width: 7rem;
  padding-left: 1rem;
  padding-right: 2rem;

  p {
    font-size: 1.3rem;
  }
}
.notification {
  text-align: center;
  position: fixed;
  top: 7rem;
  left: 40%;
  z-index: 999;
  height: 60px;
  width: 20%;
}
#notificationSuccessG {
  background-color: #559b0f;
  font-size: 1.1rem;
}
#notificationSuccessD {
  background-color: rgb(198,198,198);
  font-size: 1.4rem;
}
#notificationErrorG,#notificationErrorD {
  background-color: #BA4844;
  font-size: 1.1rem;
}
</style>
