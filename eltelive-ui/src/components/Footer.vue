<template>
    <footer class="footer">
      <div class="con  ">
       <h4 class="f-title f_600 t_color f_size_18">Links</h4>
       <router-link to="/" class="badge badge-primary mr-4">Legal Disclaimer</router-link>
       <router-link to="/" class="badge badge-primary">Git Repo</router-link>
      </div>
    </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>
<style lang="scss">
.footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: left;
    background-color: #f5f5f5;
    display:block;
}
</style>