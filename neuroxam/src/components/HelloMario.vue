<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1> -->
    <ul id="example-1">
      <a class="waves-effect waves-light btn-large" v-on:click="createExam">Create Exams</a>
      <a class="waves-effect waves-light btn-large" > Use Exams</a>
    </ul>
    

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
      this.$route.router.go('/somewhere-else');
      
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
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
