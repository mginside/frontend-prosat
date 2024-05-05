<script setup>
import {useRoute} from "vue-router";
import {useI18n} from 'vue-i18n'
import {ref} from "vue";
import {reactive} from "vue";
import EmailSuccess from "@/components/login/EmailSuccess.vue";
import axios from "axios";
import router from "@/router";
const password = ref(null)
const confirm_password = ref(null)
const loading = ref(false)
const visible = ref(false)
const route = useRoute()
const {t} = useI18n()

const email_notification = reactive({
  msg:null,
  color:null,
})

const onSubmit = async ()=>{
  if (!password.value){
    email_notification.msg = t('password.required')
  }
  else if(!confirm_password.value){
    email_notification.msg = t('password.confirm.required')
  }
  else if(password.value.length < 8){
    email_notification.msg = t('password.lenght')
  }
  else if(password.value !== confirm_password.value){
    email_notification.msg = t('password.matched')
  }
  else {
    const id = route.params.id
    const token = route.params.token

   await axios.put('user/passwordResetConfirm/',{'id':id,'token':token,'new_password':password.value
    ,'confirm_password':confirm_password.value})
        .then(response=>{
          email_notification.msg = t('password.change.success')
          email_notification.color = "#00897B"
          setTimeout(function (){
            router.push({name:'login'})
            email_notification.msg = 'null'
            email_notification.color ='null'
          },2000)




        }).catch(error=>{
          email_notification.msg = "there is an error please try again....."

    })
  }


}

</script>

<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" md="6">
        <v-card elevation="6" class="px-15 mt-10 mx-auto">
          <v-card-title align="center" class="mt-10">
            <v-img width="150" src="/public/prosatgrey.png"/>

          </v-card-title>

          <v-card-text class="mt-10">

            <v-form
                v-model="form"
                @submit.prevent="onSubmit"
            >

              <v-text-field
                  v-model="password"
                  :readonly="loading"

                  prepend-inner-icon="mdi-lock-outline"
                  :append-inner-icon ="visible ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append-inner="visible = !visible"
                  :label="t('password')"
                  placeholder="Enter your password"
                  :type="visible ? 'text' : 'password'"


              ></v-text-field>
              <v-text-field
                  v-model="confirm_password"
                  :readonly="loading"

                  prepend-inner-icon="mdi-lock-outline"
                  :append-inner-icon ="visible ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append-inner="visible = !visible"
                  :label="t('password.confirmation')"
                  placeholder="Enter your password"
                  :type="visible ? 'text' : 'password'"


              ></v-text-field>

              <EmailSuccess v-if="email_notification.msg" :email_notification="email_notification"/>


              <v-btn
                  class="mt-10"
                  :loading="loading"
                  block
                  color="blue-grey-lighten-2 mb-15"
                  size="large"
                  type="submit"
                  variant="elevated"
              >
                {{ t('email.reset.btn') }}
              </v-btn>


            </v-form>


          </v-card-text>


        </v-card>

      </v-col>

    </v-row>
  </v-container>
</template>

<style scoped>

</style>