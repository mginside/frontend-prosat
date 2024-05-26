<script setup>

import {useUserStore} from "@/stores/user";
import {computed, inject, ref} from "vue";
import GenerateCode from "@/components/dialogs/GenerateCode.vue";
import {useTheme} from "vuetify";
const theme = useTheme()
const store = useUserStore()

const drawer = ref(inject("drawer"))
const colorSidebar = computed(()=>{
  if (theme.global.name.value === 'light'){
    return 'mysidebar'

  }
})


</script>

<template>
  <v-navigation-drawer v-model="drawer" :class="colorSidebar" location="start">
   <v-sheet  class="text-center font-weight-thin" elevation="3">
    <div class="pa-4">
      <p>Welcome <small class="text-deep-orange-darken-3">{{ store.getUsername }}</small></p>
    </div>


   </v-sheet>





    <v-list nav>

      <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" value="dashboard" to="/home" exact></v-list-item>
      <v-list-subheader class="text-white">Manage Resellers</v-list-subheader>
     
      <v-list-item prepend-icon="mdi mdi-account-group" title="Resellers" value="user-list" to="/users" exact></v-list-item>
      <v-list-subheader class="text-white" active="false">Manage Active Code</v-list-subheader>
      <GenerateCode/>



      <v-list-item prepend-icon="mdi mdi-television" title="Active Codes" value="used-code" to="/active-lines" exact></v-list-item>
      <v-list-item prepend-icon="mdi mdi-format-list-numbered-rtl" title="Active Code Bulk" value="not-used-list" to="/bulk-list" exact></v-list-item>
      <v-list-subheader class="text-white">Manage Lines</v-list-subheader>
      <v-list-item prepend-icon="mdi mdi-account-group" title="Lines" value="lines" to="/lines" exact></v-list-item>
      <v-list-item prepend-icon="mdi mdi-television-box" title="Online Lines" value="online" to="/online" exact></v-list-item>
      <v-list-subheader class="text-white">Manage Mag</v-list-subheader>
      <v-list-item prepend-icon="mdi mdi-router-wireless" title="Mag List" value="mag" to="" exact></v-list-item>





    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn @click="store.logout()" block>
          Logout
        </v-btn>
      </div>
    </template>


  </v-navigation-drawer>
</template>

<style scoped>
/* From https://css.glass */
.mysidebar {
  background: linear-gradient(107deg, rgb(255, 67, 5) 11.1%, rgb(245, 135, 0) 95.3%);
  color : whitesmoke;
}
</style>