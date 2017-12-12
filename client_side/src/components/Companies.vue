<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <div class="panel panel-default">
          <div class="panel-heading text-left">
            <h3>The World’s Biggest Companies</h3>
          </div>
          <div class="panel-body table-responsive">
          </div>
          <div class="form-group">
          </div>

          <div class="form-group text-left" id="create">
            <router-link :to="{name: 'CompanyCreate'}" class="btn btn-success">Add new company</router-link>
          </div>

          <div class="panel panel-default">
            <div class="panel-heading text-left"><h4>Companies list<a class="logout" @click ="logout()">Logout</a></h4></div>
            <div class="panel-body">
              <button class="btn btn-info btn-sm" @click="showFilter = !showFilter">Filter by date</button>
              <transition name="toggle">
              <div class="filter text-center" v-if="showFilter">
                <form @submit="OnFilter()">
                  <div class="input-group date">
                    <p>From</p>
                    <datepicker v-model="date_from"></datepicker>
                  </div>

                  <div class="input-group date">
                    <p>To</p>
                    <datepicker v-model="date_to"></datepicker>
                  </div>

                  <div class="filter-btn">
                    <button class="btn btn-primary btn-sm btn-block">Filter</button>
                  </div>
                </form>
              </div>
               </transition>
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
  import Datepicker from 'vuejs-datepicker';
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
          console.log(resp.data);
          app.companies = resp.data;
        })
        .catch(function (resp) {
          console.log(resp);
          alert("Could not load companies");
        });
    },
    components: {
      Datepicker
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
      },

      deleteEntry(id, index) {
        if (confirm("Do you really want to delete it?")) {
          var app = this;

          axios.delete(API.companies + '/' + id)
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

  .toggle-enter-active, .toggle-leave-active {
    transition: all .3s ease;
    height:100%;
  }

  .toggle-enter, .toggle-leave-to {
    height: 0;
    opacity: 0;

    //transform: translateY(20px);
  }
</style>
