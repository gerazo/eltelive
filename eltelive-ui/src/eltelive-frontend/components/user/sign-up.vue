<!--<template>
  <div>
    <h2>Registration</h2>
    <form id="registration">
      <input type="text" name="username" id="username" placeholder="Username">
      <input type="email" name="email" id="email" placeholder="Email">
      <input type="password" name="password" id="password" placeholder="Password">
      <input type="submit" name="sumbit" value="Submit">
    </form>
  </div>
</template>

<script>
export default {
  name: "sign-up"
}
const form = document.getElementById("registration");
  form.addEventListener('submit',registerNewUser);

  async function registerNewUser(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email");

    const result = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password,
        email
      })
    }).then(res => res.json());
    
  }
</script>
<style lang="scss">

</style>
-->
