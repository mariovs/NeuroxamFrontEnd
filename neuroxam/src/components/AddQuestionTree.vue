<template>
  <li>
    <div class="card teal"
        :class="{bold: isFolder}"
        @click="toggle"
        @dblclick="changeType" 
        v-if="model.name != ''">
        <div class="card-content white-text" >
            Intrebare: {{model['name']}}
            <span v-if="isFolder">[{{open ? '-' : '+'}}]</span>
            
        </div>
        <li class="btn blue lighten-1" @click="openAnsForm">Adauga un raspuns</li>
    </div>
    <div class="col s6" v-if="model.openAnswerForm == true"> 
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

    <div class="card red lithten-1 white-text"  @click="toggle"  v-if="model.answer != null" >
        Raspuns: {{model.answer}}
    </div>
    <div class="card blue lighten-1 white-text" v-if="model.diagnostic != null">
       Diagnostic: {{model.diagnostic}}
    </div>
    <ul v-show="open" v-if="isFolder">
      <add-question-tree
        class="item"
        v-for="model in model.children"
        :model="model">
      </add-question-tree>
      <li class="add" @click="addChild">+</li>
    </ul>
  </li>
</template>

<script>
import Vue from 'vue'
  export default { 
        props: [ 'model', 'examenId' ],
        data(){
            return {
            open: false,
            openAnswerForm: false,
            openQuestionForm: false
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
                this.open = !this.open
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
            openAnsForm: function(){
                this.openAnswerForm = true
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
</style>
