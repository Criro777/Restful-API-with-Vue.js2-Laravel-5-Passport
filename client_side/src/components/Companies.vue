<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <div class="panel panel-default">
          <div class="panel-heading text-left">
            Companies v
          </div>
          <div class="panel-body table-responsive">
          </div>
          <div class="form-group">
          </div>

          <div class="form-group text-left" id="create">
            <router-link :to="{name: 'CompanyCreate'}" class="btn btn-success">Add new company</router-link>
          </div>

          <div class="panel panel-default">
            <div class="panel-heading text-left">Companies List<a class="logout" @click ="logout()">Logout</a></div>
            <div class="panel-body">
              <button class="btn btn-info btn-sm" @click="showFilter = !showFilter">Filter by date</button>

              <div class="filter text-center" v-if="showFilter">
                <form @submit="OnFilter()">
                  <div class="input-group date">
                    <p>From</p>
                  </div>

                  <div class="input-group date">
                    <p>To</p>

                  </div>

                  <div class="filter-btn">
                    <button class="btn btn-primary btn-sm btn-block">Filter</button>
                  </div>
                </form>
              </div>

              <div v-if="!dataEmpty" class="data">
                <table class="table table-bordered table-striped">
                  <thead>
                  <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Website</th>
                    <th>Email</th>
                    <th>Created</th>
                    <th width="100">&nbsp;</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="company, index in companies">
                    <td>{{ company.name }}</td>
                    <td>{{ company.address }}</td>
                    <td>{{ company.website }}</td>
                    <td>{{ company.email }}</td>
                    <td>{{ company.created_at }}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div v-if="dataEmpty" class="data-empty">
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
      OnFilter() {
        let app = this;
        let date_server = {
          from: (app.date_from !== '') ? app.formatDate(app.date_from) : '',
          to:   (app.date_to   !== '') ? app.formatDate(app.date_to)   : ''
        };

        axios.get(this.buildURL(date_server))
          .then(function (resp) {
            if (resp.data.length) {
              app.companies = resp.data;
            } else {
              app.dataEmpty = true;
            }
            app.date_from = '';
            app.date_to = '';

          })
          .catch(function (resp) {
            alert("Could not load companies");
          });
      },

      buildURL(date) {
        return API.companies + "?from=" + date.from + "&to=" + date.to;
      },

      formatDate(date) {
        return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
      },

      logout() {

        AUTH.destroyToken();
        this.$router.replace('/');

      }
    },

    //   deleteEntry(id, index) {
    //     if (confirm("Do you really want to delete it?")) {
    //       var app = this;
    //       axios.delete('/api/v1/companies/' + id)
    //         .then(function (resp) {
    //           app.companies.splice(index, 1);
    //         })
    //         .catch(function (resp) {
    //           alert("Could not delete company");
    //         });
    //     }
    //   }
  }
</script>
<style>
  #create {
    margin: 0 0 15px 5px;
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
