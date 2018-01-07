<template>
<div class="container">
 <div class="row">
    <div class="row">
      <div class="col offset-s4">
        <h4> Adauga o categorie </h4>
      </div>
    </div>
    <form class="col s12">
      <div class="row">
        <div class="input-field col s6 offset-s2">
          <input placeholder="Nume categorie" id="category_name" type="text" class="validate" v-model="data.name" >
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6 offset-s2">
          <input placeholder="Descriere categorie" id="category_description" type="text" class="validate" v-model="data.description">
        </div>
      </div>
      <div class="row">
        <a class="waves-effect waves-light btn col s4 m2 l2 offset-s4 offset-m4 offset-l4" v-on:click="addCategory" >Adauga categorie</a>
      </div> 
    </form>
  </div>
    <md-snackbar class="teal" :md-duration="data.duration" :md-active.sync="data.showSnackbar" md-persistent>
      <span class="white-text" >{{data.snackbarMsg}}</span>
    </md-snackbar>
</div>
</template>

<script>
import axios from "axios"
import VueMaterial from 'vue-material'

var data = {
  name: "",
  description: "",
  showSnackbar: false,
  duration: 4000,
  snackbarMsg: ""
  }
export default {
    name: "AddCategory",
    data: function() {
        return{
            data
        }
    },
    created: function() {
        data.name ='',
        data.description = ''
        data.showSnackbar = false
      
    },
    methods: {
        addCategory: function(event){
            if(data.name == '')
                return
            if(data.description == '')
              return

            var querystring = require('querystring');
            axios.post("http://localhost:5000/api/category",
                 querystring.stringify({
                    name: data.name, //gave the values directly for testing
                    description: data.description,
                  }), {
                      headers: { 
                        "Content-Type": "application/x-www-form-urlencoded"
                      }
             }).then(response => {
              data.showSnackbar = true
              data.snackbarMsg = "Categorie '" + data.name + "' adaugata"
              setTimeout(event =>{
                  this.$router.push({name:"CategoriesMain"})
              }, 2000)
              console.log("respone is ok")
              console.log(response)
            })
            .catch(error =>{
              data.showSnackbar = true
              data.snackbarMsg = "Ups avem o eroare"
              console.log("exception arrived")
              console.log(error);
            });


        }
    }
};


</script>