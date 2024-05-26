<script setup>
import {ref} from "vue";
import getCountryFlag from "country-flag-icons/unicode";
import axios from "axios";

const itemsperpageoptions = ref([
  {value: 10, title: '10'},
  {value: 25, title: '25'},
  {value: 50, title: '50'},
  {value: 100, title: '100'}

])

const logins = ref([])
const page = ref(1)
const itemsPerPage = ref(5)

const totalItems = ref(3)
const headers = ref([
  { title: 'IP', key: 'login_ip', align: 'start' },
  { title: 'DATE', key: 'date', align: 'start',sortable: true },
  { title: 'STATUS', key: 'status'},

])
const loading = ref(false)
const dialog = ref(false)
const getloginlogs = ()=>{
  loading.value = true
  axios.get(`user/loginlogs/?page=${page.value}&page_size=${itemsPerPage.value}`).then((res)=>{
    totalItems.value = res.data.count

    logins.value = res.data.results
    loading.value = false
  }).catch((err)=>{
    console.log(err)
  })
}

const openmodel = ()=>{
  dialog.value = true
  getloginlogs()

}

const date_changer = (item)=>{

  let data = item.split(' ')
  return data

}




</script>

<template>

  <v-list-item item-title="Change Paswword" @click="openmodel">
    Connexion Logs
    <template v-slot:append>
      <span class="mdi mdi-login-variant"></span>
    </template>
  </v-list-item>

  <v-dialog v-model="dialog"  width="auto" scrollable>


      <v-data-table-server
          density="comfortable"
          class="pa-10 overflow-y-auto"
          show-current-page="true"
          :items-per-page-options="itemsperpageoptions"
          v-model:items-per-page="itemsPerPage"
          v-model:page="page"
          :headers="headers"
          :items="logins"
          :items-length="totalItems"
          @update:page="getloginlogs"
          @update:itemsPerPage="getloginlogs"
          :loading="loading"


      >
        <template v-slot:item.login_ip="{ item }">
          <div class="text-start">
            {{getCountryFlag(item.country_code !== null ? item.country_code : 'DZ')}}
            {{item.login_ip}}
          </div>
        </template>
        <template v-slot:item.date="{item}">
          {{date_changer(item.date)[0]}}
          <span :class="item.status === 'SUCCESS' ?'text-green-lighten-1':'text-red-lighten-1'
">{{date_changer(item.date)[1]}}</span>
        </template>

        <template v-slot:item.status="{ item }">
          <div class="text-start">
            <v-chip
                :color="item.status === 'SUCCESS' ? 'green' : 'red'"
                :text="item.status"
                class="text-uppercase"
                size="small"
                label
            ></v-chip>

          </div>
        </template>

      </v-data-table-server>



  </v-dialog>
</template>

<style scoped>

</style>