<template>
        <div>
          <div class="d-flex justify-content-center align-items-center">
            <div>
                <div class="graphic">
                    <img class= "graphic-image" src="/img/landing-graphic.svg" alt="">
                </div>
            </div>
            <div>
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
          </div>
        </div>
</template>

<script>
export default {
  name: "home-page"
};
</script>

<style scoped lang="scss">
  .graphic {
    padding-top: 5rem;
    margin-right: 5rem;

    img{
      width: 700px;
    }
  }

</style>
