<script setup>

import { supabase } from '../../lib/supabaseClient'
import { pathologies, soins, deletepathologies, deletesoins } from '../../lib/supabaseFunctions';
import { ref, onMounted } from 'vue';

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

const result = ref()

</script>

<template>
    <!-- <select class="text-black m-5" v-model="result" id="filter_delete">
        <option disabled value="" class="text-black">Please select one</option>
        <option class="text-black" v-for="country in pathologies" :key="country.id">
            {{ country.name }}
        </option>
    </select>

    <div class="m-5">Selected: {{ result }}</div>

    <button class="border p-3 m-5" @click="deletepathologies">
        delete here
    </button> -->

    <select class="text-black m-5" v-model="result" id="soins_delete">
        <option disabled value="" class="text-black">Please select one</option>
        <option class="text-black" v-for="soin in soins" :key="soin.id">
            {{ soin.name }}
        </option>
    </select>

    <div class="m-5">Selected: {{ result }}</div>

    <button class="border p-3 m-5" @click="deletesoins">
        delete here
    </button>

    <div id="successMessage" style="display: none; color: red;"></div>
</template>

<style>

</style>