<script setup>
import {onMounted, provide, ref, watch} from "vue";
import debounce from 'lodash.debounce';
import axios from "axios";
import ExtendLine from "@/components/lines/ExtendLine.vue";
import {useUserStore} from "@/stores/user";
import EditLine from "@/components/lines/EditLine.vue";
import Enable from "@/components/lines/Enable.vue";
import Reset from "@/components/lines/Reset.vue";
import M3u from "@/components/lines/M3u.vue";
import Refund from "@/components/lines/Refund.vue";


const lines = ref()
const totalItems = ref(0)
const ItemsPerPage = ref(5)
const search = ref('')
const page = ref(1)
const packages = ref()
const extend_packages = ref()
const extend_popup=ref(null)
const edit_popup = ref(null)
const enable_popup=ref(null)
const line = ref()
const editeditem = ref()
const disabledline = ref()
const reset_popup=ref()
const itemreset = ref()

const m3u_popup = ref(null)
const m3u_item = ref()
const refund_popup = ref(null)
const refund_code = ref()
const store = useUserStore()
provide('extend_popup',extend_popup)
provide('edit_popup',edit_popup)
provide('enable',enable_popup)
provide('reset_popup',reset_popup)
provide('m3u_popup',m3u_popup)
provide('refund_popup',refund_popup)

const extend = (item)=>{
  extend_popup.value = true
  line.value= item
  get_extend_package()

}

const edit=(obj)=>{
  editeditem.value = obj
  edit_popup.value = true
}
const EnableDisable = (item)=>{
  disabledline.value=item
  enable_popup.value=true

}
const reset_code = (item)=>{
  reset_popup.value=true
  itemreset.value=item

}
const after_reset = (event)=>{
  search.value = event.value
  loaddata()
}
const m3u_get = (id)=>{
  m3u_popup.value=true
  m3u_item.value = id
  
}
const refund_action = (item)=>{
  refund_popup.value = true
  refund_code.value=item

}

const get_extend_package = ()=>{
  axios.get('user/packages/extend').then((res)=>{
    extend_packages.value = res.data
    console.log(res.data)

  }).catch((err)=>{
    console.log(err)
  })
}
const get_package = ()=>{
  axios.get(`user/packages/`).then((res)=>{
    packages.value=res.data
  }).catch((err)=>{
    console.log(err)
  })
}




const headers = ref([
  { key: 'has_expired', title: ''},
  { key: 'username', title: 'Username'},
  {key:'password',title:'Password'},
  {key:'is_trial',title: 'is Test'},

 
  {key:'enabled',title:'status'},

  {key:'duration',title: 'Duration'},
  { key: 'created_at', title: 'Created At' },
  {key:'reseller_notes',title: 'Note'},
  { key: 'exp_date', title: 'Expire At' },
  { title: 'Actions', key: 'actions', sortable: false },

])
const loading = ref(false)

const loaddata = async ()=>{


loading.value = true

await axios.get(`line/lines/?page=${page.value}&search=${search.value}&page_size=${ItemsPerPage.value}`).then(res=>{

  lines.value = res.data.results
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
  get_package()


})






</script>

<template>

<ExtendLine :item="line" :extend="extend_packages" @RefreshLine="loaddata"/>
<EditLine :item="editeditem" @RefreshLine="loaddata" />
<Enable :item="disabledline" @reload="loaddata"/>
<Reset :item="itemreset" @reset="after_reset"/>
<M3u :item="m3u_item"/>
<Refund :item="refund_code" @reload="loaddata"/>





  <v-data-table-server

      v-model:items-per-page="ItemsPerPage"
      :headers="headers"
      :items="lines"
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
    <template v-slot:item.is_trial="{item}">
      <v-icon v-if="item.is_trial" color="warning" icon="mdi mdi-circle">

      </v-icon>

    </template>
    <template v-slot:item.enabled="{item}">
      <v-icon :color="item.enabled ? 'success':'red'" icon="mdi mdi-circle">

      </v-icon>

    </template>
    <template v-slot:item.has_expired="{item}">
      
      <span v-if="item.has_expired" class="mdi mdi-timer-off-outline text-red text-h6"></span>
    </template>


    <template v-slot:item.actions="{item}">
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-icon icon="mdi-dots-vertical" v-bind="props"></v-icon>
        </template>
        <v-list>

          <v-list-item v-if="store.getBalance && item.is_trial || item.has_expired" @click="extend(item)"  append-icon="mdi mdi-autorenew">
            Extend
          </v-list-item>
          <v-list-item @click="edit(item)" append-icon="mdi mdi-pencil">
            Edit
          </v-list-item>
          <v-list-item append-icon="mdi mdi-television-box" value="edit-bouquet" :to="'edit-bouquet/'+item.id">
            Edit Bouquet
          </v-list-item>
          <v-list-item @click="m3u_get(item.id)" append-icon="mdi mdi-download" >
            M3u & Extream
          </v-list-item>
          <v-list-item @click="EnableDisable(item)" :append-icon="item.enabled?'mdi mdi-television-off':'mdi mdi-television'">
            {{ item.admin_enabled ? 'Block':'Unblock' }}
          </v-list-item>
          <v-list-item @click="reset_code(item)" append-icon="mdi mdi-reload" >
            Reset
          </v-list-item>
          <v-list-item v-if="!item.is_trial  && !item.is_active && !item.last_ip" @click="refund_action(item)" append-icon="mdi mdi-credit-card-refund-outline" >
            Refund
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
