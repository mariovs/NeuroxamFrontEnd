<template>
  <div class="hello container">
    <!-- <h1>{{ msg }}</h1> -->
    <li id="example-1" class="row">
      <div class="col s12">
        <div class="col s6 offset-s3">
          <div class="card  blue darken-1">
            <div class="card-content white-text">
              <span class="card-title">Creeaza examen</span>
              <p>Adauga examene, intrebari si raspunsuri</p>
            </div>
            <div class="card-action">
                <a class="waves-effect waves-light btn-large" v-on:click="createExam">Creeaza structura</a>
            </div>
          </div>
        </div>
      </div>
      <div class="col s12">
        <div class="col s6 offset-s3">
          <div class="card deep-purple lighten-1">
            <div class="card-content white-text">
              <span class="card-title">Incepe un test</span>
              <p></p>
            </div>
            <div class="card-action">
                <a class="waves-effect waves-light btn-large" v-on:click="startExam" >Incepe examinarea </a>              
            </div>
          </div>
        </div>
      </div>
    </li>
  </div>

</template>

<script>
import axios from "axios";


export default { 
  name: "HelloWorld",
  data() {
    return {
      items: []
      
    };
  },
  methods: {
    created() {
      
      axios.get("http://localhost:5000/api/category").then(response => {
        this.items = response.data;
      })
    },
    createExam: function(event){
      console.log(this.$route.router)
      
      this.$router.push({name: "CategoriesMain", params: {writeMode: true}})
      console.log("create exam clicked " + this.$IsInWriteMode)
    },
    
    startExam: function(event){
          this.$IsInWriteMode = false
          this.$router.push({name: "CategoriesMain", params: {writeMode: false}})
    }


  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  
  list-style-type: none;
}
li {
  display: block;
  margin: auto;
}
.mainDiv{
  display: inline-block;
}
</style>

