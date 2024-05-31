<template>

<v-container>
<v-row justify="center" align="center">
  <v-dialog v-model="dialog" fullscreen>
    <v-card>


        <div class="my-auto ">
          <h3 class="text-center">ENTER YOUR OTP CODE</h3>

          <v-otp-input autofocus type="number" :loading="loading_otp" @finish="onSubmit"  v-model="otp"></v-otp-input>
        </div>



    </v-card>

  </v-dialog>

  <v-col cols="12" md="5" sm="12">
      <v-card elevation="6" class="mt-10 mx-auto pa-1" color="orange-lighten-7">
        <v-card-title align="center">
          <v-img class="mt-10" width="150"  src="/prosatgrey.png"/>
        

        </v-card-title>
        <v-window v-model="step">
          <v-window-item :value="1">

        <v-card-text class="mt-10">

          <v-form

              @submit.prevent="onSubmit"
          >
            <v-text-field
                v-model="username"
                :readonly="loading"
                autofocus
                autocomplete="off"
                prepend-inner-icon="mdi-account"
                class="mb-2"
              
                :label="$t('username')"
                :placeholder="$t('username.placeholder')"
                variant="underlined"
            ></v-text-field>

            <v-text-field
                v-model="password"
                :readonly="loading"

                prepend-inner-icon="mdi-lock-outline"
                :append-inner-icon ="visible ? 'mdi-eye' : 'mdi-eye-off'"   
                @click:append-inner="visible = !visible"
                :label="$t('password')"
                :placeholder="$t('password.placeholder')"
                :type="visible ? 'text' : 'password'"
                variant="underlined"


            ></v-text-field>


            <br>
            <div class="mb-10">

            <a href="#" @click="step++" class="text-decoration-none text-grey-darken-1 font-weight-bold" style="color:">{{$t('forgot_password')}} ?</a>
            </div>

              <ErrorLogin :errors="errors"/>

            <v-btn

                :loading="loading"
                block
                class="btn"
                size="large"
                type="submit"
                variant="elevated"
            >
              {{ $t('login.btn') }}
            </v-btn>
          </v-form>
        </v-card-text>
          </v-window-item>
          <v-window-item :value="2">
            <v-card-text class="mt-10">
              <v-form @submit.prevent="SendEmail">
                <v-text-field
                    v-model="email"
                    :readonly="loading"
                    autocomplete="off"
                    prepend-icon="mdi-email"
                    variant="underlined"
                    class="mb-2"
                    clearable
                    :label="$t('email')"
                ></v-text-field>
                <div class="mb-5">
                <a href="#" @click="step--" class="text-decoration-none  text-grey-darken-1 font-weight-bold">
                  <v-icon icon="mdi-keyboard-backspace" class="mr-1"/>
                  {{ $t('login.back.btn') }}</a>
                </div>
                <EmailSuccess v-if="email_notification.msg" :email_notification="email_notification"/>
                <v-btn
                    :loading="loading"
                    block
                    class="btn mb-15"
                    size="large"
                    type="submit"
                    variant="elevated"
                >
                  {{ $t('send.btn') }}
                </v-btn>
              </v-form>
            </v-card-text>
          </v-window-item>
        </v-window>
      </v-card>
  </v-col>
</v-row>
  </v-container>
</template>
<script>
import axios from "axios";
import {useUserStore} from "@/stores/user";
import ErrorLogin from "@/components/login/ErrorLogin.vue";
import EmailSuccess from "@/components/login/EmailSuccess.vue";
import router from "@/router";
import {useToast} from "vue-toastification";
export default {
  setup(){
    const userStore = useUserStore()
    return {
      userStore
    }
  },
  components : {
    ErrorLogin,
    EmailSuccess
  },
  data: () => ({
    toast : useToast(),
    loading_otp : false,
    dialog:false,
    username: null,
    password: null,
    otp:null,
    showOtpField:true,
    loading: false,
    visible : false,
    step:1,
    email:null,
    errors : {
      username_error : null,
      password_error : null,
    },
    email_notification :{
      msg : null,
      color:null
    }
  }),
  methods: {
    email_validate(email){
      return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    },
     get_me(){
       axios.get('me/').then(response=>{
        this.loading = false
        this.userStore.setUserInfo(response.data)
      }).catch(error=>{
        console.log(error)
      })
    },
      onSubmit () {
      if(!this.username){
        this.errors.username_error = this.$t('username.required')
      }
      if (!this.password){
        this.errors.password_error = this.$t('password.required')
        }
      else if (this.password.length <= 8){
        this.errors.password_error = this.$t('password.lenght')
      }
      if(!this.errors.username_error && !this.errors.password_error){
        this.loading = true
        if(this.dialog){
          this.loading_otp = true
        }
        axios.post('login/',{'username':this.username,'password':this.password,'otp':this.otp})
            .then(response=>{
              if (this.dialog){
                this.loading_otp = false
                this.dialog = false
                this.loading=false
              }
              this.userStore.setToken(response.data)
              axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.access;
              router.push('home')
              this.get_me()
            }).catch(error=>{
             this.loading=false
              if (error.response.data['required_otp']){
                this.dialog = true
              }
              if (error.response.data['invalid_otp']){
                this.loading_otp = false
                this.toast.error('Invalid OTP')
              }
              console.log()
              this.errors.password_error = error.response.data.detail
        })
        }
    },
    async SendEmail(){
      if (!this.email){
        this.email_notification.msg = this.$t('email.required')
      }
      else if (!this.email_validate(this.email)){
        this.email_notification.msg = this.$t('email.format')
      }
      else{
        this.loading = true
        await axios.post('user/passwordReset/', {'email':this.email})
            .then(response=>{

              this.email_notification.msg = this.$t('password.change.success')
              this.email_notification.color = "#00897B"
              this.email = ''
              this.loading = false
              setTimeout( ()=>{
                this.step--

              },2000)
            }).catch(error=>{
              console(error)
              this.email_notification.msg = "there is no account belong to this adresse email"
              this.email_notification.color = "surface-variant"
              this.loading = false
            })
      }
    },

  },

  watch:{
    username(newValue){
      if(newValue){
        this.errors.username_error = null
      }
    },
    password(newValue){
      if (newValue.length>=8){
        this.errors.password_error = null
      }
      if(newValue.length<8){
        this.errors.password_error =this.$t('password.lenght')
      }

    }
  }
}
</script>
<style scoped>
.btn {
  background: linear-gradient(107deg, rgb(255, 67, 5) 11.1%, rgb(245, 135, 0) 95.3%);
  color : whitesmoke;
}
</style>