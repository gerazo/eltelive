<template>
        <div class="container">
          <div class="row justify-content-center align-items-center">
            <div class="col-md-5">
              <div>
                <h1>
                  ELTE LIVEStream
                </h1>
                <p>
                  Welcome to ELTE LIVEStream
                </p>
                <div class="home-btn mt-5">
                    <button @click="$router.push('login')" class="btn btn-primary mr-4">Login</button>
                    <button @click="$router.push('guest')" class="btn custom-btn btn-outline-secondary">Join Stream as Guest</button>
                </div>
              </div>
            </div>
            <div class="col-md-7">
                <div class="graphic">
                    <img src="/img/landing-graphic.svg" alt="">
                </div>
            </div>
          </div>
        </div>
</template>

<script>
export default {
  name: "home-page"
};
</script>

<style scoped lang="scss">
  .container{
    padding-top: 3rem;
    width: 100%;
    height: 100%;
    text-align: left;
  }
</style>
