<template>
  <div id="app">
    <div class="nav-router">
    <NavBar></NavBar>
    <router-view/>
    </div>
    <div><Footer></Footer></div>
  </div>
  
</template>

<style lang="scss">
#app {
  font-family: "Avenir",Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing : grayscale;
  min-height:100%;
  position:relative;
  padding-bottom: 60px;
  color: #2c3e50;
}
#nav{
  padding: 30px;
  a{
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active{
      color: #42b983;
    }
  }
}
h1 {
  color: rgb(53, 114, 210);
  font-size: 25px;
  font-weight: bold;
  letter-spacing: 4px;
  text-transform: uppercase;
  margin-bottom: 20px;
}

.nav-router{
  padding-bottom: 2%;
}
</style>
