<template>
        <div v-if="!isLoggedIn()">
          <div class="d-flex justify-content-center align-items-center">
            <div>
                <div class="graphic">
                    <img class= "graphic-image" src="/img/landing-graphic.svg" alt="">
                </div>
            </div>
              <div class="landing-gp">
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
</template>

<script>
export default {
  name: "home-page",
  methods: {
    isLoggedIn(){
      if(localStorage.getItem("token")){
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

    img{
      width: 500px;
    }
  }

  @media screen and (max-width: 500px){
    .graphic{
      display: none;
    }
    
    .landing-gp{
      margin-top: 15rem;
      text-align: center;
      font-size: 2rem;

      h1{
        font-size: 3rem;
      }

      p{
        margin-top: 3rem;
      }
      .home-btn>.btn{
        margin-top: 4rem;
        font-size: 2rem;
      }
    }
  }

</style>
