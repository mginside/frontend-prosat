<script setup>
import {ref, watch, watchEffect} from "vue";
import debounce from 'lodash.debounce'
import { useMagicKeys } from '@vueuse/core'
import User from "@/components/search/Search.vue";
import axios from "axios";
const dialog = ref(false)
const search = ref('')
const loading = ref(false)
const { meta, k,e } = useMagicKeys()
const users = ref([])

const showUsers = ref(false)
const showSearIcon = ref(true)
const showNotFoundUsers = ref(false)





watchEffect(()=>{
  if (meta.value && k.value){
    dialog.value = true
  }
  if (meta.value && e.value){
    dialog.value = false
  }
})


const getUser =  ()=>{
  showNotFoundUsers.value = false
  showUsers.value = false
  showSearIcon.value = false
  loading.value = true
      axios.get(`user/search/?search=${search.value}`).then((res)=>{
      users.value = res.data.results
      if (users.value.length){
        loading.value = false
        showSearIcon.value = false
        showNotFoundUsers.value = false
        showUsers.value = true
      }else{
        showNotFoundUsers.value = true
        loading.value = false
        showUsers.value = false

      }




  }).catch((err)=>{
   showNotFoundUsers.value = true
   loading.value = false
  })

}



watch(search,debounce(()=>{
  users.value = []

  getUser()
},700))



</script>

<template>
  <v-dialog
      v-model="dialog"
      activator="parent"
      max-width="580"




  >

    <v-card>
      <v-card-title class="pa-0">

        <v-text-field
            v-model="search"
            placeholder="Search.........."
            prepend-inner-icon="mdi mdi-magnify"
            color="orange"
            ref="input"

        ></v-text-field>


      </v-card-title>

      <v-card-text class="d-flex align-center justify-center">

            <v-progress-circular v-if="loading"
                             :size="70"
                             :width="7"
                             color="orange"
                             indeterminate
        >
        </v-progress-circular>

            <user v-if="showUsers" :users="users"/>







        <v-container v-if="showSearIcon">
       <v-row justify="center" align="center">

           <v-icon size="100" class="font-weight-light" color="grey-lighten-1" icon="mdi mdi-text-box-search"/>

       </v-row>

       <v-row justify="center">

           <span  class="text-teal-darken-2 text-body-2">
          Your search results will appear here
        </span>

       </v-row>
        </v-container>
        <v-container v-if="showNotFoundUsers">
          <v-row justify="center" align="center">

            <v-icon size="100" class="font-weight-light" color="grey-lighten-1" icon="mdi mdi-text-box-search"/>

          </v-row>

          <v-row justify="center">

           <span  class="text-teal-darken-2 text-body-2">
          There is no result please try another word
        </span>

          </v-row>
        </v-container>









      </v-card-text>
      <v-divider/>
      <v-card-actions class="pa-5">
        <v-btn size="small"  variant="outlined"  @click="dialog = false" >Close

          <template v-slot:append>
            <p class="text-teal-darken-2 px-3 py-1 text-grey-lighten-1"><span class="mdi mdi-apple-keyboard-command"></span>+E</p>

          </template>
        </v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<style scoped>
.v-dialog{
  align-items: flex-start;

  padding-top: 40px;
}
</style>