<template>
  <div>
    <div class="container-sign-in pl-5">
      <div class="sign-in pt-4 pr-5">
        <h4 class="text-center">Sign in</h4>
        <form class="pl-5 pt-5" id="login" ref="login">
          <div class="pb-3">
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="Email"
              required
            />
          </div>
          <div class="pb-5">
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              required
            />
          </div>
          <div class="login-btn">
            <input
              type="submit"
              value="Login"
              class="btn btn-primary btn-block"
            />
          </div>
          <div class="d-flex justify-content-center pt-3">
            <p class="sign-up-btn">
              <router-link to="/signup">Don't have an account? Sign Up</router-link>
            </p>
          </div>
        </form>
      </div>
      <div class="guest text-center pt-4 pl-5">
        <h4 class="pr-5">Are you a Guest?</h4>
        <p class="pr-4">
          Attending a stream? You can go to the guest portal for attending the
          stream
        </p>
        <div class="guest-portal-btn">
          <router-link to="/guest" class="btn btn-light btn-block"
            >Go to Guest Portal</router-link
          >
        </div>
      </div>
    </div>
    <button
      id="notificationSuccess"
      class="notification btn text-white font-weight-bold"
      style="display:none;"
    >
      Successfully Logging In
    </button>
    <button
      id="notificationError"
      class="notification btn text-white font-weight-bold"
      style="display:none;"
    >
      Email or Password is incorrect
    </button>
    <script
      type="application/javascript"
      defer
      src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"
    ></script>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "login",
  mounted() {
    const form = this.$refs["login"];
    form.addEventListener("submit", login);

    async function login(event) {
      event.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const result = await fetch(
        "http://" +
          process.env.VUE_APP_HOST +
          ":" +
          process.env.VUE_APP_NODE_JS_PORT +
          "/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      ).then(res => res.json());

      if (result.status === "ok") {
        localStorage.setItem("token", result.token);
        document.getElementById("notificationSuccess").style.display = "block";
        setTimeout(function() {
          $("#notificationSuccess").fadeOut("fast");
        }, 4000);

        window.location.href = "/#/active-streams";
        window.location.reload();
      } else {
        document.getElementById("notificationError").style.display = "block";
        setTimeout(function() {
          $("#notificationError").fadeOut("fast");
        }, 4000);
      }
    }
  }
};
</script>

<style lang="scss">
.container-sign-in {
  display: grid;
  grid-template-columns: 450px 450px;
  justify-content: center;
}
.sign-in,
.guest {
  margin-top: 4rem;
  margin-bottom: 5rem;
  height: 25rem;
  box-shadow: 0 0 5px 2px rgb(248, 245, 245);
}

.sign-in {
  background-color: #f1f3f5;
}

.guest {
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
    background-color: #cae0f5;
  }
}
#login {
  justify-content: center;
  align-items: center;
}

.sign-up-btn {
  font-size: 0.8rem;
}

.login-btn {
  margin-top: 5rem;
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

@media screen and (max-width: 300px){
  .container-sign-in {
    display: block;
  }
}
@media screen and (max-width: 500px) {
  .container-sign-in {
    display: block;
  }
}
</style>
