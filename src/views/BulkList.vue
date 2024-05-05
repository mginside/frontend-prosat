<script setup>
import {onMounted, provide, ref, watch} from "vue";

import axios from "axios";
import BulkListShow from "../components/lines/BulkListShow.vue";


const bulk_list = ref()
const active_codes = ref()
const totalItems = ref(0)
const ItemsPerPage = ref(5)
const search = ref('')
const page = ref(1)
const dialog = ref(null)


provide('dialog',dialog)

const headers = ref([

  { key: 'package_name', title: 'Package Name'},
  {key:'quantity',title: 'Quantity'},
  {key:'list_name',title: 'List Name'},
  {key:'created',title: 'Created At'},
  { title: 'Actions', key: 'actions', sortable: false },

])
const loading = ref(false)

const showList = (id)=>{
    active_codes.value =''
    axios.get(`line/list/${id}`).then((res)=>{
    
    res.data.forEach(element => {
        console.log(element.username)
        active_codes.value+=element.username+'\n'
    });
    dialog.value=true

    }).catch((err)=>{
        console.log(err)
    })
}

const loaddata = async ()=>{


  loading.value = true

  await axios.get(`line/bulk/list/?page=${page.value}&search=${search.value}&page_size=${ItemsPerPage.value}`).then(res=>{

    bulk_list.value = res.data.results
    totalItems.value = res.data.count
    loading.value = false

  }).catch(err=>{
    console.log(err)
  })

}

watch(search,()=>{
  loaddata()
})

onMounted(()=>{
  loaddata()



})






</script>

<template>

<BulkListShow :codes="active_codes" :dialog="dialog"/>


  <v-data-table-server

      v-model:items-per-page="ItemsPerPage"
      :headers="headers"
      :items="bulk_list"
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
        ></v-text-field>
      </KeepAlive>
    </template>


    <template v-slot:item.actions="{item}">
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-icon icon="mdi-dots-vertical" v-bind="props"></v-icon>
        </template>
        <v-list>
          <v-list-item @click="showList(item.id)" append-icon="mdi mdi-eye">
            Show List {{ item.id }}
          </v-list-item>
     
        </v-list>
      </v-menu>
    </template>


  </v-data-table-server>

</template>

<style scoped>
span {
  cursor: pointer;
}

</style>
