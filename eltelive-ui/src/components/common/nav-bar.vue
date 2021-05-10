<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <img class= "logo" src="img/logo.png" alt="logo">
    
    <div class="collapse navbar-collapse" id="navbarSupportedContent"></div>
      <ul class="navbar-nav my-2 my-sm-0" v-if="isOut()">
        <li class="navbar-brand">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="navbar-brand">
          <router-link to="/about" class="nav-link">About Us</router-link>
        </li>
        <li class="navbar-brand">
          <router-link to="/contact" class="nav-link">Contact</router-link>
        </li>
        <li class="navbar-brand">
          <router-link to="/login" class="nav-link">Login</router-link>
        </li>
        <li class="navbar-brand">
          <router-link to="/signup" class="nav-link">Sign Up</router-link>
        </li>
      </ul>
      
      <ul class="navbar-nav my-2 my-sm-0" v-if="isIn()">
          <li class="navbar-brand">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="navbar-brand">
          <router-link to="/about" class="nav-link">About Us</router-link>
        </li>
        <li class="navbar-brand">
          <router-link to="/active-streams" class="nav-link">Stream Keys</router-link>
        </li>
        <li class="navbar-brand">
          <router-link to="/change-password" class="nav-link">Change Password</router-link>
        </li>
        <li class="navbar-brand">
          <router-link to="/contact" class="nav-link">Contact</router-link>
        </li>
        <li class="navbar-brand">
          <a v-on:click="loggingOut()" class="nav-link btn btn-danger text-white">Logout</a>
        </li>
      </ul>
   </nav>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  mounted (){
    
  },
    methods:{
      loggingIn(){
        if(!(localStorage.getItem('token'))){
          this.$router.push('login')
        }
      },
      loggingOut(){
         if(localStorage.getItem('token')){
           localStorage.removeItem('token');
           location.replace('home');
         }
      },
      isOut(){
      if(!(localStorage.getItem('token'))){
          return true;
        }else{
          return false;
        }
      },
      isIn(){
        if(localStorage.getItem('token')){
          console.log(localStorage.getItem('token'))
          return true;
        }else{
          return false;
        }
      }
    }
};
</script>
<style lang="scss">
  @media (min-width: 992px) { 
    
    .navbar.custom-nav{
      padding-top:16px;
      padding-bottom:16px;
      background-color: #fff !important;
    }
  }

  .logo{
    position: relative;
    float: left;
    width:  80px;
    height: 80px;
    background-position: 50% 50%;
    background-repeat:   no-repeat;
    background-size:     cover;
  }
  .nav-link {
    font-size: 1.23rem;
  }
</style>
