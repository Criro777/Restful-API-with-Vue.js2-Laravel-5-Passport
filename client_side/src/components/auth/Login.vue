<template>
  <div class="container">
    <div class="card text-center">
      <img class="img-responsive" src="../../assets/logo.png">
      <h2>Login</h2>
      <div class="card-body">
        <form @submit="login()">
          <div class="form-group" :class="{ 'has-error': errors.length }">
            <input type="email" class="form-control" id="email" placeholder="Your email"
                   v-model="user.email" required>
            <p class="help-block text-left">{{ errors }}</p>

          </div>
          <div class="form-group">
            <input type="password" class="form-control" id="password" placeholder="Your password"
                   v-model="user.password" required>
          </div>
          <button class="btn btn-success">
            Login
          </button>
        </form>
        <br>
        <router-link :to="{ name: 'Register' }">
          Register
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import AUTH from './AUTH';
  export default {
    data() {
      return {
        user: {
          email: null,
          password: null,
        },
        errors: ''
      }
    },

    methods: {

      login() {
        let data = {
          client_id: API.client_id,
          client_secret: API.client_secret,
          grant_type: API.grant_type,
          username: this.user.email,
          password: this.user.password,


        }
        axios.post(API.login, data)
          .then(response => {
             console.log(response);
            AUTH.setToken(response.data.access_token, response.data.expires_in + Date.now());
            this.$router.replace('/companies');
          })
          .catch(error => {

            this.errors = error.response.data.message;


            //
            // for (let key in this.errors) {
            //   // reset all errors
            //   this.errors[key] = [];
            //
            //   let errorMessage = data[key];
            //
            //   if (errorMessage)
            //     this.errors[key] = errorMessage;
            // }
          })
      },


    }

  }
</script>
<style>
  .card {
    font-family: 'Open Sans', sans-serif;
    font-weight: 100;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding: 20px;
    margin: 0 auto;
    box-shadow: 0 3px 1px rgba(0,0,0,0.2);
    width: 40%;
    color: #2c3e50;
    background-color: #f2f4f6;
    margin-top: 60px;
    border: 1px solid #f2f4f6;
    border-radius: 8px;
  }

  .form-group input {
    border: 1px solid #f2f4f6;
  }

  img {
    margin: 0 auto;
    min-width: 200px;
    max-height: 100px;

  }

  .card h2 {
    margin-top: 20px;
  }
</style>
