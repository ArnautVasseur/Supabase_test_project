<script setup>

import { supabase } from '../../lib/supabaseClient'
import { countries, deleteCountries } from '../../lib/supabaseFunctions';
import { ref, onMounted } from 'vue';

async function getCountries() {
  const { data } = await supabase.from('countries').select()
  countries.value = data
}

onMounted(() => {
  getCountries()
})

const result = ref()

</script>

<template>
    <select class="text-black m-5" v-model="result" id="filter_delete">
        <option disabled value="" class="text-black">Please select one</option>
        <option class="text-black" v-for="country in countries" :key="country.id">
            {{ country.name }}
        </option>
    </select>

    <div class="m-5">Selected: {{ result }}</div>

    <button class="border p-3 m-5" @click="deleteCountries">
        delete here
    </button>
</template>

<style>

</style>