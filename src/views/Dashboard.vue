<script setup>
import ResellerCard from "@/components/dashboard/GeneralCard.vue";
import BalanceDetail from "@/components/dashboard/BalanceDetail.vue";
import {onMounted,ref} from "vue";
import axios from "axios";


import {useUserStore} from "@/stores/user";

const data = ref(0)
const store = useUserStore()

const get_totaluser = async ()=>{
  await axios.get('analytic/count').then((res)=>{
    data.value = res.data

  }).catch((err)=>{

  })

}
onMounted(()=>{
get_totaluser()
})

</script>

<template>
  <v-container fluid>
  <v-row align="start" justify="start" no-gutters wrap>
  <v-col  md="6" sm="12">
    <BalanceDetail/>
  </v-col>
  <v-col xs="12" md="2"  sm="12" >
    <ResellerCard title="TOTAL RESELLER" :total="data.total_reseller" icon="mdi mdi-account"/>
    <ResellerCard title="ONLINE USER" :total="data.total_online_line" icon="mdi mdi-television-box"/>
  </v-col>

  <v-col xs="12" md="2" sm="12" >
    <ResellerCard title="SELLING PER DAY" :total="data.total_selling_per_day" icon="mdi mdi-television-box"/>
    <ResellerCard title="MAG DEVICE" :total="data.total_active_mag" icon="mdi mdi-router-wireless"/>

  </v-col>
  <v-col xs="12" md="2"  sm="12" >
    <ResellerCard title="TRIAL PER DAY" :total="data.total_trial_per_day" icon="mdi mdi-router-wireless"/>

  </v-col>
  
 
  
  </v-row>




  </v-container>

</template>

<style scoped>

</style>