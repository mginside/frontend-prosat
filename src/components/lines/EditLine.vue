<script setup>
import {inject, ref} from "vue";
import axios from "axios";
const message = ref('')
const note = ref('')
const props = defineProps(['item'])
const dialog = ref(inject('edit_popup'))
const emit = defineEmits(['RefreshLine'])
const submitForm = async ()=>{
  const data = {
    'lineID':props.item.id,
    'note': note.value
  }
  await axios.post('line/edit/',data).then((res)=>{
    message.value = res.data.message
    emit('RefreshLine')

  }).catch((err)=>{
    console.log(err)
  })
}
</script>

<template>
<v-dialog v-model="dialog" max-width="500">
  <v-card class="pa-5">
    <Transition>
      <v-alert color="success" v-if="message" :text="message"/>
    </Transition>

    <v-card-item>
      <v-card-title>
        Edit Note
        <v-card-subtitle>
          {{item.username}}
        </v-card-subtitle>
      </v-card-title>
    </v-card-item>
    <v-card-text>
      <v-text-field v-model="note" variant="underlined" label="Note"/>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="dialog=false">Close</v-btn>
      <v-btn color="success" @click="submitForm">Edit</v-btn>
    </v-card-actions>
  </v-card>


</v-dialog>
</template>

<style scoped>
.v-dialog {
  align-items: flex-start;
  margin-top: 50px;


}
</style>