<template>
  <div class="login">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <b-card header="Login"
                class="mb-2"
                show-footer
        >
          <form @submit.prevent="login">
            <div class="form-group">
              <label for="email">Email address:</label>
              <b-form-input id="email" type="email" v-model="form.email"></b-form-input>
            </div>
            <div class="form-group">
              <label for="password">Password:</label>
              <b-form-input id="password" type="password" v-model="form.password"></b-form-input>
            </div>
            <div class="form-group">
              <button class="btn btn-primary btn-block" type="submit">Login</button>
            </div>
          </form>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'login',

  data () {
    let data = {
      form: {
        email: '',
        password: ''
      }
    }
    return data
  },

  methods: {
    login () {
      axios.post('http://rea.app/login', this.form)
        .then(response => {
          let responseData = response.data.data
          this.$localStorage.set('access_token', responseData.token)
          this.$bus.$emit('logged', 'User logged')
          this.$router.push('/')
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
          }
        })
    }
  }
}
</script>