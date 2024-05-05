<script setup>
import {inject} from "vue";
import ChangePassword from "@/components/dashboard/ChangePassword.vue";
import ConnexionLog from "@/components/dashboard/ConnexionLog.vue";
import LoginLogs from "@/components/login/LoginLogs.vue";
import DoubleAuthentification from "@/components/login/DoubleAuthentification.vue";
import GeneralRules from "@/components/login/GeneralRules.vue";

const drawer = inject("rightdrawer")
</script>

<template>
<v-navigation-drawer  location="right" v-model="drawer" disable-resize-watcher>
<v-list-item><v-icon color="grey" @click="drawer=false">mdi mdi-window-close</v-icon></v-list-item>
<v-list-item>
  <v-card>
    <v-card-title class="text-center">Securite</v-card-title>
    <v-card-text>
      <ChangePassword/>
      <LoginLogs/>
      <GeneralRules/>
    </v-card-text>
  </v-card>
  <v-divider></v-divider>
</v-list-item>
</v-navigation-drawer>
</template>

<style scoped>

</style>