<script setup>
import {useUserStore} from "@/stores/user";
const store = useUserStore()
const props = defineProps(['users'])

</script>

<template>
  <v-card
      title="Users"
      width="500px"

  >
  <v-card-text>



   <v-list  density="compact" nav>
     <v-list-item v-for="user in props.users" :title="user.username" prepend-icon="mdi-account">
       <template v-slot:append>
         <v-btn
             color="grey-lighten-1"
             icon="mdi-information"
             variant="text"
         ></v-btn>
         <v-menu>
           <template v-slot:activator="{props}">
           <v-btn
               color="grey-lighten-1"
               icon="mdi-dots-vertical"
               variant="text"
               v-bind="props"
           ></v-btn>
           </template>
           <v-list>
             <v-list-item @click="store.openEditForm"  append-icon="mdi-pencil">
               <v-list-item-title>edit</v-list-item-title>

             </v-list-item>
             <v-list-item append-icon="mdi-pencil">
               <v-list-item-title>topup</v-list-item-title>

             </v-list-item>
             <v-list-item append-icon="mdi-account">
               <v-list-item-title>resellers</v-list-item-title>

             </v-list-item>
           </v-list>
         </v-menu>

       </template>
     </v-list-item>

   </v-list>

  </v-card-text>

  </v-card>
</template>

<style scoped>

</style>