<script setup>
import {ref} from 'vue'

const count = ref(0)


const decrease = () => count.value++

const increase = () => count.value--

const double = () => count.value = count.value * 2

const clear = () => count.value = 0

</script>


<template>


  <p class="p">{{ count }}</p>
  <div class="footer">
    <button @click="increase" :disabled="count <= -10">Count -</button>
    <button @click="decrease" :disabled="count >= 10">Count +</button>
    <button @click="double" :disabled="count >= 100 || count<=-100 || count === 0">double x2</button>
    <button @click="clear">Clear</button>
  </div>
</template>

<style>


button {
  background: hsla(160, 100%, 37%);
  color: white;
  outline: none;
  border: none;
  padding: 10px;
  border-radius: 8px;
}

button:hover {
  cursor: pointer;
}

button:disabled {
  opacity: 0.2;
}

.p {
  color: blue;
  font-size: 72px;
  padding: 5px;
}

.footer {
  width: 40%;
  display: flex;
  justify-content: space-evenly;
}

</style>