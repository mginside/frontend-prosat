<script setup>
import {computed, inject, onMounted, ref, toRef} from "vue";
import axios from "axios";
const props = defineProps(['item'])


const dialog = ref(inject('edit'))
const email = ref()
const phone = ref()

const editemail = ref(true)
const editphone = ref(true)

onMounted(()=>{
  console.log('fdsafsafadffa')
})
</script>

<template>
  <v-dialog v-model="dialog" max-width="500">

  <v-card class="pa-5">
    <v-alert v-if="false" color="success" text=""/>
    <v-card-item>
    <v-card-title>
      Edit Reseller
      <v-card-subtitle>

      </v-card-subtitle>
    </v-card-title>
    </v-card-item>
    <v-card-text>
      <v-text-field :readonly="editemail"  type="email" label="email">
        <template v-slot:append>
          <v-icon icon="mdi mdi-pencil" @click="editemail=!editemail"/>
        </template>

      </v-text-field>
      <v-text-field type="text" label="phone number"/>
      <v-divider/>

    </v-card-text>
    <v-card-actions>
      <v-spacer/>
      <v-btn text="Close"/>
      <v-btn color="success" text="Save"/>
    </v-card-actions>



  </v-card>

</v-dialog>
</template>

<style scoped>

</style>