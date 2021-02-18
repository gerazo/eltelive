<!--<template>
  <div>
    <h2>Registration</h2>
    <form id="registration">
      <input type="text" id="given-name" placeholder="Given Name">
      <input type="text" id="family-name" placeholder="Family Name">
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
    const givenName = document.getElementById('given-name').value
    const familyName= document.getElementById('family-name').value
    const email = document.getElementById("email");
    const password = document.getElementById('password').value;

    const result = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        givenName,
        familyName,
        email,
        password
      })
    }).then(res => res.json());
    
  }
</script>
<style lang="scss">

</style>
-->
