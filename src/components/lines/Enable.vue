<script setup>
import {useToast} from "vue-toastification";
import axios from 'axios';
import { ref,inject } from 'vue';
const props = defineProps(['item'])
const dialog = ref(inject('enable'))
const emit = defineEmits(['reload'])

const loading = ref(false)
const toast = useToast()
const Block = async ()=>{
    loading.value=true
    await axios.post(`line/enable-disable/${props.item.id}`).then((res)=>{
        loading.value = false
        dialog.value = false
        toast.success(res.data.message)
        emit('reload')
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



      <v-card-item>
      <v-card-title>
        {{ 'Line '+ item.username }}
      </v-card-title>
    </v-card-item>
      <v-card-text>
        {{ item.is_active ? 'Are you sur you want to block line ?':'Are you sur you want to unblock line ?' }}
      </v-card-text>
     
      
      <v-card-actions>
        <v-spacer></v-spacer>
        
   
          <v-btn
            class="ms-auto"
            text="Cancel"
            @click="dialog=false"
          ></v-btn>
          <v-btn
            :color="item.enabled ?'error':'success'"
            class="ms-auto"
            :loading="loading"
            :text="item.enabled?'Block':'Unblock'"
            @click="Block"
          ></v-btn>
   

      </v-card-actions>
       
      </v-card>
     
    </v-dialog>
</template>



<style lang="scss" scoped>

</style>