<script setup>
import ResellerCard from "@/components/dashboard/GeneralCard.vue";
import {onMounted,ref} from "vue";
import axios from "axios";


import {useUserStore} from "@/stores/user";

const totaluser = ref(0)
const store = useUserStore()

const get_totaluser = async ()=>{
  await axios.get('user/count/').then((res)=>{
    totaluser.value = res.data.total

  }).catch((err)=>{

  })

}
onMounted(()=>{
get_totaluser()
})

</script>

<template>
  <v-container fluid>

  <v-row>
    <v-col>
      <ResellerCard :total="store.getBalance" title="Your balance" icon="mdi mdi-currency-usd" @click=""/>
    </v-col>

    <v-col>
      <ResellerCard :total="totaluser"  title="Total Reseller" icon="md mdi-account"/>

    </v-col>

    <v-col>
      <ResellerCard :total="23" title="Online Line" @reloadtotal="get_totaluser"/>
    </v-col>



  </v-row>



  </v-container>

</template>

<style scoped>

</style>