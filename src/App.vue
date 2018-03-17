<template>
    <div id="app">
        <dashboard></dashboard>
    </div>
</template>

<script>
 import Dashboard from './components/Dashboard.vue'
 import Entry from "./components/Entry.vue";
 import Graphs from './components/Graphs.vue'
 export default {
     name: 'App',
     components: {
         Dashboard, 
         Entry,
         Graphs
     }
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
</style>
