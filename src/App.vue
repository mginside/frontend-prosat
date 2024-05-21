<script setup>
import {RouterView} from "vue-router";
import {useUserStore} from "@/stores/user";
import {onBeforeMount, ref, provide} from "vue";
import axios from "axios";


import Sidebar from "@/components/navigation/SideBar.vue";
import Appbar from "@/components/navigation/AppBar.vue";
import Rightsidebar from "@/components/navigation/RightSidebar.vue";






const drawer = ref(true)
const rightdrawer = ref(false)
const userStore = useUserStore()

provide('drawer',drawer)
provide('rightdrawer',rightdrawer)


  onBeforeMount(()=>{
  userStore.initStore()
  const token = userStore.user.access
  if(token){
     axios.defaults.headers.common["Authorization"] = "Bearer " + token;
     axios.get('me/')
        .then(res=>{
          userStore.setUserInfo(res.data)


        }).catch(err=>{
      
          userStore.logout()
    })


  }else{
    axios.defaults.headers.common["Authorization"] = "";


  }
})




</script>
<template>


 <v-app id="inspire1">
    <Sidebar v-if="userStore.user.isAuthenticated"/>
    <rightsidebar v-if="userStore.user.isAuthenticated"/>
    <Appbar v-if="userStore.user.isAuthenticated" @drawerEvent="drawer = !drawer" @openrightdrawer="rightdrawer=!rightdrawer"/>
   


 <v-main>
   <v-container fluid>
     <RouterView/>

   </v-container>





 </v-main>

 </v-app>
</template>
<style>


.v-dialog{
  align-items: flex-start !important;
  margin-top: 50px !important;

}
</style>