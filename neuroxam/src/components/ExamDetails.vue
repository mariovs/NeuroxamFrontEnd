<template>
  <div class="mainDiv">
    <ul class="categoryList"  v-for="question in questionList" :key="question.idQuestion">
      <div class="row">
        <div class="col s12 m10">
          <div class="card blue darken-1">
            <div class="card-content white-text">
              <span class="card-title">{{question.questionName}}</span>
            </div>
            <div class="card-action">

                <!-- <router-link class="waves-effect waves-light btn" :to="{name: 'ExamCategory', params: { id: category.categoryId }}">Go to link</router-link> -->
                <!-- < href="" > Explore {{ category.categoryName}}</a> -->
            </div>
          </div>
        </div>
      </div>
    </ul>
    <div>
      <a class="btn-floating btn-large waves-effect waves-light red pulse" href="#modal1" ><i class="material-icons" ></i></a>      
      
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


export default {
  name: "HelloWorld",
  data() {
    return {
      questionList: []
    };
  },
  created: function() {
      console.log(this.$route.params.id)
    axios.get("http://localhost:5000/api/questions/getAllQuestionOfAnExam", {
      params: {
        examId: this.$route.params.id
      }
    }).then(response => {
      this.questionList = response.data;
    })
  },
  methods: {

    createExam: function(event){
      console.log(this.$route.router)
      this.$route.router.go('/somewhere-else');
      
      console.log("create exam clicked")
    },

    goToQuestion: function(questionId){
        console.log(id)
        this.$router.push({name: "ExamCategory", params: {id: questionId}})
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
li {
  
 
}
.categoryList{
  width: 450px;
  height: 200px;
  margin: 10px;
}

.mainDiv {
  margin-bottom: 50px;
  margin-top: 20px;
}
</style>
