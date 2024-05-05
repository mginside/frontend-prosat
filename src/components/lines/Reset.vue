<script setup>
import axios from 'axios';
import { ref,inject } from 'vue';
const props = defineProps(['item'])
const dialog = ref(inject('reset_popup'))
const emit = defineEmits(['reset'])
const activeCode = ref('')
const alert_message = ref('')
const close_modal = ()=>{
    dialog.value=false
    alert_message.value=''
    activeCode.value=''
}
const reset_code = ()=>{
    activeCode.value=''
    axios.post(`line/reset/${props.item.id}`).then((res)=>{
        alert_message.value=res.data.message
        activeCode.value=res.data.new_active_code
        emit('reset',activeCode)
     
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
   
   
      <v-card-text>
        <div v-if="!activeCode">
            Are you sur you want to reset this active code {{ item.username }} ?
        </div>
        <div v-if="activeCode">
           <span>New active code generated with success you can still seach by using new active code or old active code</span><br>
          <h3 class="mt-5 text-green text-center">
           {{ activeCode }}
          </h3>
          

        </div>
      </v-card-text>
     
      
      <v-card-actions>
        <v-spacer></v-spacer>
        
   
          <v-btn
            class="ms-auto"
            text="Close"
            @click="close_modal"
          ></v-btn>
          <v-btn
            color="success"
            class="ms-auto"
            text="Reset"
            @click.once="reset_code"
          ></v-btn>
   

      </v-card-actions>
       
      </v-card>
     
    </v-dialog>
</template>



<style lang="scss" scoped>

</style>