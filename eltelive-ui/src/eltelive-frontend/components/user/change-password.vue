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

      const result = await fetch("http://localhost:4000/api/change_password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({
          newPassword
        })
      }).then(res => res.json());

      if (result.status === "ok") {
        // everythign went fine
        alert("Success");
      } else {
        alert(result.error);
      }
    }
  },
  methods: {

  }
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
</style>
