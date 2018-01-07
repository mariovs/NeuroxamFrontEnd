<template>
  <div >
    <nav>
      <div class="nav-wrapper teal">
        <ul><router-link class="brand-logo center" :to="{name: 'MainPage'}">Neuroxam</router-link></ul>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
           <router-link class="waves-effect waves-light" :to="{name: 'CategoriesMain'}">Categorii</router-link>
        </ul>
      </div>
    </nav>
    <div class="main-page">
      <router-view class="container"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.main-page{
  margin-top: 30px
}
</style>
