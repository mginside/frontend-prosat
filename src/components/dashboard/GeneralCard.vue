<script setup>
const props = defineProps(['title','icon','total','bgcolor'])
</script>

<template>
<v-card elevation="2" max-width="250" :color="props.bgcolor">

  <template v-slot:prepend>
    <v-icon :icon="props.icon" size="50"/>
  </template>
<template v-slot:append>
  <p class="text-left font-weight-thin mb-3">{{ title }}</p>
  <h1 class="text-deep-orange text-right">{{total}}</h1>
</template>

</v-card>



</template>

<style scoped>

</style>