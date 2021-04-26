<template>
  <div class="d-flex justify-content-center pl-5">
      <div class="sign-in pt-4 pr-5">
        <h3 class="text-center">Sign in</h3>
        <form class="pl-5 pt-5" id="login" ref="login">
          <div class="pb-4">
            <input type="email" class="form-control" id="email" placeholder= "Email" required>
          </div>
          <div class="pb-5">
            <input type="password" class="form-control" id="password" placeholder="Password" required>
          </div>
          <div>            
            <input type="submit" value="Login" class="btn btn-primary btn-lg btn-block">
          </div>
        </form>
        </div>
        <div class="guest text-center pt-4 pl-5">
          <h3 class="pr-5">Are you a Guest?</h3>
          <p class="pr-4">Attending a stream? You can go to the guest portal for attending the stream</p>
          <div class="guest-portal-btn ml-3">
            <router-link to="/guest" class="btn btn-light btn-lg btn-block">Go to Guest Portal</router-link>
          </div>
        </div>
  </div>
</template>

<script>
  export default {
    name: "login",
	mounted(){
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
				console.log('Got the token: ', result.token)
				console.log('UserName: ', result.username)
				localStorage.setItem('token', result.token)
				alert('Success')
				window.location.href = "/#/active-streams";
			} else {
				alert(result.error)
			}
		}

	}

  }
</script>

<style lang="scss">
  .sign-in , .guest{
    margin-top: 8rem;
    margin-bottom: 5rem;
    width:600px;
    height:25rem;
  }
  .sign-in {
    background-color: #f1f3f5;
  }
   .guest {
    background-color: #349bf0;
    h3{
      color: #fff;
    }
    p {
      color: #fff;
      font-weight: 600;
      font-size: 1.2rem;
      margin-top:4rem;
    }
    .guest-portal-btn {
      margin-top: 5.4rem;
      margin-right: 3rem;
      color: black;
    }

    .guest-portal-btn:hover{
      background-color: #cae0f5;
    }

  }
  #login {
    justify-content: center;
    align-items: center;
  }
</style>

