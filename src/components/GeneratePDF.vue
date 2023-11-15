<script setup>

import { jsPDF } from "jspdf";

function generatePDF(){
  const doc = new jsPDF();

  doc.text("Hello world!", 10, 10);
  doc.save("a4.pdf");
}

</script>

<template>
  <button @click="generatePDF">Generate a PDF</button>
</template>

<style>

</style>