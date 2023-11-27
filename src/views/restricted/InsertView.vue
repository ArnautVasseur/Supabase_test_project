<script setup>

import { insertpathologies, insertsoins } from '../../lib/supabaseFunctions';

</script>

<template>
    <!-- <div>
        <input class="text-black m-5" type="text" id="inputvalue_insert" placeholder="pathologie">
        <button class="border p-3 m-5" @click="insertpathologies">
            Insert here
        </button>
    </div> -->
    <div class="flex justify-center items-center">
        <input class="text-black m-5" type="text" id="soinsname_insert" placeholder="nom du soin">
        <textarea class="text-black m-5" type="text" id="soinsdesc_insert" placeholder="description du soin"></textarea>
        <input type="file" id="soinsimage_insert" accept="image/*" />
        <button class="border p-3 m-5" @click="insertsoins">
            Insert here
        </button>
    </div>
</template>

<script lang="ts">


</script>