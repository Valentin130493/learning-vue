<script setup>
import {ref, computed, watchEffect} from 'vue'
import {TODO_KEY} from "@/static/storageKeys";


const filters = {
  all: (todos) => todos,
  active: (todos) => todos.filter((todo) => !todo.completed),
  completed: (todos) => todos.filter((todo) => todo.completed)
}


const todos = ref(JSON.parse(localStorage.getItem(TODO_KEY) || '[]'))
const visibility = ref('all')
const editedTodo = ref()


const filteredTodos = computed(() => filters[visibility.value](todos.value))
const remaining = computed(() => filters.active(todos.value).length)


watchEffect(() => {
  localStorage.setItem(TODO_KEY, JSON.stringify(todos.value))
})

function toggleAll(e) {
  todos.value.forEach((todo) => (todo.completed = e.target.checked))
}

function addTodo(e) {
  const value = e.target.value.trim()
  if (value) {
    todos.value.push({
      id: Date.now(),
      title: value,
      completed: false
    })
    e.target.value = ''
  }
}

function removeTodo(todo) {
  todos.value.splice(todos.value.indexOf(todo), 1)
}

let beforeEditCache = ''

function editTodo(todo) {
  beforeEditCache = todo.title
  editedTodo.value = todo
}

function cancelEdit(todo) {
  editedTodo.value = null
  todo.title = beforeEditCache
}

function doneEdit(todo) {
  if (editedTodo.value) {
    editedTodo.value = null
    todo.title = todo.title.trim()
    if (!todo.title) removeTodo(todo)
  }
}

function removeCompleted() {
  todos.value = filters.active(todos.value)
}


const handleClick = (e) => {
  visibility.value = e.target.id
}


</script>

<template>
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input
          class="new-todo"
          autofocus
          placeholder="What needs to be done?"
          @keyup.enter="addTodo"
      >
    </header>
    <section class="main" v-show="todos.length">
      <input
          id="toggle-all"
          class="toggle-all"
          type="checkbox"
          :checked="remaining === 0"
          @change="toggleAll"
      >
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <li
            v-for="todo in filteredTodos"
            class="todo"
            :key="todo.id"
            :class="{ completed: todo.completed, editing: todo === editedTodo }"
        >
          <div class="view">
            <input class="toggle" type="checkbox" v-model="todo.completed">
            <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
            <button class="destroy" @click="removeTodo(todo)"></button>
          </div>
          <input
              v-if="todo === editedTodo"
              class="edit"
              type="text"
              v-model="todo.title"
              @vnode-mounted="({ el }) => el.focus()"
              @blur="doneEdit(todo)"
              @keyup.enter="doneEdit(todo)"
              @keyup.escape="cancelEdit(todo)"
          >
        </li>
      </ul>
    </section>
    <footer class="footer" v-show="todos.length">
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        <span>{{ remaining === 1 ? ' item' : ' items' }} left</span>
      </span>
      <ul class="filters">
        <li id="all" @click="handleClick" :class="{ select: visibility === 'all' }">
          All
        </li>
        <li id="active" @click="handleClick" :class="{ select: visibility === 'active' }">
          Active
        </li>
        <li id="completed" @click="handleClick" :class="{ select: visibility === 'completed' }">
          Completed
        </li>
      </ul>
      <button class="clear-completed" @click="removeCompleted" v-show="todos.length > remaining">
        Clear completed
      </button>
    </footer>
  </section>
</template>

<style>
@import "https://unpkg.com/todomvc-app-css@2.4.1/index.css";

li {
  padding: 0 5px;

}

li:hover {
  cursor: pointer;
}

.select {
  color: blue
}
</style>