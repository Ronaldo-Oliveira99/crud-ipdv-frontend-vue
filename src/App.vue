<template>
<div>
  <div id="app">
    <div class="logo">
      <img alt="Vue logo" src="./assets/logo.png">
      <p>Desenvolvido por:<b>Ronaldo Luiz</b></p>

    </div>
    <Home />
  </div>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import Home from './home/Home'

export default {
  name: 'App',
  components: {
     Home
  },
  mounted() {
     
     }
}
</script>

<style>
img{
  width: 5%;
  display: flex;
  align-items: center;
}
.logo{
  background-color: rgb(209, 209, 226);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 1px;
  margin-bottom: 30px;
}


</style>

