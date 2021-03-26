<template>
  <div class="About">
    <div class="about-us-title text-center">
      <h1 class="pb-5">About Us</h1>
      <div class="div-p-1">
          We help in easy access for live online sessions
       <hr/>
      </div>
    </div>
    <div class="first-box">
        <h2>Share your voice</h2>
        <p>
          We encourage sharing your voice through live streaming for your
          purpose and intentions
        </p>
    </div>
  </div>

</template>

<script>
 export default{
  name:'about-us',
 }
</script>

<style lang="scss">
  .about-us-title {
    margin-top: 160px;
    text-transform: uppercase;
  }
  .about-us-title > h1 {
    font-size: 3.2rem;
  }
  hr {
      position: relative;
      transform: rotate(50deg);
      border: none;
      height: 100px;
      background: #549cee;
      z-index: -1;
    }

  .div-p-1{
    font-size: 1.3rem;
  }
</style>
