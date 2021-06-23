<template>
  <div v-if="!isLoggedIn()">
    <div class="d-flex justify-content-center align-items-center">
      <div>
        <div class="graphic">
          <img class="graphic-image" src="/img/landing-graphic.svg" alt="" />
        </div>
      </div>
      <div class="landing-gp">
      <div class="text-center pt-5">
      <h1>ELTELive</h1>
    </div>
        <p>
          Welcome to ELTELive Live Streaming
        </p>
        <div class="home-btn mt-5">
          <button @click="$router.push('login')" class="btn btn-primary mr-4">
            Login
          </button>
          <button
            @click="$router.push('guest')"
            class="btn custom-btn btn-outline-secondary"
          >
            Join Stream as Guest
          </button>
        </div>
      </div>
    </div>
    <div class="animated-div">
      <AnimatedScreen></AnimatedScreen>
    </div>
  </div>
</template>

<script>
import AnimatedScreen from './animation/animation.vue';

export default {
  name: "home-page",
  components: {
    AnimatedScreen
  },
  methods: {
    isLoggedIn() {
      if (localStorage.getItem("token")) {
        window.location.href = "/#/active-streams";
      }
    }
  }
};
</script>

<style scoped lang="scss">
.graphic {
  padding-top: 5rem;
  margin-right: 5rem;

  img {
    width: 500px;
  }
}
.animated-div {
  display: none;
}
@media only screen and (max-device-width: 480px) {
  .graphic {
    display: none;
  }

  .landing-gp {
    margin-top: 15rem;
    text-align: center;
    font-size: 2rem;

    p {
      margin-top: 3rem;
    }
    .home-btn > .btn {
      margin-top: 4rem;
      font-size: 2rem;
    }
  }
  .animated-div {
    display: grid;
    grid-template-columns: 450px;
    justify-content: center;
    text-align: center;
    margin-top: 10rem;
  }
}
</style>
