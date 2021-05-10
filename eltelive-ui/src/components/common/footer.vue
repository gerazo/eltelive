<template>
    <footer class="footer pt-3">
      <div class="footer-link">
       <h4 class="f-title f_600 t_color f_size_18">Links</h4>
       <router-link to="/legal-disclaimer" class="badge badge-primary mr-4">Legal Disclaimer</router-link>
       <a href="https://gitea.com/gerazo/eltelive" target="_blank" class="badge badge-primary">Git Repo</a>
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
.footer-link{
  padding-left:5%;
}
</style>
