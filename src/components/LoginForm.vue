<script setup>
import router from "@/router";
import {ref, watchEffect} from "vue"
import {token} from "@/static/storageKeys";


const initialState = {
  email: '',
  password: ''
}

let formData = ref(initialState)

const error = ref(false)

const admin = {
  email: 'admin@admin.com',
  password: "admin12345"
}

const handleSubmit = (e) => {

  if (formData.value.email === admin.email && formData.value.password === admin.password) {
    localStorage.setItem(token, "")
    router.push({path: '/home'})
  } else {
    error.value = true
  }

  e.target.reset()
}


watchEffect(() => {

  if (error.value) {
    alert('wrong email or password')
  }
})


</script>

<template>
  <form @submit.prevent="handleSubmit" class="form">
    <h1>Login into your account</h1>
    <input v-model="formData.email" type="email" class="form-control" placeholder="Email" required>
    <input v-model="formData.password" type="password" class="form-control" placeholder="Password" required>
    <button class="btn" type="submit"> Log in</button>

  </form>


</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

input {
  margin-top: 10px;
  width: 100%;
  padding: 5px;
}

.btn {
  margin-top: 10px;
  color: white;
  background: #4FBD4FFF;
  padding: 5px 10px;
  border-radius: 8px;
  border: none;
  outline: none;
  transition: all 0.3ms ease-in-out;
}

.btn:hover {
  cursor: pointer;
}

.btn:active {
  transform: scale(1.1);
}
</style>