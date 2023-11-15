<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from './lib/supabaseClient'
import { RouterLink, RouterView } from 'vue-router'

const countries = ref([])

async function getCountries() {
  const { data } = await supabase.from('countries').select()
  countries.value = data
}

onMounted(() => {
  getCountries()
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

  <ul class="text-red-600 border mt-20 flex flex-col items-center justify-center gap-3 p-5">
    <li class="" v-for="country in countries" :key="country.id">{{ country.name }}</li>
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