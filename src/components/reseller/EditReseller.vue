<script setup>
import {inject,watch ,reactive, ref} from "vue";
import axios, { formToJSON } from "axios";
import { useToast } from "vue-toastification";
import debounce from 'lodash.debounce';
const existemail = ref(false)
const toast = useToast()
const props = defineProps(['item'])
const dialog = ref(inject('edit'))
const form = ref()
const email = ref()
const email_user =ref()
const phone_user=ref()
const phone = ref()
const loading = ref(false)

const regexEmail = /^[a-zA-Z0–9._-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,4}$/;
const regexPhone = /^(\+[1-9]{1}[0-9]{3,14})?([0-9]{9,14})$/;
const phoneRules = ref([
  v=>!!v || 'phone number is required',
  v=> regexPhone.test(v) || 'incorrect phone number '
])
const emailRules = ref(
  [
  v=>!!v || 'email is required',
  v=> regexEmail.test(v) || 'invalid email format',
  v=> existemail.value || 'this email already exist'



]
)

const getProfile = async ()=>{
  if(props.item){
   await axios.get(`user/edit/${props.item.id}/`).then(res=>{
      email.value=email_user.value = res.data.email
      
      phone.value = phone_user.value = res.data.phone_number
    })
  }
 
}
const editProfile = async ()=>{
  await form.value.validate()
  
  if (form.value.isValid){
    if(email.value === email_user.value && phone.value === phone_user.value){
    dialog.value=false
    toast.info('no change has been happened')
  }else{
    loading.value = true
    await axios.put(`user/edit/${props.item.id}/`,{'email':email.value,'phone_number':phone.value}).then(res=>{
      loading.value=false
      dialog.value = false
      form.value.reset()
      toast.success('profile edited with success')
    }

    ).catch(err=>{
      constole.log(err)
    })

  }
    
  }
}
const checkEmailExist = async ()=>{
  if(email.value===email_user.value){
    existemail.value=true
  }else{
    axios.post(`user/check_email`,{'email_adresse':email.value}).then(res=>{
      if(res.data.email===true){
        existemail.value=false
      }
      
      else{
      existemail.value=true
    }
    })
  }

 
 
}
watch(email,debounce(()=>{
checkEmailExist()
},500))

watch(dialog,()=>{
if(dialog.value == true){

  getProfile()
  checkEmailExist()
}
})


</script>

<template>
  <v-dialog v-model="dialog" max-width="500">

  <v-card class="pa-5">
    
    <v-card-item>
    <v-card-title>
      Edit Reseller 
      <v-card-subtitle>
        {{ item.username }}
      </v-card-subtitle>
    </v-card-title>
    </v-card-item>
    <v-card-text>
      <v-form @submit.prevent="editProfile" ref="form">
        <v-text-field :rules="emailRules" v-model="email" type="email" variant="underlined" prepend-icon="mdi mdi-email" label="Email"/>
        <v-text-field :rules="phoneRules"  v-model="phone" type="phone" variant="underlined" prepend-icon="mdi mdi-phone" label="Mobile"/>

      </v-form>
 
    

    </v-card-text>
    <v-card-actions>
      <v-spacer/>
      <v-btn @click="dialog = fase" text="Close"/>
      <v-btn :loading="loading" color="success" @click="editProfile" text="Save"/>
    </v-card-actions>



  </v-card>

</v-dialog>
</template>

<style scoped>

</style>