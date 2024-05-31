<script setup>
import {onMounted, watch, provide, ref, computed} from "vue";
import axios from "axios";
import CountryFlag from 'vue-country-flag-next';
import debounce from 'lodash.debounce';
import ChangePasswordReseller from "@/components/reseller/ChangePasswordReseller.vue";
import TimerUp from "@/components/lines/TimerUp.vue";
const items = ref()
const totalItems = ref(0)
const ItemsPerPage = ref(5)
const search = ref('')
const page = ref(1)
const timer = ref()


const headers = ref([
  { key: 'active_code', title: 'Active Code'},
  { key: 'stream', title: 'Channel'},
  { key: 'user_ip', title: 'Ip' },
  { key: 'time', title: 'Duration',align:'center' },
  { key:'user_agent',title:'Application'},
  { key:'actions',title:'Actions'}
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
      <TimerUp :total_seconds="item.time"/>
    </template>
    <template v-slot:item.stream="{item}">
    {{ item.stream.steam_name }}
    </template>
    <template v-slot:item.user_ip="{item}">
      <div class="d-flex align-center"><CountryFlag :country="item.geoip_country_code" class="mr-1" size='normal'/> {{ item.user_ip }}</div>
    </template>
    <template v-slot:item.actions="{item}">
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-icon icon="mdi-dots-vertical" v-bind="props"></v-icon>
        </template>
        <v-list>
          <v-list-item append-icon="mdi mdi-lan-disconnect">
            Kill Connexion
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
