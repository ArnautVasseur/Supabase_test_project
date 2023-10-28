<script setup>

import { insertCountries } from '../../lib/supabaseFunctions';

</script>

<template>
    <div>
        <input class="text-black m-5" type="text" id="inputvalue_insert">
        <button class="border p-3 m-5" @click="insertCountries">
            Insert here
        </button>
    </div>
</template>

<script lang="ts">


</script>