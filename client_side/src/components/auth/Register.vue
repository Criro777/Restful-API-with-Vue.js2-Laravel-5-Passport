<template>
  <div class="container">
    <div class="card text-center">
      <img class="img-responsive" src="../../assets/logo.png">
      <h2>Registration</h2>
      <div class="card-body">
        <form @submit.prevent="register(user)">
          <div class="form-group" :class="{ 'has-error': errors.name.length }">
            <input type="text" class="form-control" id="name" placeholder="Your name" v-model="user.name">
            <p class="help-block text-left" v-for="error in errors.name">{{ error }}</p>
          </div>
          <div class="form-group" :class="{ 'has-error': errors.email.length }">
            <input type="email" class="form-control" id="email" placeholder="Your email"
                   v-model="user.email">
            <p class="help-block text-left" v-for="error in errors.email">{{ error }}</p>

          </div>
          <div class="form-group" :class="{ 'has-error': errors.password.length }">
            <input type="password" class="form-control" id="password" placeholder="Your password"
                   v-model="user.password">
            <p class="help-block text-left" v-for="error in errors.password">{{ error }}</p>
          </div>
          <div class="form-group" :class="{ 'has-error': errors.password_confirmation.length }">
            <input type="password" class="form-control" id="password_confirmation"
                   placeholder="Your password confirmation" v-model="user.password_confirmation">
            <p class="help-block text-left" v-for="error in errors.password_confirmation">{{ error }}</p>
          </div>
          <button class="btn btn-success">
            Register
          </button>
        </form>
        <br>
        <router-link :to="{ name: 'Login' }">
          Login
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user: {
          name: null,
          email: null,
          password: null,
          password_confirmation: null,
        },
        errors: {
          name: [],
          email: [],
          password: [],
          password_confirmation: [],
        },
      }
    },

    methods: {
      clear() {
        this.user = {
          name: null,
          email: null,
          password: null,
          password_confirmation: null,
        }
      },

      register(user) {
        axios.post(API.register, user)
          .then(response => {
            this.clear();
            let successMessage = response.data.message;
            this.$router.replace('/login');
          })
          .catch(error => {

            let data = error.response.data.errors;

            for (let key in this.errors) {
              // reset all errors
              this.errors[key] = [];

              let errorMessage = data[key];

              if (errorMessage)
                this.errors[key] = errorMessage;
            }
          })
      }
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
    width: 40%;
    color: #2c3e50;
    background-color: #f2f4f6;
    box-shadow: 0 3px 1px rgba(0,0,0,0.2);
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
