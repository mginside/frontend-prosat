<script setup>
import axios from 'axios';
import { ref,inject } from 'vue';
const props = defineProps(['item'])
const dialog = ref(inject('disable'))
const emit = defineEmits(['reload'])
const alert_message = ref('')
const close_modal = ()=>{
    dialog.value=false
    alert_message.value=''
}
const Block = ()=>{
    axios.post(`user/enable-disable/${props.item.id}`).then((res)=>{
        alert_message.value=res.data.message
        console.log(res.data.message)
        emit('reload')
        setTimeout(close_modal,1000)
    }).catch((err)=>{
        console.log(err)
    })
}
</script>

<template>
    <v-dialog
      v-model="dialog"
      width="auto"
    >
    
      <v-card
        
        class="pa-5"
        max-width="500" 
      >
      <Transition>
      <v-alert v-if="alert_message" color="success" :text="alert_message"></v-alert>
        </Transition>
      <v-card-item>
      <v-card-title>
        {{ 'Reseller '+ item.username }}
      </v-card-title>
    </v-card-item>
      <v-card-text>
        {{ item.is_active ? 'Are you sur you want to block reseller ?':'Are you sur you want to unblock reseller ?' }}
      </v-card-text>
     
      
      <v-card-actions>
        <v-spacer></v-spacer>
        
   
          <v-btn
            class="ms-auto"
            text="Cancel"
            @click="close_modal"
          ></v-btn>
          <v-btn
            :color="item.is_active ?'error':'success'"
            class="ms-auto"
            :text="item.is_active?'Block':'Unblock'"
            @click="Block"
          ></v-btn>
   

      </v-card-actions>
       
      </v-card>
     
    </v-dialog>
</template>



<style lang="scss" scoped>

</style>