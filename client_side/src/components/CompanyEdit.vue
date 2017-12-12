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
                    <button class="btn btn-success">Update</button>
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
          companyId: null,
          company: {
            name: '',
            capital: '',
            president: '',
            website: '',
          }
        }
      },
      mounted() {
        let app = this;
        let id = app.$route.params.id;
        app.companyId = id;
        axios.get(API.companies +'/' + id)
          .then(function (resp) {
            app.company = resp.data;
          })
          .catch(function () {
            alert("Could not load your company")
          });
      },
      methods: {
        saveForm() {
          console.log(this.companyId);
          var app = this;
          var newCompany = app.company;
          axios.patch(API.companies + '/' + app.companyId, newCompany)
            .then(function (resp) {
              app.$router.replace('/companies');
            })
            .catch(function (resp) {
              console.log(resp);
              alert("Could not create your company");
            });
        }
      }
    }
</script>

<style scoped>

</style>
