<script setup>
import { inject, ref } from 'vue';
const props = defineProps(['codes'])
const dialog= ref(inject('dialog'))


</script>

<template>
   <v-dialog max-width="500"  v-model="dialog">
    <v-card class="pa-5">
        <v-card-text>
           <v-textarea max-rows="20" variant="solo-filled" :model-value="codes" readonly no-resize auto-grow >
          
           </v-textarea>
        </v-card-text>
        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="dialog=false">Close</v-btn>
        <v-btn color="success" append-icon="mdi mdi-content-copy" @click="">Copie</v-btn>
         </v-card-actions>
    </v-card>
   
   </v-dialog>
</template>

<style  scoped>

</style>