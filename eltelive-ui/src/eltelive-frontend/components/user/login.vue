<template>
  <div>
    <h2>Sign in</h2>
    <form id="login" ref="login">
      <input type="text" id="email" placeholder="Email">
      <input type="password" id="password" placeholder="Password">
      <input type="submit" value="Login">
    </form>
</div>
</template>

<script>
  export default {
    name: "login",
	mounted(){
		// Equivalent of it in JavaScript: const form = document.getElementById('login')
		console.log("LOGIN")
		const form = this.$refs['login']		
		form.addEventListener('submit', login)

		async function login(event) {
			event.preventDefault()
			const email = document.getElementById('email').value
			const password = document.getElementById('password').value

			const result = await fetch('http://localhost:4000/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email,
					password
				})
			}).then((res) => res.json())

			if (result.status === 'ok') {
				// everythign went fine
				console.log('Got the token: ', result.token)
				console.log('UserName: ', result.username)
				localStorage.setItem('token', result.token)
				alert('Success')
				window.location.href = "/#/home";
			} else {
				alert(result.error)
			}
		}

	}

  }
</script>

<style lang="scss">

</style>