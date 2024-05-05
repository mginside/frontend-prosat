<script setup>
import {computed, inject, ref, watch} from "vue";
import {useUserStore} from "@/stores/user";
import axios from "axios";

const props = defineProps({'item':Object,
'popup':Boolean})
const store = useUserStore()

const amount = ref()
const message = ref('')
const alert_color = ref('')
const dialog = ref(inject('topup'))
const toptup_btn = ref(false)
const action = ref('transfer_credit')
const emit = defineEmits(['reload_data','closeTopUp'])

watch(amount,()=>{

  if(action.value === 'transfer_credit'){
    if (ReminingCredits.value < 0){
      message.value = 'you do not have enough credits'
      alert_color.value = 'error'
      toptup_btn.value=true
    }else{
      message.value = ''
      alert_color.value = ''
      toptup_btn.value=false


    }
  }
  if(action.value==='remove_credit'){
    if(parseFloat(amount.value)>parseFloat(props.item.credits)){
      message.value = 'user '+props.item.username +' does not have credit'
      alert_color.value = 'error'
      toptup_btn.value=true
    }else{
      message.value = ''
      alert_color.value = ''
      toptup_btn.value=false
    }



  }

})
const closeModal = ()=>{
  amount.value = null
  message.value = ''
  emit('closeTopUp')
}
const ReminingCredits = computed(()=>{
  if (action.value === 'transfer_credit'){
    return parseFloat(amount.value)<0 ? store.getBalance - parseFloat(amount.value)*-1 : store.getBalance - parseFloat(amount.value)}
  if (action.value ==='remove_credit'){
    return parseFloat(amount.value)<0 ? store.getBalance + parseFloat(amount.value)*-1 : store.getBalance + parseFloat(amount.value)}

})

const submitForm = ()=>{
    let data = {
      'user_id':props.item.id,
      'credits':amount.value,
      'action':action.value
    }
    axios.post('user/topup/',data).then((res)=>{
      store.refreshUserInfo()
      message.value = res.data.message
      alert_color.value = 'success'

      setTimeout(closeModal,3000)
      emit('reload_data')


    }).catch((err)=>{
      console.log(err)

    })




}

</script>

<template>
<v-dialog v-model="dialog" max-width="500">

<v-card class="pa-5">
<transition>
<v-alert v-if="message" :color="alert_color" :text="message"></v-alert>
</transition>
  <v-card-item>
<v-card-title>
Manage Credits
  <v-card-subtitle>
     reseller : <span class="text-pre">{{item.username}}</span>
  </v-card-subtitle>
</v-card-title>
</v-card-item>
<v-card-text class="mt-5">
<v-form>
  <v-radio-group v-model="action">
    <v-radio value="transfer_credit" color="success" label="Transfer credits"></v-radio>
    <v-radio value="remove_credit" color="error" label="Remove credits"></v-radio>
  </v-radio-group>
  <v-text-field v-model="amount" variant="underlined" type="number" label="Credit" min="1" />

  <v-row v-if="amount" class="text-teal">
    <v-col><span>Current Credit: {{store.getBalance}}</span></v-col>
    <v-col><span>Remining Credit: {{ReminingCredits}}</span></v-col>

  </v-row>


</v-form>
</v-card-text>
 <v-card-actions>
   <v-spacer></v-spacer>
     <v-btn @click="closeModal">CLose</v-btn>
     <v-btn @click="submitForm" color="success" :disabled="toptup_btn">TopUp</v-btn>

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