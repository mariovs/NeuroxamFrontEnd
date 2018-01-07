<template>
  <div class="mainDiv">
    <div class="row">
      <h3>{{category.Name}}</h3>
    </div>
    <div class="row">
      <h5>{{category.Description}}</h5>
    </div>
    <div class="categoryList"  v-for="exam in examList" :key="exam.idExam">
      <div class="row">
        <div class="col s12 m12 l12">
          <div class="card red lighten-1">
            <div class="card-content center white-text">
              <span class="card-title">{{exam.name}}</span>
              <p>{{exam.description}}</p>
            </div>
            <div class="card-action center">
              <div class="row">
                <router-link class="white-text btn" :to="{name: 'StartExam' , 
                params: { examId : exam.idExam, examName: exam.name, categoryId: exam.categoryId, categoryName: category.Name}}">Incepe examen 
                </router-link>
              </div>
              <div class="row">
                <router-link class="white-text btn blue" :to="{name: 'AddExam' , 
                params: { exam: exam}}">Editeaza
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <router-link class="btn-floating btn-large waves-effect waves-light red lighten-1 pulse" :to="{name: 'AddExam' , params: { categoryId : $route.params.id }}"><i class="material-icons">add</i> </router-link>
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
var examList = []
var category =  {
        Name: "",
        Description: ""
      }
export default {
  name: "ExamCategory",
  data() {
    return {
      examList: [],
      category
    };
  },
  created: function() {
    category.Name = this.$route.params.categoryName
    category.Description = this.$route.params.categoryDescription
    console.log(category)
    axios.get("http://localhost:5000/api/exam/getExamsCategory", {
      params: {
        categoryId: this.$route.params.id
      }
    }).then(response => {
      console.log(response, this.$route.params.id)
      this.examList = response.data;
    })
  },
  methods: {
    createExam: function(event){
      console.log(this.$route.router)
      this.$router.push({name: "ExamCategory", params: {categoryId: this.$route.params.id}})
      console.log("create exam clicked")
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
  padding: 8px;
 
}

.categoryList{
  height: 300px;
  display: inline-block;
  margin: 10px;
}

.mainDiv {
  margin-bottom: 50px;
  margin-top: 20px;
}
</style>
