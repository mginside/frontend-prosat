<script setup>
const props = defineProps(['errors'])
</script>

<template>
  <v-card v-if="errors.password_error || errors.username_error"
          class="mb-10"
          color="surface-variant"
          variant="tonal"


  >
    <v-card-text class="text-medium-emphasis text-caption" >
      <p v-if="errors.password_error">{{errors.password_error}}</p>
      <p v-if="errors.username_error">{{errors.username_error}}</p>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>