<template>
  <li>
    <div 
        :class="{bold: isFolder}"
        @click="toggle"
        @dblclick="changeType" 
        v-if="model.name">
        <div class="row">
           <div class="card grey lighten-3 col s6">
               <div class="card-content">
                    <div class="card-title" >
                        Intrebare: {{model['name']}}
                        <span v-if="isFolder">[{{open ? '-' : '+'}}]</span>
                    </div>
                    <div class="card-action">
                        <a class="btn blue lighten-1" @click="openAnsForm">Adauga un raspuns</a>
                    </div>
               </div>
           </div>
        </div>
    </div>

    <div class="col s6" v-if="openAnswerForm == true"> 
       <h5 class="col offset-s2">Adauga un raspuns</h5>
      <form>
        <div class="row">
          <div class="input-field col s6 offset-s2">
            <input placeholder="Nume intrebare" id="category_description" type="text" class="validate " v-model="model.answer.name">
          </div>
        </div>
        <div class="row">
          <a class="waves-effect waves-light btn col s4 m2 l2 offset-s4 offset-m4 offset-l4" v-on:click="addAnswer" >Adauga raspuns</a>
        </div> 
      </form>
    </div>

    <div class="row" v-if="model.answer != null">
        <div class="card red lighten-1 col s6 center">
            <div class="card-content">
                <div class="white-text"  @click="toggle"   >
                   <h5> Raspuns: {{model.answer.name}}</h5>
                </div>
                <a class="btn purple white-text" v-on:click="openQuestionFromAns(model.answer)">Adauga intrebare</a>
                <a class="btn green white-text">Adauga diagnostic</a>
            </div>
        </div>
       <div class="col s6" v-if="model.answer.showQ"> 
            <h5 class="col offset-s2">Adauga o intrebare</h5>
            <form>
                <div class="row">
                    <div class="input-field col s6 offset-s2">
                        <input placeholder="Nume intrebare" id="category_description" type="text" class="validate " v-model="model.answer.questionDescriptionModel">
                    </div>
                </div>
                <div class="row">
                    <a class="waves-effect waves-light btn col s4 m2 l2 offset-s4 offset-m4 offset-l4" v-on:click="addQuestionForAnswer(model.answer)" >Adauga o intrebare</a>
                </div> 
            </form>
        </div>
        <ul>
            <add-question-tree
                class="item"
                v-for="model in model.answer.children"
                :model="model"
                :examid = "examid">
            </add-question-tree>
            <li class="add" @click="addChild">+</li>
        </ul>
        <div class="col s6" v-if="model.answer.showD"> 
            <h5 class="col offset-s2">Adauga un diagnostic</h5>
            <form>
                <div class="row">
                    <div class="input-field col s6 offset-s2">
                        <input placeholder="Nume diagnostic" id="category_description" type="text" class="validate " v-model="answerName">
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s6 offset-s3">
                        <input placeholder="Descriere diagnostic" id="category_description" type="text" class="validate " v-model="answerName">
                    </div>
                </div>
                <div class="row">
                    <a class="waves-effect waves-light btn col s4 m2 l2 offset-s4 offset-m4 offset-l4" v-on:click="addAnswer" >Adauga raspuns</a>
                </div> 
            </form>
        </div>
    </div>

    <div class="row" v-if="model.diagnostic != null">
        <div class="card grey lighten-3 col s6">
            <div class="card-content">
                <div class="blue lighten-1 white-text" >
                 Diagnostic: {{model.diagnostic}}
                </div>
            </div>
        </div>
    </div>

    <ul v-show="open" v-if="isFolder">
      <add-question-tree
        class="item"
        v-for="model in model.children"
        :model="model"
        :examid = "examid">
      </add-question-tree>
      <li class="add" @click="addChild">+</li>
    </ul>
  </li>
</template>

<script>
import Vue from 'vue'
import axios from "axios"

  export default { 
        props: [ 'model', 'examid' ],
        data(){
            return {
            open: true,
            openAnswerForm: false,
            openQuestionForm: false,
            answerName: "mario"
            }
        },
        name: 'add-question-tree',
        computed: {
            isFolder: function () {
            return this.model.children &&
                this.model.children.length
            }
        },
        methods: {
            toggle: function () {
            if (this.isFolder) {
                this.open = this.open
            }
            },
            changeType: function () {
            if (!this.isFolder) {
                Vue.set(this.model, 'children', [])
                this.addChild()
                this.open = true
            }
            },
            addChild: function () {
            this.model.children.push({
                name: 'new stuff'
            })
            },
            openQuestionFromAns:function(answer){
                answer.showQ = true
            },
            addQuestionForAnswer: function(answer){
                this.openAnswerForm = false
                        var querystring = require('querystring');
                        console.log("exam id is from tree : " + this.examid)
                        axios.post("http://localhost:5000/api/questions/create",
                            querystring.stringify({
                                questionDescription: answer.questionDescriptionModel, //gave the values directly for testing
                                examid: this.examid,
                                parentResponseId: answer.answerId
                            }), {
                                headers: { 
                                    "Content-Type": "application/x-www-form-urlencoded"
                                }
                        }).then(response => {
                            console.log("respone is ok from ans to q " + JSON.stringify(response.data))
                            if(answer.children == null)
                            {
                                Vue.set(answer, 'children', [])
                            }
                            answer.showQ = false;
                            answer.children.push({
                                name: response.data.questionName
                            })

                            console.log("model is : " + JSON.stringify(this.model))
                        })
                        .catch(error =>{
                            console.log("exception arrived")
                            console.log(error);
                        });
            },
            openAnsForm: function(){
                this.openAnswerForm = true
            },
            addAnswer: function(){
                this.openAnswerForm = false
                var querystring = require('querystring');
                axios.post("http://localhost:5000/api/answer/create",
                    querystring.stringify({
                        name: this.answerName, //gave the values directly for testing
                        parentQuestionId: this.model.questionId
                    }), {
                        headers: { 
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                }).then(response => {
                    console.log("respone is ok " + JSON.stringify(response.data))
                    if(this.model.children == null)
                    {
                        Vue.set(this.model, 'children', [])
                    }

                    this.model.children.push({
                        answer: response.data.name
                    })

                    console.log("model is : " + JSON.stringify(this.model))

                })
                .catch(error =>{
                    console.log("exception arrived")
                    console.log(error);
                });
            }
        }
    }

</script>


<style scoped>
body {
  font-family: Menlo, Consolas, monospace;
  color: #444;
}
.item {
  cursor: pointer;
}
.bold {
  font-weight: bold;
}
ul {
  padding-left: 1em;
  line-height: 1.5em;
  list-style-type: dot;
}
.card{
    bottom: 0px;
}
</style>
