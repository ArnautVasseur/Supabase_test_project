<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from './lib/supabaseClient'
import { RouterLink, RouterView } from 'vue-router'

const pathologies = ref([])
const soins = ref([])

async function getpathologies() {
  const { data } = await supabase.from('pathologies').select()
  pathologies.value = data
}

async function getsoins() {
  const { data } = await supabase.from('soins').select()
  soins.value = data
}

onMounted(() => {
  getpathologies(),
  getsoins()
})
</script>

<template>
  
  <div class="links gap-3 flex flex-wrap mt-10">
    <RouterLink class="border p-3 w-40 text-center border-red-500" to="/">Home</RouterLink>
    <RouterLink class="border p-3 w-40 text-center border-orange-500" to="/secret">Secret</RouterLink>
    <RouterLink class="border p-3 w-40 text-center border-yellow-500" to="/login">Login</RouterLink>
    <RouterLink class="border p-3 w-40 text-center border-green-500" to="/unauthorized">Unauthorized</RouterLink>
    <RouterLink class="border p-3 w-40 text-center border-white" to="/map">Map</RouterLink>
  </div>

  <div class="links gap-3 flex flex-wrap mt-10">
    <RouterLink class="border p-3 w-40 text-center border-teal-500" to="/insert">Insert</RouterLink>
    <RouterLink class="border p-3 w-40 text-center border-blue-500" to="/update">Update</RouterLink>
    <RouterLink class="border p-3 w-40 text-center border-purple-500" to="/delete">Delete</RouterLink>
  </div>

  <!-- <ul class="border mt-20 flex flex-col items-center justify-center gap-3 p-5">
    <li v-for="patho in pathologies" :key="patho.id">{{ patho.name }}</li>
  </ul> -->

  <ul v-for="soin in soins" :key="soin.id" class="border mt-5 flex flex-col items-center justify-center gap-3 p-5">
    <li>{{ soin.name }}</li>
    <img class="w-10 h-10" :src="soin.image_url" alt="">
  </ul>

  <RouterView />
</template>

<style scoped>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
}

input[type="file"] {
    display: none;
}

.custom-file-upload {
    border: 1px solid #ccc;
    border-radius: 4px;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
    background:#4A8FED;
    padding:10px;
    color:#fff;
    font:inherit;
    font-size: 16px;
    font-weight: bold;
}

</style>