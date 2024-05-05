<script setup>
const props = defineProps(['email_notification'])

</script>

<template>
  <v-card
          class="mb-10"
          :color="email_notification.color"
          variant="tonal"


  >
    <v-card-text class="text-medium-emphasis text-caption" >
    {{email_notification.msg}}
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>