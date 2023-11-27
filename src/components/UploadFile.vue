<script>
import { ref } from 'vue';
import { supabase } from '../lib/supabaseClient';

export default {
  name: 'SoinsUploader',
  setup() {
    const fileInput = ref(null);
    const imageUrl = ref(null);
    const showOverlay = ref(false);
    const customFileNameInput = ref('');

    const handleFileInputChange = async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      showOverlay.value = true;
      const customFileName = customFileNameInput.value.trim();

      const { data, error } = await supabase
        .storage
        .from('soins')
        .upload(customFileName || 'defaultFileName', file);

      showOverlay.value = false;
      if (error) {
        console.error(error);
        return;
      }
      imageUrl.value = URL.createObjectURL(file);
    };

    return {
      fileInput,
      imageUrl,
      showOverlay,
      customFileNameInput,
      handleFileInputChange,
    };
  },
};


</script>

<template>
    <div class="relative w-24 h-24 overflow-hidden border-2 border-gray-300 rounded-full cursor-pointer">
        <div class="flex items-center justify-center w-full h-full text-gray-500 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 0a10 10 0 1 0 10 10A10 10 0 0 0 10 0zM9 9H5v2h4v4h2v-4h4V9h-4V5H9v4z"
            clip-rule="evenodd" />
        </svg>
        </div>
        <label for="soins-upload" class="absolute inset-0 opacity-0 cursor-pointer">
        <span class="sr-only">Upload soins</span>
        <input id="soins-upload" type="file" @change="handleFileInputChange" class="w-full h-full">
        </label>
        <div v-if="showOverlay" class="absolute inset-0 flex items-center justify-center bg-gray-500 opacity-50 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-white animate-pulse" viewBox="0 0 20 20"
            fill="currentColor">
            <path fill-rule="evenodd" d="M10 0a10 10 0 1 0 10 10A10 10 0 0 0 10 0zM9 9H5v2h4v4h2v-4h4V9h-4V5H9v4z"
            clip-rule="evenodd" />
        </svg>
        </div>
    </div>
  
    <div>
        <label for="custom-file-name">Custom File Name:</label>
        <br/>
        <input class="text-black" id="custom-file-name" v-model="customFileNameInput" type="text" placeholder="Enter custom file name">
    </div>
</template>