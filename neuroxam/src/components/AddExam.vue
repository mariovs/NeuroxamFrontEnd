<template>
<div class="container">
 <div class="row">
    <div class="row">
      <div class="col offset-s4">
        <h4> Adauga un examen</h4>
      </div>
    </div>
    <form class="col s12" v-if="data.exam == null">
      <div class="row">
        <div class="input-field col s6 offset-s2">
          <input placeholder="Nume examen" id="category_name" type="text" class="validate" v-model="data.name" >
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6 offset-s2">
          <input placeholder="Descriere examen" id="category_description" type="text" class="validate" v-model="data.description">
        </div>
      </div>
      <div class="row">
        <a class="waves-effect waves-light btn center col s4 m2 l2 offset-s4 offset-m4 offset-l4" v-on:click="addExam" >Adauga examen</a>
      </div> 
    </form>
    <div class="col s6" v-if="data.exam != null">
      <div class="row">
        <div class="col s12 m12">
          <div class="card">
            <div class="card-content">
              <span class="card-title">{{data.exam.name}}</span>
              <p>{{data.exam.description}}</p>
            </div>
            <div class="card-action" v-if="Object.keys(data.questionData).length == 0 ">
              <a v-on:click="displayQuestionForm" >Adauga o intrebare</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col s6" v-if="data.exam != null && data.displayQForm == true "> 
       <h5 class="col offset-s2">Adauga o intrebare</h5>
      <form>
        <div class="row">
          <div class="input-field col s6 offset-s2">
            <input placeholder="Nume intrebare" id="category_description" type="text" class="validate " v-model="data.questionName">
          </div>
        </div>
        <div class="row">
          <a class="waves-effect waves-light btn col s4 m2 l2 offset-s4 offset-m4 offset-l4" v-on:click="addQuestion" >Adauga examen</a>
        </div> 
      </form>
    </div>
  </div>
  <div class="row">
      <ul id="demo" v-if="data.showQuestion">
        <add-question-tree
          :model="data.questionData"
          :examid="data.exam.idExam">
        </add-question-tree>
      </ul>
      <!-- <a class="btn" v-on:click="getFirsQuestion">Get First Question</a> -->
  </div>

  <md-snackbar class="teal" :md-duration="data.duration" :md-active.sync="data.showSnackbar" md-persistent>
    <span class="white-text" >{{data.snackbarMsg}}</span>
  </md-snackbar>
</div>
</template>

<script>
import axios from "axios"
import Vue from "vue"
import VueMaterial from 'vue-material'
import AddQuestion from './AddQuestion.vue'
import TreeMenu from './TreeMenu.vue'
import AddQuestionTree from './AddQuestionTree.vue'

var data = {
  instance:{},
  depth: 0,
  name: "",
  description: "",
  showSnackbar: false,
  duration: 4000,
  snackbarMsg: "",
  categoryId: 0,
  questionName: "",
  displayQForm: false,
  showQuestion: false,
  exam: null,
  tree: {
    answers:[
      {
          questionName: 'Question root',
          answers: [
            {
              answerLabel: "First answer S1",
              answers: [
                {
                  questionName: "Second question ans 2",
                  answers: [
                    {
                      answerLabel: "First answer S1.1.1",
                      answers: [
                        {
                          diagnostic: "Diagnostic 1.1.1"
                        }
                      ]
                    },
                    {
                      answerLabel: "Second answer S1.1.2",
                      answers: [
                        {
                          diagnostic: "Diagnostic 1.1.2"
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              answerLabel: "Second answer S2",
              answers: [
                {
                  questionName: "question ans 2",
                  answers: [
                    {
                      answerLabel: "Second answer 2.1.1",
                      answers: [
                        {
                          diagnostic: "ceva 2.1.1"    
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
      }
    ]
  },
  questionData: {}
  }
export default {
    name: "AddExam",
    data: function() {
        return{
            data
        }
    },
    components: {
      AddQuestion,
      TreeMenu,
      AddQuestionTree
    },
    created: function() {
        data.name ='',
        data.description = ''
        data.showSnackbar = false
        data.categoryId = this.$route.params.categoryId
        data.exam = this.$route.params.exam
        data.questionData = {

        }
        
        let _this = this;
        
        console.log("exam is : " + JSON.stringify(data.exam))
        console.log("data question id : " + JSON.stringify(data.questionData))
        if(data.exam != null)
        {
          
          axios.get("http://localhost:5000/api/questions/getFirstQuestionOfExam", {
            params: {
              examId: data.exam.idExam
            }
          }).then(response => {
            console.log("response for firs question is " + JSON.stringify(response.data))
               this.data.questionData.name = response.data.questionName;
               
                var answerListFromServer = response.data.answerList;
                var arrayLength = answerListFromServer.length;
                if(arrayLength > 0)
                {
                    Vue.set(this.data.questionData, 'children', [])
                }
                for (var i = 0; i < arrayLength; i++) {
                      var answerObj = {
                        name: answerListFromServer[i].name,
                        answerId: answerListFromServer[i].idAnswer,
                        showQ: false,
                        showD: false,
                        questionDescriptionModel: "",
                        diagnosticDescriptionModel: "",
                        children: []
                      }
                      this.data.questionData.children.push({
                        answer: answerObj
                      })
                }
               this.data.questionData.questionId = response.data.idQuestion;
               this.data.showQuestion = true
               console.log("questionData is " + JSON.stringify(data.questionData))
          })
      }
    },
    methods: {
        addExam: function(event){
            console.log("category id is :" + data.categoryId)
            if(data.name == '')
                return
            if(data.description == '')
              return

            if(data.categoryId == 0)
              return
            
            
            var querystring = require('querystring');
            axios.post("http://localhost:5000/api/exam",
                 querystring.stringify({
                    name: data.name, //gave the values directly for testing
                    description: data.description,
                    categoryId: data.categoryId
                  }), {
                      headers: { 
                        "Content-Type": "application/x-www-form-urlencoded"
                      }
             }).then(response => {
              data.showSnackbar = true
              data.snackbarMsg = "Examen '" + data.name + "' adaugat"
              data.exam = response.data

              console.log("respone is ok")
              console.log(response)
            })
            .catch(error =>{
              data.showSnackbar = true
              data.snackbarMsg = "Ups avem o eroare"
              console.log("exception arrived")
              console.log(error);
            });
        },
        addQuestion: function(){
            var querystring = require('querystring');
            axios.post("http://localhost:5000/api/questions/createFirstQuestion",querystring.stringify({
                    questionDescription: data.questionName, //gave the values directly for testing
                    examId: data.exam.idExam,
                  }), {
                      headers: { 
                        "Content-Type": "application/x-www-form-urlencoded"
                      }
             }).then(response => {
               console.log("response for adding question is " + JSON.stringify(response.data))
                data.displayQForm = false
                data.questionData.name = response.data.questionName                    
                console.log("questionData is " + JSON.stringify(data.questionData))
             })
        },
        getFirsQuestion: function(){

          Vue.set(this.data.questionData, 'children', [])
          this.data.questionData.children.push({
            name: 'new stuff'
          })
          

          axios.get("http://localhost:5000/api/questions/getFirstQuestionOfExam", {
            params: {
              examId: data.exam.idExam
            }
          }).then(response => {
            console.log("response for firs question is " + JSON.stringify(response.data))
   
                this.data.questionData.name = response.data.questionName;
                this.data.showQuestion = true
               console.log("questionData is " + JSON.stringify(data.questionData))
          })
        },
        displayQuestionForm: function(){
          data.displayQForm = true
        }
    }
};
    // setTimeout(event =>{
              //     this.$router.push({name:"GetAllExams", params: {id: data.categoryId}})
              // }, 2000)

</script>