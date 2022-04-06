<template>
  <div>
    <div class="text-center pt-5">
      <h1 id="selenium_output_5" class="pb-5">Create an Account</h1>
    </div>
    <div class="container-sign-up">
      <div class="sign-up pt-4 pr-5">
        <h4 class="text-center">Sign Up</h4>
        <form class="pl-5 pt-5" id="registration" ref="registration">
          <div class="pb-3">
            <input
              class="form-control"
              id="givenName"
              placeholder="Given Name"
              required
            />
          </div>
          <div class="pb-3">
            <input
              class="form-control"
              id="familyName"
              placeholder="Family Name"
              required
            />
          </div>
          <div class="pb-3">
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="Email"
              required
            />
          </div>
          <div class="pb-3">
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              required
            />
          </div>
          <div>
            <input
              id = "selenium_21"
              type="submit"
              value="Sign Up"
              class="btn btn-primary btn-block"
            />
          </div>
          <div class="d-flex justify-content-center pt-3">
            <p class="existing-account">
              <router-link id="selenium_22" to="/login"
                >Already have an account? Login</router-link
              >
            </p>
          </div>
        </form>
      </div>
      <div class="guest-sign-up text-center pt-4 pl-5">
        <h4 class="pr-5">Are you a Guest?</h4>
        <p class="pr-4">
          Attending a stream? You can go to the guest portal for attending the
          stream
        </p>
        <div class="guest-portal-btn">
          <router-link id="selenium_23" to="/guest" class="btn btn-light btn-block"
            >Go to Guest Portal</router-link
          >
        </div>
      </div>
    </div>
    <button
      id="notificationSuccess"
      class="notification btn text-white font-weight-bold"
      style="display: none"
    >
      Successfully Created Account
    </button>
    <button
      id="notificationError"
      class="notification btn text-white font-weight-bold"
      style="display: none"
    ></button>
    <script
      type="application/javascript"
      defer
      src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"
    ></script>
    <AdditionalArea></AdditionalArea>
  </div>
</template>

<script>
import $ from "jquery";
import AdditionalArea from "../common/additonal-area.vue";

export default {
  name: "signup",
  components: {
    AdditionalArea,
  },
  mounted() {
    const form = this.$refs["registration"];
    form.addEventListener("submit", registerUser);

    async function registerUser(event) {
      event.preventDefault();
      const givenName = document.getElementById("givenName").value;
      const familyName = document.getElementById("familyName").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const result = await fetch(
        "http://" +
          process.env.VUE_APP_HOST +
          ":" +
          process.env.VUE_APP_NODE_JS_PORT +
          "/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            givenName,
            familyName,
            email,
            password,
          }),
        }
      ).then((res) => res.json());

      if (result.status === "ok") {
        document.getElementById("notificationSuccess").style.display = "block";
        setTimeout(function () {
          $("#notificationSuccess").fadeOut("fast");
        }, 4000);

        window.location.href = "/#/login";
      } else {
        document.getElementById("notificationError").style.display = "block";
        document.getElementById("notificationError").innerHTML = result.title;
        setTimeout(function () {
          $("#notificationError").fadeOut("fast");
        }, 4000);
      }
    }
  },
};
</script>

<style lang="scss">
.container-sign-up {
  display: grid;
  grid-template-columns: 450px 450px;
  justify-content: center;
}

.sign-up,
.guest-sign-up {
  margin-top: 4rem;
  margin-bottom: 5rem;
  margin-right: 0.1rem;
  height: 25rem;
  box-shadow: 0 0 5px 2px rgb(248, 245, 245);
}
.sign-up {
  background-color: #f1f3f5;
}
.guest-sign-up {
  background-color: #349bf0;
  h3 {
    color: #fff;
  }
  p {
    color: #fff;
    font-weight: 600;
    font-size: 1rem;
    margin-top: 5rem;
  }
  .guest-portal-btn {
    margin-top: 9rem;
    margin-right: 3rem;
    color: black;
  }

  .guest-portal-btn:hover {
    background-color: #b1bfcc;
  }
}
.existing-account {
  font-size: 0.8rem;
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
  background-color: #ba4844;
  font-size: 1.1rem;
}
#notificationSuccess {
  background-color: #559b0f;
  font-size: 1.1rem;
}
</style>
