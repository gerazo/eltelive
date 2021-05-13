<template>
  <div class="d-flex justify-content-center pl-5">
    <div class="change-password pt-4 pr-5">
      <h3 class="text-center pl-5">Change Password</h3>
      <form class="pl-5 pt-5" id="changePass" ref="changePass">
        <div class="pb-2">
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="New Password"
            required
          />
        </div>
        <div>
          <input
            type="submit"
            value="Change Password"
            class="btn btn-primary btn-lg btn-block"
          />
        </div>
      </form>
    </div>
    <button
      id="notificationSuccess"
      class="notification btn text-white font-weight-bold"
      style="display:none;"
    >
    </button>
    <button 
      id="notificationError"
      class="notification btn text-white font-weight-bold"
      style="display:none;"
    >
    </button>
  </div>
</template>
<script>
export default {
  name: "change-password",
  mounted() {
    const form = this.$refs["changePass"];
    form.addEventListener("submit", changeUserPassword);

    async function changeUserPassword(event) {
      event.preventDefault();
      const newPassword = document.getElementById("password").value;

      const result = await fetch("/api/change_password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({
          newPassword
        })
      }).then(res => res.json());

      if (result.status === "ok") {
         document.getElementById("notificationSuccess").style.display = "block";
         document.getElementById('notificationSuccess').innerHTML=result.title;
        setTimeout(function() {
          $("#notificationSuccess").fadeOut("fast");
        }, 4000);
      } else {
        document.getElementById("notificationError").style.display = "block";
        if(!(localStorage.getItem('token'))){
          document.getElementById('notificationError').innerHTML="Login to Change Password";
        }else{
          document.getElementById('notificationError').innerHTML=result.title;
        }
        setTimeout(function() {
          $("#notificationError").fadeOut("fast");
        }, 4000);
      }
    }
  },
  methods: {}
};
</script>
<style>
.change-password {
  margin-top: 8rem;
  margin-bottom: 5rem;
  margin-right: 0.1rem;
  width: 600px;
  height: 23rem;
  box-shadow: 0 0 5px 2px rgb(248, 245, 245);
}
.change-password {
  background-color: #f1f3f5;
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

#notificationError {
  background-color: #BA4844;
  font-size:1.2rem;
}
#notificationSuccess{
  background-color: #559b0f;
  font-size:1.2rem;
}
</style>
