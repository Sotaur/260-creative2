<template>
  <div class="todo">
    <h1>A List of Things To Do</h1>
    <p v-show="activeTodos.length === 0">You are done with all your tasks! Good job!</p>
    <form v-on:submit.prevent="addItem">
      <input type="text" v-model="message">
      <button type="submit">Add</button>
    </form>
    <div class="controls">
      <button v-on:click="showAll()">Show All</button>
      <button v-on:click="showActive()">Show Active</button>
      <button v-on:click="showCompleted()">Show Completed</button>
      <button v-on:click="deleteCompleted()">Delete Completed</button>
    </div>
    <ul>
      <li v-for="item in filteredTodos" draggable="true" v-on:dragstart="dragItem(item,$event)" v-on:dragover.prevent v-on:drop="dropItem(item)">
	<input type="checkbox" v-model="item.completed" v-on:click="completeItem(item)" /><label v-bind:class="{ completed: item.completed }">{{ item.text }}</label><button v-on:click="deleteItem(item)" class="delete">X</button>
      </li>
    </ul>
  </div>
</template>

<script>
 export default {
   name: 'Dashboard',
   data () {
     return {
       todos: [],
       message: '',
       show: 'all',
       drag: {},
     }
   },
   computed: {
     activeTodos: function() {
       return this.todos.filter(function(item) {
	 return !item.completed;
       });
     },
     filteredTodos: function() {
       if (this.show === 'active')
	 return this.todos.filter(function(item) {
	   return !item.completed;
	 });
       if (this.show === 'completed')
	 return this.todos.filter(function(item) {
	   return item.completed;
	 });
       return this.todos;
     },
   },
   methods: {
     addItem: function() {
       this.todos.push({text: this.message,completed:false});
       this.message = '';
     },
     completeItem: function(item) {
       item.completed = !item.completed;
     },
     deleteItem: function(item) {
       var index = this.todos.indexOf(item);
       if (index > -1)
	 this.todos.splice(index,1);
     },
     showAll: function() {
       this.show = 'all';
     },
     showActive: function() {
       this.show = 'active';
     },
     showCompleted: function() {
       this.show = 'completed';
     },
     deleteCompleted: function() {
       this.todos = this.todos.filter(function(item) {
	 return !item.completed;
       });
     },
     dragItem: function(item,event) {
       this.drag = item;
       event.dataTransfer.setData('text', '');
     },
     dropItem: function(item) {
       var indexItem = this.todos.indexOf(this.drag);
       var indexTarget = this.todos.indexOf(item);
       this.todos.splice(indexItem,1);
       this.todos.splice(indexTarget,0,this.drag);
     },
   }
 }
</script>

<style>
</style>