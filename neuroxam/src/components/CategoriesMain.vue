<template>
  <div class="mainDiv row">
    <div class="categoryList"  v-for="category in categoryList" :key="category.id">
        <div class="col s12 m12 l12">
          <div class="card purple darken-1 s7 l7 m7 ">
            <div class="card-content white-text">
              <span class="card-title">{{category.categoryName}}</span>
              <p>{{category.categoryDescription}}</p>
            </div>
            <div class="card-action">
                
                <router-link class="waves-effect waves-light btn" :to="{name: 'ExamCategory', 
                params: { id: category.categoryId, categoryName: category.categoryName, categoryDescription: category.categoryDescription }}">Detali</router-link>
                <!-- < href="" > Explore {{ category.categoryName}}</a> -->
            </div>
          </div>
        </div>
    </div>
    <div class="row" v-if="writeMode">
      <a class="btn-floating btn-large waves-effect waves-light red pulse" v-on:click="addCategory" ><i class="material-icons">add</i></a>      
      
    </div>

    <div id="modal1" class="modal">
      <div class="modal-content">
        <h4>Modal Header</h4>
        <p>A bunch of text</p>
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
      </div>
    </div>
  </div>



</template>

<script>
import axios from "axios";

writeMode: false
export default {
  name: "HelloWorld",
  data() {
    return {
      categoryList: [],
      writeMode: false
    };
  },
  created: function() {
    axios.get("http://localhost:5000/api/category").then(response => {
      this.categoryList = response.data;
    })
    console.log(this.$route.params)
    this.writeMode = this.$route.params.writeMode;

  },
  methods: {

    createExam: function(event){
        console.log("create exam clicked")
    },

    addCategory: function(event){
      this.$router.push({name:"AddCategory"})
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
  
 
}
.categoryList{

  display: inline-block;
  margin-bottom: 24px;
  margin-top: 24px
}

.mainDiv {
  margin-bottom: 20px;
  margin-top: 20px;
}
</style>
