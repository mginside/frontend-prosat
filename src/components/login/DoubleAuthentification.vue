<script setup>

</script>

<template>

  <v-list-item item-title="Change Paswword">

    <v-switch
              :model-value="true"
              color="success"
              label="ON"
    >
      <template v-slot:prepend>
        <span class="mdi mdi-two-factor-authentication mdi-36px text-green-lighten-1"></span>
      </template>
    </v-switch>

  </v-list-item>


</template>

<style scoped>

</style>