<template>
  <div class="not-found-container pt-5 mt-5 pb-5">
    <div class="content text-center">
      <h2>404</h2>
      <h4>Page not found</h4>
      <p>The page you were looking for is not found. Make sure you typed the link address correctly</p>
      <div>
        <router-link class="mr-4" to="/">Back To Home</router-link>
        <router-link class="ml-4" to="/contact">Contact Us</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "not-found-page"
};
</script>

<style lang="scss">
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    height: 100vh;
  }
  .not-found-container {
    position: absolute;
    left: 10%;
    right: 10%;
    width: 900px;
    margin: auto auto;
  

    .inner-container {
      background-color: rgb(238, 235, 235);
      max-width: 600px;
    }

    h2 {
      font-size: 11rem;
      color: #1862a0;
      line-height: 1em;
      font-weight: 900;
    }

    h4 {
      position: relative;
      font-size: 1.3rem;
      margin-bottom: 20px;
      font-weight: 900;
      color: #1862a0;
      padding: 10px 20px;
      display: inline-block;
    }

    p {
      color: black;
      font-size: 1.2rem;
      font-weight: 800;
    }
    a {
      display: inline-block;
      font-size: 1.3rem;
      padding: 10px 25px;
      background: #1862a0;
      color: #fff;
      font-weight: 900;
      text-decoration: none;
      margin-top: 3rem;
      border-radius: 25px;
    }
    .content a:hover {
      color: rgb(243, 240, 240); /*the color you want*/
    }
  }
</style>
