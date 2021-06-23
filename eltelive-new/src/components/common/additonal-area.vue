<template>
  <div class="additional-container">
   <div>
      <h3>Learn About Us</h3>
      <router-link to="/about" class="btn btn-add"
            >About Us</router-link>
   </div>
   <div>
      <h3 class="">Reach Out to Us</h3>
      <router-link to="/contact" class="btn btn-add"
            >Contact Us</router-link
          >
   </div>
  </div>
</template>

<script>
export default {
  name: 'AddtionalArea'
}
</script>

<style lang="scss">

.additional-container{
  display: grid;
  grid-template-columns: 400px 400px;
  justify-content: center;
  text-align: center;
  margin-top: 5rem;
  h3{
      color: rgb(53, 114, 210);
  }
}

.btn-add {
  background-color: #057bfe;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  padding: 5px 15px;
  letter-spacing: 1px;
  cursor: pointer;
  margin: 2rem 0;
}

.btn-add:hover {
  background: rgb(143, 190, 235);
  color: black;
}

</style>
