<script>
import axios from "axios";

export default {
  data: () => ({
    message : '',
    color : '',
    dialog:false,
    OldPassword: '',
    NewPassword: '',
    ConfirmPassword:'',
    PasswordRegex : '^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$',
    old_password_visibility:false,
    new_passwod_visibility:false,
    confirm_password_visibility:false


  }),

  methods : {
    reset_form : function (){
      this.$refs.form.reset()
      this.message = ''

      this.OldPassword = ''
      this.NewPassword = ''
      this.ConfirmPassword = ''
      this.visible = false

    },
    open_model: function (){
      this.dialog = true
      this.reset_form()
    },

    close_model:function (){
      this.dialog = false
      this.reset_form()
    },
    required : function (value){
      return value ? true : 'password are required'
    },
    minimum:function (value){
      if(value.length >= 8){
        return true
      }else{
        return 'password must be greater then 8 character'
      }
    },
    matching : function (){
      if(this.NewPassword === this.ConfirmPassword){
        return true
      }else {
        return 'confirm password must match password'
      }
    },
    regexpassword : function (value){
      if(value.match(this.PasswordRegex)){
        return true

      }else {
        return 'password must contain number and special characters'
      }
    },
    submitform: async function (){

      if(this.$refs.form.isValid){
        const password = {
          'old_password':this.OldPassword,
          'new_password':this.NewPassword,
          'confirm_password':this.ConfirmPassword
        }
        await axios.put('user/changePassword/',password).then((res)=>{
          this.message = res.data.messsage

          this.color = 'green'
          setTimeout(this.close_model,3000)




        }).catch((err)=>{
          this.message = err.response.data.old_password[0]
          this.color = 'red'

        })
      }


    },
  }
}

</script>

<template>

  <v-list-item item-title="Change Paswword" @click="open_model">
    Change password
  <template v-slot:append>
    <span class="mdi mdi-lock-outline"></span>
  </template>
  </v-list-item>

  <v-dialog max-width="500" height="700" v-model="dialog" @click:outside="reset_form">

      <v-card  class="pa-5" min-height="300">
        <v-alert :color="color" v-if="message" theme="dark">{{message.toLowerCase()}}</v-alert>
        <v-card-text class="pt-4">
          <v-form @submit.prevent ref="form">
            <v-text-field
                :type="old_password_visibility ? 'text' : 'password' "
                v-model="OldPassword"
                :rules="[required,minimum]"
                :counter="8"
                label="Old password"
                variant="underlined"
                :append-inner-icon ="old_password_visibility ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="old_password_visibility = !old_password_visibility"
            ></v-text-field>
            <v-text-field
                :type="new_passwod_visibility ? 'text' : 'password' "
                v-model="NewPassword"
                :rules="[required,minimum,regexpassword]"
                :counter="8"
                label="New password"
                variant="underlined"
                :append-inner-icon ="new_passwod_visibility ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner ="new_passwod_visibility = !new_passwod_visibility"
            ></v-text-field>
            <v-text-field
                :type="confirm_password_visibility ? 'text':'password'"
                v-model="ConfirmPassword"
                :rules="[required,minimum,matching,regexpassword]"
                :counter="8"
                label="Confirm password"
                variant="underlined"
                :append-inner-icon="confirm_password_visibility ? 'mdi-eye-off' : 'mdi-eye'"
                @click:appendInner="confirm_password_visibility = !confirm_password_visibility"
            ></v-text-field>


          </v-form>


        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
              text="Close"
              color="error"
              @click="close_model()"
          ></v-btn>
          <v-btn color="success"
              text="Save" ref="form"
                 type="submit"
                 @click.prevent = "submitform"

          ></v-btn>
        </v-card-actions>
      </v-card>



  </v-dialog>

</template>

<style scoped>

</style>