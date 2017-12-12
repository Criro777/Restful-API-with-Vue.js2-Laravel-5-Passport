<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <div>
          <div class="form-group">
            <router-link :to="{name: 'Companies'}" class="btn btn-default">Back</router-link>
          </div>

          <div class="panel panel-default">
            <div class="panel-heading">Create new company</div>
            <div class="panel-body">
              <form @submit="saveForm()">
                <div class="row">
                  <div class="col-xs-12 form-group">
                    <label class="control-label text-left">Company name</label>
                    <input type="text" v-model="company.name" class="form-control" required>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12 form-group">
                    <label class="control-label text-left">Company capital</label>
                    <input type="number" v-model="company.capital" class="form-control" required>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12 form-group">
                    <label class="control-label">Company president</label>
                    <input type="text" v-model="company.president" class="form-control" required>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12 form-group">
                    <label class="control-label">Company website</label>
                    <input type="text" v-model="company.website" class="form-control" required>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12 form-group">
                    <button class="btn btn-success">Create</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        company: {
          name: '',
          capital: '',
          president: '',
          website: '',
        },
        errorMessage : 'Could not create your company',
        flag : false
      }
    },
    methods: {
      saveForm() {
        var app = this;
        var newCompany = app.company;
        console.log(newCompany);
        axios.post(API.companies, newCompany)
          .then(function (resp) {
            app.$router.push({path: '/companies'});
          })
          .catch(function (resp) {
            console.log(resp);
            app.flag = true;
            setTimeout(() => (
              app.flag = false
            ), 3000);


          })
      }
    }
  }
</script>
<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
