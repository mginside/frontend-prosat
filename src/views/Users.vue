<script setup>
import {onMounted, provide, ref, watch} from "vue";
import axios from "axios";
import TopUp from "@/components/reseller/TopUp.vue";
import EditReseller from "@/components/reseller/EditReseller.vue";
import Disable from "@/components/reseller/Disable.vue";
import AddUser from "./AddUser.vue";
import debounce from 'lodash.debounce';



const users = ref()
const totalItems = ref(0)
const ItemsPerPage = ref(5)
const search = ref('')
const page = ref(1)
const TopUpForm = ref(false)
const EditForm = ref(false)
const AddForm = ref(false)
const Disableform=ref(false)
const reseller = ref()
provide('topup',TopUpForm)
provide('edit',EditForm)
provide('dialog',AddForm)
provide('disable',Disableform)

const addUser = ()=>{
  AddForm.value=true

}
const DisableUser = (item)=>{
  Disableform.value = true
  reseller.value = item
}
const UserAdded = ()=>{
  search.value=""
  loaddata()
}
const topUp = (item)=>{
    reseller.value = item
    TopUpForm.value = true
}
const editform = (item)=>{
  reseller.value = item
  EditForm.value = true
}


const Edit = (item)=>{
  reseller.value = item
  EditForm.value = true
}
const closeEdit = ()=>{
  EditForm.value = false
}

const headers = ref([

  { key: 'username', title: 'Username'},
  { key: 'date', title: 'Created At' },
  {key:'is_active',title: 'Status'},
  { key: 'credits', title: 'Credits' },
  
  { key: 'ip', title: 'Ip adresse' },
  { key: 'last_login', title: 'Last Connexion' },
  { title: 'Actions', key: 'actions', sortable: false },

])
const loading = ref(false)

const loaddata = async ()=>{


  loading.value = true

   await axios.get(`users/?page=${page.value}&search=${search.value}&page_size=${ItemsPerPage.value}`).then(res=>{

    users.value = res.data.results
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
  <TopUp @reload_data="loaddata" @closeTopUp="TopUpForm=false" :popup="TopUpForm" :item="reseller"/>
  <EditReseller :item="reseller"/>
  <AddUser @reload="UserAdded"/>
  <Disable :disable="Disableform" :item="reseller" @reload="loaddata"/>



  <v-data-table-server

      v-model:items-per-page="ItemsPerPage"
      :headers="headers"
      :items="users"
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
          prepend-icon="mdi mdi-plus-circle"
          @click:prepend="addUser"
      >
     
      </v-text-field>
      </KeepAlive>
      
    </template>

    <template v-slot:item.is_active="{item}">
      <v-icon icon="mdi mdi-check-circle" :color="item.is_active ? 'success' : 'red'"/>
    </template>

    <template v-slot:item.actions="{item}">


        <v-menu>
          <template v-slot:activator="{ props }">
            <v-icon icon="mdi-dots-vertical" v-bind="props"></v-icon>
          </template>
          <v-list>
            <v-list-item append-icon="mdi mdi-pencil-outline" :key="item.id" @click="editform(item)">
              Edit
            </v-list-item>
            <v-list-item append-icon="mdi mdi-bank-transfer-out" :key="item.id" @click="topUp(item)">
              Topup
            </v-list-item>
         
            <v-list-item :append-icon="item.is_active?'mdi mdi-account-cancel-outline':'mdi mdi-account-check'" :key="item.id" @click="DisableUser(item)">
              {{item.is_active?'Block':'Unblock'}}
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
