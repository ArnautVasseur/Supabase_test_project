<script setup>

import { supabase } from '../../lib/supabaseClient'
import { countries, updateCountries } from '../../lib/supabaseFunctions';
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
    <div>
        <input class="text-black m-5" type="text" id="inputvalue_update" placeholder="Nouveau Nom">
        <select class="text-black" v-model="result" id="filter_update">
            <option disabled value="" class="text-black">Please select one</option>
            <option class="text-black" v-for="country in countries" :key="country.id">
                {{ country.name }}
            </option>
        </select>

        <div class="m-5">Selected: {{ result }}</div>

        <button class="border p-3 m-5" @click="updateCountries">
            Update here
        </button>
    </div>
</template>