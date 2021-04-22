<template>
  <div class="d-flex justify-content-center pl-5">
      <div class="sign-up pt-4 pr-5">
        <h3 class="text-center">Sign Up</h3>
        <form class="pl-5 pt-5" id="registration" ref="registration">
          <div class="pb-4">
            <input class="form-control" id="givenName" placeholder= "Given Name" required>
          </div>
          <div class="pb-4">
            <input class="form-control" id="familyName" placeholder= "Family Name" required>
          </div>
          <div class="pb-4">
            <input type="email" class="form-control" id="email" placeholder= "Email" required>
          </div>
          <div class="pb-5">
            <input type="password" class="form-control" id="password" placeholder="Password" required>
          </div>
          <div>            
            <input type="submit" value="Sign Up" class="btn btn-primary btn-lg btn-block">
          </div>
        </form>
        </div>
        <div class="guest-sign-up text-center pt-4 pl-5">
          <h3 class="pr-5">Are you a Guest?</h3>
          <p class="pr-4">Attending a stream? You can go to the guest portal for attending the stream</p>
          <div class="guest-portal-btn">
            <router-link to="/guest" class="btn btn-light btn-lg btn-block">Go to Guest Portal</router-link>
          </div>
        </div>
  </div>
  
</template> 


<script>
  export default {
    name: "signup",
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
          window.location.href = "/#/login";
        } else {
          alert(result.error)
        }
      }

    }

  }
  
</script>
<style lang="scss">
  .sign-up , .guest-sign-up{
    margin-top: 8rem;
    margin-bottom: 5rem;
    margin-right:0.1rem;
    width:600px;
    height:30rem;
    box-shadow: 0 0 5px 2px rgb(248, 245, 245);
  }
  .sign-up {
    background-color: #f1f3f5;
  }
  .guest-sign-up {
    background-color: #349bf0;
    h3{
      color: #fff;
    }
    p {
      color: #fff;
      font-weight: 600;
      font-size: 1.2rem;
      margin-top:7rem;
    }
    .guest-portal-btn {
      margin-top: 10rem;
      margin-right: 3rem;
      color: black;
    }

    .guest-portal-btn:hover{
      background-color: #b1bfcc;
    }

  }
  #login {
    justify-content: center;
    align-items: center;
  }
</style>
