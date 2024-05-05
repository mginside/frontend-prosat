<script setup>
import {useI18n} from 'vue-i18n'
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import axios from "axios";
import {onMounted,inject} from "vue";
import {ref} from "vue";
import router from "@/router";
import {useUserStore} from "@/stores/user";
const store = useUserStore()
const dialog = ref(inject('dialog'))
const emit = defineEmits(['reload'])
const {t} = useI18n()
const schema = yup.object({
  username: yup.string().required(t('username.required')).label('Username').test('Unique username','this username already exist', function(value){
   return new Promise((resolve,reject)=>{
      axios.post('user/check_username',{'user':value}).then(res=>{
       console.log(res.data.username)
        if (res.data.username === true){
          return resolve(false)
        }else {
          return resolve(true)
        }



     })
   })
  }),
  email: yup.string().email().required().label('E-mail').test('Unique email','this email already exist',(value)=>{
    return new Promise((resolve,reject)=>{
      axios.post('user/check_email',{'email_adresse':value}).then(res=>{
        if (res.data.email === true){
          return resolve(false)
        }else{
          return resolve(true)
        }
      })
    })
  }),
  password: yup.string().min(8).required().matches(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/,'Password must contain letter and number'),
  passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required()
      .label('Password confirmation'),
  select:yup.string(),
  phone:yup.string().required().min(11)

});

const { defineField, handleSubmit, resetForm } = useForm({
  validationSchema: schema,
});

// Refer to the docs for how to make advanced validation behaviors with dynamic configs
// TODO: Add link
const vuetifyConfig = (state) => ({
  props: {
    'error-messages': state.errors,
  },
});

const [username, usernameProps] = defineField('username', vuetifyConfig);
const [email, emailProps] = defineField('email', vuetifyConfig);
const [password, passwordProps] = defineField('password', vuetifyConfig);
const [passwordConfirm, confirmProps] = defineField(
    'passwordConfirm',
    vuetifyConfig
);
const[phone,phoneProps] = defineField('phone',vuetifyConfig)
const[select,selectProps] = defineField('select',vuetifyConfig)



const onSubmit = handleSubmit((values) => {

  const user = {
    'username':values.username,
    'email':values.email,
    'password':values.password,
    'password_confirm':values.passwordConfirm,
    'phone_number':values.phone,
    'member_group_id':store.user.is_admin ? values.select : store.user.member_group_id
  }
  axios.post('user/create/',user)
      .then(res=>{
        resetForm()
        dialog.value=false
        emit('reload')
        
      }).catch(error=>{
        console.log(error)
  })
});

const groups = ref([])

onMounted(()=>{
  axios.get('user/groups').then(res=>{
    groups.value = res.data
  })
})
</script>

<template>

      <v-dialog v-model="dialog" max-width="500" >
      <v-card elevation="12" class="pa-5">



        <v-card-text>
          <v-form  class="px-4">
            <v-text-field v-model="username" v-bind="usernameProps" :label="t('username')" variant="underlined"/>
            <v-text-field
                v-model="email"
                v-bind="emailProps"
                :label="t('email')"
                type="email"
                variant="underlined"
            />
            <v-text-field
                v-model="password"
                v-bind="passwordProps"
                :label="t('password')"
                type="password"
                variant="underlined"
            />
            <v-text-field
                v-model="passwordConfirm"
                v-bind="confirmProps"
                :label="t('password.confirmation')"
                type="password"
                variant="underlined"
            />
            <v-text-field
                v-model="phone"
                v-bind="phoneProps"
                label="phone"
                type="text"
                variant="underlined"
            />
            <v-select v-if="store.user.is_admin" v-model="select" v-bind="selectProps" :items="groups" label="select" item-value="group_id" item-title="group_name" variant="underlined">

            </v-select>




          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn title="close" @click="dialog=false">close</v-btn>
          <v-spacer></v-spacer>
          <v-btn title="reset" color="warning" @click="resetForm">reset</v-btn>
          <v-btn color="success" title="reset" @click="onSubmit">submit</v-btn>

        </v-card-actions>


      </v-card>
      </v-dialog>



</template>

<style scoped>

</style>
