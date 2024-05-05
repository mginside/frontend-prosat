<script setup>
import {reactive, ref} from "vue";
import axios from "axios";

const success_message = ref(false)
const dialog = ref(false)
const rules = reactive({})


const loadRule = async ()=>{
 await axios.get('security/rule/').then((res)=>{
    rules.value = res.data

    dialog.value = true
    console.log(rules.value)

  }).catch((err)=>{
    console.log(err)
  })
}

const updateRule = async ()=>{
  await axios.put('security/rule/',rules.value).then((res)=>{
    success_message.value = true
    setTimeout(()=>{
      success_message.value = false
      dialog.value = false
      console.log(res.status)
    },1100)
  }).catch((err)=>{
    console.log(err)
  })


}



</script>

<template>
  <v-list-item item-title="Security Rules" @click="loadRule">
    Security Rules
    <template v-slot:append>
      <span class="mdi mdi-security mdi-18px text-green"></span>
    </template>
  </v-list-item>
   <v-dialog  v-model="dialog" max-width="700">
     <v-card class="mx-auto pa-5" width="400">
       <v-alert v-if="success_message" color="success" text="Data updated with success"></v-alert>
      <v-list>
        <v-list-subheader>Authentification

        </v-list-subheader>

        <v-list-item  title="Enable 2FA">
        <template v-slot:append>
        <v-switch color="success" v-model="rules.value.enable_2fa" class="myown" hide-details/>

        </template>

        </v-list-item>


        <v-divider></v-divider>
        <v-list-subheader>Credits Transfer</v-list-subheader>
        <v-list-item  title="Allow Credit Transfer" @click="">
          <template v-slot:append>
            <v-switch color="success" v-model="rules.value.allow_credit_transfer" class="myown"/>
          </template>

        </v-list-item>
        <v-divider></v-divider>
        <v-list-subheader>Active Code Generation

        </v-list-subheader>
        <v-list-item title="Allow Bulk Generation" @click="">
          <template v-slot:append>
            <v-switch color="success" v-model="rules.value.allow_generate_bulk" class="myown"/>
          </template>

        </v-list-item>
        <v-list-item title="Allow List Download" @click="">
          <template v-slot:append>
            <v-switch color="success" v-model="rules.value.allow_download_list" class="myown"/>
          </template>

        </v-list-item>
        <v-list-item title="Allow Reset Active Code" @click="">
          <template v-slot:append>
            <v-switch color="success" v-model="rules.value.allow_reset_code" class="myown"/>
          </template>

        </v-list-item>
        <v-divider></v-divider>
        <v-list-subheader>Resellers Management</v-list-subheader>
        <v-list-item title="Allow Delete Reseller" @click="">
          <template v-slot:append>
            <v-switch color="success" v-model="rules.value.allow_delete_reseller" class="myown"/>
          </template>

        </v-list-item>



      </v-list>
       <v-card-actions>
         <v-spacer></v-spacer>
         <v-btn @click="dialog=false">Close</v-btn>
         <v-btn color="success" @click="updateRule">Save</v-btn>
       </v-card-actions>
     </v-card>
   </v-dialog>

</template>

<style scoped>
.myown{
  display: flex;
  height: 20px;
  align-items: center;
}
.v-dialog{
  align-items: flex-start;
  margin-top: 50px;

}

</style>