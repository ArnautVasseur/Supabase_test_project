<script setup>

import { supabase } from '../../lib/supabaseClient'
import { pathologies, updatepathologies } from '../../lib/supabaseFunctions';
import { ref, onMounted } from 'vue';

async function getpathologies() {
  const { data } = await supabase.from('pathologies').select()
  pathologies.value = data
}

onMounted(() => {
  getpathologies()
})

const result = ref()

</script>

<template>
    <div>
        <input class="text-black m-5" type="text" id="inputvalue_update" placeholder="Nouveau Nom">
        <select class="text-black" v-model="result" id="filter_update">
            <option disabled value="" class="text-black">Please select one</option>
            <option class="text-black" v-for="patho in pathologies" :key="patho.id">
                {{ patho.name }}
            </option>
        </select>

        <div class="m-5">Selected: {{ result }}</div>

        <button class="border p-3 m-5" @click="updatepathologies">
            Update here
        </button>
    </div>
</template>