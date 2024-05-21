<script setup>
import axios from 'axios';
import { useMagicKeys } from '@vueuse/core';
import { useToast } from "vue-toastification";
import { ref,inject } from 'vue';
const dialog = ref(inject('change_password_popup'))
const props = defineProps(['item'])
const display_password = ref(false)
const display_confirm_password = ref(false)
const new_password = ref()
const confirm_password = ref()
const form = ref()
const toast = useToast()
const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
const passwordRules = ref([
    v=>!!v || 'password are required',
    v=> v.length > 8 || 'password must contain at least 8 characters',
    v=> v.length < 32 || 'password max lenght is 32 characters',
    v=> passwordRegex.test(v) || 'password must contain at least  1-9  A-Z a-z @/*_ '
])
const passwordConfirmrules = ref([
    v=>!!v || 'password are required',
    v=> v.length > 8 || 'password must contain at least 8 characters',
    
    v=> v === new_password.value || 'password and password confirm not matching'
])

const submitForm = async ()=>{
    await form.value.validate()
    if(form.value.isValid)
    {
        await axios.put(`user/changePasswordReseller/${props.item.id}/`,{'new_password':new_password.value,'confirm_password':confirm_password.value}).then(
            res =>{
               form.value.reset()
               dialog.value=false
               toast.success('Password updated with success',{
                timeout:1000
               })

            }
        ).catch(err=>{
            console.log(err)
        })
    }
}



</script>
<template>
    <v-dialog v-model="dialog" max-width="500">
          <v-card class="pa-3">
            <v-card-item>
                <v-card-title>
                    Password change
                    <v-card-subtitle>
                        for {{ item.username }}
                    </v-card-subtitle>
                </v-card-title>
            </v-card-item>
            <v-card-text>
                <v-form @submit.prevent="submitForm" ref="form">
                    <v-text-field v-model="new_password" :rules="passwordRules" @click:appendInner="display_password = !display_password" :type="display_password ? 'text': 'password' " variant="underlined" label="New password" :append-inner-icon="display_password ? 'mdi mdi-eye-outline' : 'mdi mdi-eye-off' "/>
                    <v-text-field v-model="confirm_password" :rules="passwordConfirmrules" @click:appendInner="display_confirm_password = !display_confirm_password" :type="display_confirm_password ? 'text': 'password' " variant="underlined" label="Confirm password" :append-inner-icon="display_confirm_password ? 'mdi mdi-eye-outline' : 'mdi mdi-eye-off' "/>
                </v-form>
            </v-card-text>
            <v-card-actions class="mt-5">
                <v-btn @click="dialog=!dialog">Close</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="form.reset()" color="warning">Reset</v-btn>
            <v-btn type="submit" @click="submitForm" color="success">Update</v-btn>
            
            </v-card-actions>
          </v-card>

    </v-dialog>
</template>



<style lang="scss" scoped>

</style>