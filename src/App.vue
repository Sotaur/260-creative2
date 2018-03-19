<template>
    <div id="app">
        <app-header></app-header>
        <router-view></router-view>
        <footer class="page-footer light-green accent-4">
        <div id="footer">
            <div>
                <a class="white-text" href="https://github.com/Sotaur/260-creative2">Code found here</a>
            </div>
        </div>
    </footer>
    </div>
</template>

<script>
 import AppHeader from './components/AppHeader';
 export default {
     name: 'App',
     components: {
         AppHeader
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
  display: flex;
  flex-direction: column;
  align-content: center;
}
</style>
