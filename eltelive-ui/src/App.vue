<template>
  <div id="app">
    <div>
    <NavBar></NavBar>
    <router-view/>
  
    </div>
      <div>
        <Footer></Footer>
  </div>
  </div>
  
</template>

<style lang="scss">
#app {
  font-family: "Avenir",Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing : grayscale;
  text-align: center;
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
</style>