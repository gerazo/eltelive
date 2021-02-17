<template>
  <div>
    <h2>Login</h2>
    <form id="login">
			<input type="text" id="username" placeholder="Username">
			<input type="email" name="email" id="email" placeholder="Email">
      <input type="password" name="password" id="password" placeholder="Password">
			<input type="submit" value="Submit Form">
		</form>
  </div>
</template>

<script>
  export default {
    name: "login"
  };

  const form = document.getElementById('login')
			form.addEventListener('submit', login)

			async function login(event) {
				event.preventDefault()
				const username = document.getElementById('username').value
				const password = document.getElementById('password').value
        const email = document.getElementById("email");
				const result = await fetch('/api/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						username,
						password,
            email
					})
				}).then((res) => res.json())

				if (result.status === 'ok') {
					localStorage.setItem('token', result.data)
				} else {
					alert(result.error)
				}
			}
  
</script>

<style lang="scss">

</style>
