<script setup>

import { ref } from 'vue';

const pointure = ref()
const reglement = ref()

</script>

<template>
    <div>
        <p>Click the button to modify an existing PDF document with <code>pdf-lib</code></p>
        <button @click="modifyPdf">Modify PDF</button>
        <p class="small">(Your browser will download the resulting file)</p>
    </div>

    <input class="text-black m-5" type="text" id="name_input" placeholder="Prénom / Nom">
    <input class="text-black m-5" type="text" id="ssn_input" placeholder="Numéro de sécurité sociale">

    <select class="text-black m-5" v-model="pointure" id="pointure">
        <option disabled value="" class="text-black">Please select one</option>
        <option class="text-black">Moins de 28</option>
        <option class="text-black">Entre 28 et 37</option>
        <option class="text-black">Plus de 37</option>
    </select>

    <select class="text-black m-5" v-model="reglement" id="reglement">
        <option disabled value="" class="text-black">Please select one</option>
        <option class="text-black">Chèque</option>
        <option class="text-black">Espèces</option>
        <option class="text-black">Carte Bleue</option>
    </select>

    <div class="flex flex-col justify-center items-center gap-5">
        <p>Pointure: {{ pointure }}</p>
        <p>Paiement: {{ reglement }}</p>
    </div>

    <div id="ErrorMessage" style="display: none; color: red;"></div>

</template>

<script>

import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import download from 'downloadjs';

const result = ref()
const display = ref()



export default {
    data() {
        return {
            currentDate: null,
        };
    },
    methods: {
        async modifyPdf() {
            try {
                switch(reglement.value){
                    case "Chèque":
                        display.value = 1;
                        break;
                    case "Espèces":
                        display.value = 2;
                        break;
                    case "Carte Bleue":
                        display.value = 3;
                        break;
                    default:
                        display.value = 0;
                        break;
                }

                switch(pointure.value){
                    case "Moins de 28":
                        result.value = 1;
                        break;
                    case "Entre 28 et 37":
                        result.value = 2;
                        break;
                    case "Plus de 37":
                        result.value = 3;
                        break;
                    default:
                        result.value = 0;
                        break;
                }

                if(result.value == 0 || display.value == 0){
                    // Show success message
                    ErrorMessage.textContent = "Veuillez remplir tous les champs";
                    ErrorMessage.style.display = 'block';

                    // Optional: Hide the success message after a certain time (e.g., 3 seconds)
                    setTimeout(() => {
                        ErrorMessage.style.display = 'none';
                    }, 3000);

                } else {
                    // Fetch an existing PDF document
                    const url = '../public/devis.pdf';
                    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());

                    // Load a PDFDocument from the existing PDF bytes
                    const pdfDoc = await PDFDocument.load(existingPdfBytes);

                    // Embed the Helvetica font
                    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

                    // Get the first page of the document
                    const pages = pdfDoc.getPages();
                    const firstPage = pages[0];

                    // Get the width and height of the first page
                    const { width, height } = firstPage.getSize();
                    const patient_name = document.getElementById("name_input").value;
                    const patient_ssn = document.getElementById("ssn_input").value;

                    const now = new Date();
                    const formattedDate = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
                    const currentDate = formattedDate;

                    const date = currentDate

                    // Draw a string of text diagonally across the first page
                    firstPage.drawText(patient_name, {
                        x: 405,
                        y: 681.5,
                        size: 12,
                        font: helveticaFont,
                        color: rgb(0, 0, 0),
                    });

                    firstPage.drawText(patient_ssn, {
                        x: 428,
                        y: 656,
                        size: 10,
                        font: helveticaFont,
                        color: rgb(0, 0, 0),
                    });

                    firstPage.drawText(date, {
                        x: 355,
                        y: 632.5,
                        size: 10,
                        font: helveticaFont,
                        color: rgb(0, 0, 0),
                    });

                    //cocher en fonction de la pointure
                    switch(result.value){
                        case 1:
                            firstPage.drawText("x", {
                                x: 117,
                                y: 412,
                                size: 20,
                                font: helveticaFont,
                                color: rgb(0, 0, 0),
                            });
                            break;
                        case 2:
                            firstPage.drawText("x", {
                                x: 117,
                                y: 399.5,
                                size: 20,
                                font: helveticaFont,
                                color: rgb(0, 0, 0),
                            });
                            break;
                        case 3:
                            firstPage.drawText("x", {
                                x: 117,
                                y: 386,
                                size: 20,
                                font: helveticaFont,
                                color: rgb(0, 0, 0),
                            });
                            break;
                    }

                    //cocher en fonction du règlement
                    switch(display.value){
                        case 1:
                            firstPage.drawText("x", {
                                x: 61,
                                y: 181,
                                size: 26,
                                font: helveticaFont,
                                color: rgb(0, 0, 0),
                            });
                            break;
                        case 2:
                            firstPage.drawText("x", {
                                x: 61,
                                y: 156.5,
                                size: 26,
                                font: helveticaFont,
                                color: rgb(0, 0, 0),
                            });
                            break;
                        case 3:
                            firstPage.drawText("x", {
                                x: 61,
                                y: 132.5,
                                size: 26,
                                font: helveticaFont,
                                color: rgb(0, 0, 0),
                            });
                            break;
                    }

                    

                    // Serialize the PDFDocument to bytes (a Uint8Array)
                    const pdfBytes = await pdfDoc.save();

                    // Trigger the browser to download the PDF document
                    download(pdfBytes, 'pdf-lib_modification_example.pdf', 'application/pdf');
                
                }

            } catch (error) {
                console.error("An error occurred:", error);
            }
        },

        getCurrentDate() {
            const now = new Date();
            const formattedDate = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
            this.currentDate = formattedDate;
        }
    },
    mounted() {
        this.getCurrentDate();
    },
};

</script>

<style>


</style>
