<template>
  <div class="container">
    <h1>{{ msg }}</h1>
    <div class="card text-center">
      <img class="img-responsive" src="../assets/logo.png">

      <div class="form-group links">
        <p>{{AUTH.isAuthenticated() ? enter_text : login_text}}</p>
        <router-link :to="{name : (AUTH.isAuthenticated()) ? 'Companies' : 'Login'}" class="btn btn-default">{{AUTH.isAuthenticated()? 'Companies' : 'Login'}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import AUTH from "./auth/AUTH";
  export default {

    data() {
      return {
        AUTH: AUTH,
        msg: 'Welcome to APIMicroService.',
        login_text: 'Please register or login to continue.',
        enter_text: ''
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    margin: 0 auto;
    font-family: 'Open Sans', sans-serif;
    font-weight: 600;
    height:100%;
    width: 100%;

  }

  .card {
    font-family: 'Open Sans', sans-serif;
    font-weight: 100;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding: 20px;
    margin: 0 auto;
    width: 40%;
    color: #2c3e50;
    box-shadow: 0 3px 1px rgba(0,0,0,0.2);
    background-color: #f2f4f6;
    margin-top: 60px;
    border: 1px solid #f2f4f6;
    border-radius: 8px;
  }

  img {
    margin: 0 auto;
    min-width: 200px;
    max-height: 100px;

  }

  .links {
    margin-top: 25px;
  }
  h1, h2 {
    font-weight: normal;
  }


  p {
    font-family: 'Open Sans', sans-serif;
    font-size: 25px;
  }
</style>
