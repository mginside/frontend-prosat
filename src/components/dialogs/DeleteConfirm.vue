<template>
  <div class="text-center pa-4">
    <v-dialog
        v-model="dialog"
        max-width="400"
        persistent
    >


      <v-card
          prepend-icon="mdi-map-marker"
          text="Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running."
          title="Use Google's location service?"
      >
        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn @click="dialog = false">
            Disagree
          </v-btn>

          <v-btn @click="dialog = false">
            Agree
          </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup>
const props = defineProps(['dialog','user'])
const dialog = props.dialog
const user = props.user
console.log(user)


</script>