<script setup>
import {onMounted,watch, provide, ref} from "vue";
import axios from "axios";


import debounce from 'lodash.debounce';
import ChangePasswordReseller from "@/components/reseller/ChangePasswordReseller.vue";



const items = ref()
const totalItems = ref(0)
const ItemsPerPage = ref(5)
const search = ref('')
const page = ref(1)














const headers = ref([

  { key: 'active_code', title: 'Active Code'},
  { key: 'stream', title: 'Channel'},
  { key: 'user_ip', title: 'Ip' },
  { key: 'time', title: 'Duration' },
  {key:'user_agent',title:'Application'}
  

])
const loading = ref(false)

const loaddata = async ()=>{


  loading.value = true

   await axios.get(`line/online`).then(res=>{

    items.value = res.data.results
    totalItems.value = res.data.count
    loading.value = false



  }).catch(err=>{
    console.log(err)
  })

}

watch(search,debounce(()=>{


  loaddata()
},700))

onMounted(()=>{
  loaddata()


})




</script>

<template>
  
  <ChangePasswordReseller :item="reseller"/>



  <v-data-table-server

      v-model:items-per-page="ItemsPerPage"
      :headers="headers"
      :items="items"
      :items-length="totalItems"
      :loading="loading"



      class="elevation-3"
      v-model:page="page"
      show-current-page
      @update:itemsPerPage="loaddata"
      @update:page="loaddata"
      hover
  >

    <template v-slot:top>
      <KeepAlive>
      <v-text-field
          v-model="search"
          class="pa-2"
          label="search......"
      >
     
      </v-text-field>
      </KeepAlive>
      
    </template>
    <template v-slot:item.time="{item}">
      
    </template>
  </v-data-table-server>

</template>

<style scoped>
span {
  cursor: pointer;
}

</style>
