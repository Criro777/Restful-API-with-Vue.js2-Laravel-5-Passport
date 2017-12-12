<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <div class="panel panel-default">
          <div class="panel-heading text-left">
            The World’s Biggest Companies
          </div>
          <div class="panel-body table-responsive">
          </div>
          <div class="form-group">
          </div>

          <div class="form-group text-left" id="create">
            <router-link :to="{name: 'CompanyCreate'}" class="btn btn-success">Add new company</router-link>
          </div>

          <div class="panel panel-default">
            <div class="panel-heading text-left">Companies list<a class="logout" @click ="logout()">Logout</a></div>
            <div class="panel-body">
   

              <div v-if="!dataEmpty" class="data">
                <table class="table table-bordered table-striped">
                  <thead>
                  <tr>
                    <th>Name</th>
                    <th>Capital</th>
                    <th>President</th>
                    <th>Website</th>
                    <th>Created</th>
                    <th width="100">&nbsp;</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="company, index in companies">
                    <td>{{ company.name }}</td>
                    <td>{{ company.capital }} $</td>
                    <td>{{ company.president }}</td>
                    <td>{{ company.website }}</td>
                    <td>{{ company.created_at }}</td>
                    <td><router-link :to="{name: 'CompanyEdit', params: {id: company.id}}" class="btn btn-xs btn-warning">
                      Edit
                    </router-link></td>

                    <td><a href="#"
                       class="btn btn-xs btn-danger"
                       @click="deleteEntry(company.id, index)">
                      Delete
                    </a>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div v-else="dataEmpty" class="data-empty">
                <h2>Sorry, no matches were found for your query.</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  //import Datepicker from 'vuejs-datepicker';
  import AUTH from './auth/AUTH';

  export default {
    data: function () {
      return {

        dataEmpty: false,
        showFilter: false,
        companies: [],
        date_from: '',
        date_to: ''
      }
    },

    created() {
      let app = this;
      axios.get(API.companies)
        .then(function (resp) {
          app.companies = resp.data;
        })
        .catch(function (resp) {
          console.log(resp);
          alert("Could not load companies");
        });
    },
    components: {
      //Datepicker
    },

    methods: {

      logout() {
        AUTH.destroyToken();
        this.$router.replace('/');
      },

      deleteEntry(id, index) {
        if (confirm("Do you really want to delete it?")) {
          var app = this;
          axios.delete(API.companies + id)
            .then(function (resp) {
              app.companies.splice(index, 1);
            })
            .catch(function (resp) {
              alert("Could not delete company");
            });
        }
      }
    },

  }
</script>
<style>
  #create {
    margin: 0 0 15px 5px;
  }

  .container{
    width:100%;
  }

  .filter {
    margin-bottom: 10px;
    padding: 15px;
    background-color: whitesmoke;
    border-radius: 7px;
  }

  .btn-sm {

    margin: 10px;
  }

  .date {
    display: inline-block;
  }

  .filter-btn {
    width: 30%;
    margin: 0 auto;
  }

  .logout {
    float:right;
    cursor:pointer;
  }
</style>
