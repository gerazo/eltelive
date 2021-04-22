<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <img class= "logo" src="img/logo.png" alt="logo">
    
    <div class="collapse navbar-collapse" id="navbarSupportedContent"></div>
      <ul class="navbar-nav my-2 my-sm-0">
        <li class="navbar-brand">
          <router-link to="/home" class="nav-link">Home</router-link>
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
      <button v-if="isLoggedIn" class="btn btn-danger"
 v-on:click="logout" >Se deconnecter</button>
<button v-else class="btn btn-primary"
 v-on:click="login" >Se connecter</button>
   </nav>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  computed: {
    isLoggedIn() {      
      return window.localStorage.getItem("username");      
    }
  },   
  methods: {
    login() {      
      window.location.replace("http://localhost:4000/api/login")    
    },
    logout() {
      window.localStorage.removeItem("username");
      window.location.replace("http://localhost:4000")      
    },
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
</style>
