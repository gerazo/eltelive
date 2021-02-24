<template>
  <div>
    <h2>Registration</h2>
    <form id="registration" ref='registration'>
      <input type="text" id="givenName" placeholder="Given Name">
      <input type="text" id="familyName" placeholder="Family Name">
      <input type="email" id="email" placeholder="Email">
      <input type="password" id="password" placeholder="Password">
      <input type="submit" value="Sign Up">
    </form>
  </div>
</template>

<script>
  export default {
    name: "sign-up",
    mounted(){
      console.log("SIGN UP")
      // Equivalent of it in JavaScript: const form = document.getElementById('registration')
      const form = this.$refs['registration']
      form.addEventListener('submit', registerUser)

      async function registerUser(event) {
        event.preventDefault()
        const givenName = document.getElementById('givenName').value
        const familyName = document.getElementById('familyName').value
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value

        const result = await fetch('http://localhost:4000/api/register', {
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
        }).then((res) => res.json())

        if (result.status === 'ok') {
          // everythign went fine
          alert('Success')
        } else {
          alert(result.error)
        }
      }

    }

  }
  
</script>
<style lang="scss">

</style>
