<template>
  <div class="tree-menu">
    <!-- <div class="row" :style="indent"   >
        <div class="col s12 m6">
          <div class="card red lighten-1">
            <div class="card-content white-text">
              <span class="card-title" v-if="questionName != null">{{questionName}}</span>
              <span class="card-title" v-if="diagnostic != null"> Diagnostic: {{diagnostic}}</span>
            </div>
            <div class="card-action" v-for="answer in answers" :key="answer.answerLabel" >
              <a class="white-text"  @click="toggleChildren">{{answer.answerLabel}}</a>
            </div>
          </div>
        </div>
      </div> -->
    <div class="" >
        <div>
          <div v-for="answer in answers" :key="answer.answerLabel" :style="indent">
            <span class="card blue lighten-1 card-title white-text" @click="toggleChildren" v-if="answer.answerLabel != null">
              Raspuns:  {{answer.answerLabel}} and : {{answer.questionName}}
            </span>
            <div v-if="questionName != null" :style="indent">
               <span class="card red lighten-1 card-title white-text">Intrebare:  {{questionName}}</span>
            </div>
          </div>
        </div>
    </div>
    <tree-menu 
      v-if="showChildren"
      v-for="answer in answers" 
      :key="answer.questionName"
      :questionName="answer.questionName"
      :answers= "answer.answers"
      :diagnostic = "answer.diagnostic"
      :depth="depth + 1">
    </tree-menu>
  </div>
</template>
<script>
  export default { 
    props: [ 'questionName', 'answers', 'diagnostic', 'depth' ],
    data() {
      return { showChildren: false }
    },
    name: 'tree-menu',
    computed: {
      indent() {
        return { transform: `translate(${this.depth * 100}px)` }
      }
    },
    methods: {
      toggleChildren() {
        this.showChildren = !this.showChildren;
      }
    }
  }
</script>
<style scoped>
     .has-children {
        cursor: pointer;
      }
    .label-wrapper {
      padding-bottom: 10px;
      margin-bottom: 10px;
      border-bottom: 1px solid #ccc;
    }
</style>
