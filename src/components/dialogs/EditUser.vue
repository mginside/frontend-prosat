
<script setup>
import {ref, watch} from "vue";
import {useUserStore} from "@/stores/user";
const props = defineProps('edit')


</script>

<template>
  <v-dialog max-width="800" v-model="dialog">

      <v-card height="800">
        <v-tabs
            v-model="tab"
            bg-color="orange"
        >
          <v-tab value="one">Users Info</v-tab>
          <v-tab value="two">Password</v-tab>
          <v-tab value="three">Users </v-tab>
        </v-tabs>
        <v-card-text>
          <v-window v-model="tab">
            <v-window-item value="one">
              One
            </v-window-item>

            <v-window-item value="two">
              Two
            </v-window-item>

            <v-window-item value="three">
              Three
            </v-window-item>
          </v-window>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
              text="Close Dialog"
              @click="isActive = false"
          ></v-btn>
        </v-card-actions>
      </v-card>

  </v-dialog>

</template>

<style scoped>

</style>