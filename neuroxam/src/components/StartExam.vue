<template>
<div class="container">
 <div>
    <div class="row">
      <div class="col">
        <a class="waves-effect waves-light btn blue lighten-1" v-on:click="backToExams(data.categoryId)"><i class="material-icons left">arrow_back</i>Examene</a>
      </div>
    </div>
    <div>
        <h4>Examen: {{data.examName}} </h4>
    </div>
    <div v-if="data.questions.length == 0" class="row">
      <div class="center">
        <img src="../assets/empty_state.png" >
      </div>
    </div>
    <div v-if="data.questions.length > 1">
      <a class="waves-effect waves-light btn  red lighten-1" v-on:click="previousQuestion"><i class="material-icons left">arrow_back</i>Intrebarea precedenta</a>
    </div>
    <div v-if="data.questions.length > 0 && data.diagnostic == null ">
      <div class="center" >
          <div class="card-panel deep-orange lighten-1" >
            <span class="flow-text white-text">{{data.questions[this.data.questions.length -1].questionName}} </span>
          </div>
      </div>
      <div v-if="data.questions.length > 0">
          <div v-for="answer in data.questions[this.data.questions.length -1].answerList" :key="answer.idAnswer">
            <div class="row">
                <a class="waves-effect waves-light btn col s10 offset-s1 medium answer-btn center-align" v-on:click="nextQuestion(answer)" >{{answer.name}}</a>
            </div>
          </div>
      </div>
    </div>
    <div v-if="data.diagnostic != null"> 
       <div class="row">
        <div class="col s12 m6">
          <div class="card teal">
            <div class="card-content white-text">
              <span class="card-title">Diagnostic: {{data.diagnostic.name}}</span>
              <h5>{{data.diagnostic.description}}</h5>
            </div>
          </div>
        </div>
      </div>
      <div class="col offset-s2">
        <a class="waves-effect waves-light btn blue lighten-1" v-on:click="backToExams(data.categoryId)">
          Inapoi la examene</a>
      </div>
    </div>

  </div>
</div>
</template>

<script>
import axios from "axios";
import VueMaterial from "vue-material";

var data = {
  examId: 0,
  categoryId: 0,
  categoryName: "",
  examName: "",
  diagnostic: null,
  questions: []
};
export default {
  name: "StartExam",
  data: function() {
    return {
      data
    };
  },
  created: function() {
    data.categoryId = this.$route.params.categoryId
    data.examId = this.$route.params.examId;
    data.diagnostic = null
    data.examName = this.$route.params.examName;
    data.questions = [];
    console.log("exam id is : " +  data.examId)
    if (data.examId == 0 || data.examId == "") {
      console.log("error exam id is missing");
      return;
    }

    axios
      .get("http://localhost:5000/api/questions/getFirstQuestionOfExam", {
        params: {
          examId: this.$route.params.examId
        }
      })
      .then(response => {
        console.log(response.data);
        if(response.data != "")
        {
            data.questions.push(response.data);
        }
        console.log("respone is ok  " + data.questions.length);
        console.log(response);
      })
      .catch(error => {
        data.showSnackbar = true;
        data.snackbarMsg = "Ups avem o eroare";
        console.log("exception arrived");
        console.log(error);
      });
  },
  methods: {
    nextQuestion: function(answer) {
      console.log("question id is " + answer);
      if(answer.idDiagnostic == 0 && answer.idNextQuestion != 0)
      {
          axios
            .get("http://localhost:5000/api/questions/getQuestionById", {
              params: {
                questionId: answer.idNextQuestion
              }
            })
            .then(response => {
              console.log(response.data);
              if(response.data != "")
              {
                data.questions.push(response.data);
              }
              console.log("respone is ok data is " + data.questions);              
            })
            .catch(error => {
              data.showSnackbar = true;
              data.snackbarMsg = "Ups avem o eroare";
              console.log("exception arrived");
              console.log(error);
            });
      }else if(answer.idDiagnostic != 0 && answer.idNextQuestion == 0)
      {
        console.log("answer diagnostic is " + answer.idDiagnostic)
          axios.get("http://localhost:5000/api/diagnostic", {
            params: {
              diagnosticId: answer.idDiagnostic
            }
          }).then(response =>{

            console.log(response.data)
            console.log("data is before" + data.diagnostic)
            data.diagnostic = response.data
            console.log("data is " + JSON.stringify(data.diagnostic))
          })
          .catch(error =>{
            console.log("error on getting diagnostic")
          })
      }else{
        data.showSnackbar = true;
        data.snackbarMsg = "Ups avem o eroare";
        console.log("error exam is incomplete")
      }
    },

    previousQuestion: function(){
      if(data.diagnostic == null)
      {
        let popped = data.questions.pop();
      }else{
        data.diagnostic = null
      }
      console.log(data.questions)
      console.log("object pop: " + popped)
    },

    backToExams: function(categoryId){
      if(categoryId == 0){
        this.$router.push({name:"CategoriesMain"})
        data.questions = []
        data.diagnostic = null
      }else{
        this.$router.push({name:"ExamCategory", params: {id: data.categoryId, categoryName: data.categoryName}})
        data.questions = []
        data.diagnostic = null
      }
    }
  }
};


// {
//     idQuestion: 0,
//     questionName: "",
//     examId: 0,
//     answerList: []
//   }
</script>

<style scoped>
  .answer-btn{
    height: 44px;

  }
</style>

