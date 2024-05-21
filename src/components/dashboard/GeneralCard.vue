<script setup>
const props = defineProps(['title','icon','total'])
</script>

<template>
  <v-container>
    <v-card
      border="opacity-50 sm"

      class="text-center"
      
      rounded="xl"
   
    >
      <template v-slot:title>
        <div class="text-caption font-weight-bold">{{title}}</div>
      </template>

     

      <template v-slot:text>
        <div class="text-h4 font-weight-black">
          <span :class="icon"></span>
          <small class="text-caption text-medium-emphasis ">
          <div>
            <span class="text-green text-h5 text-right">
              
              {{total}}
            </span>

           
          </div>

          
        </small>
        </div>

        
      </template>
    </v-card>
  </v-container>
</template>


<style scoped>

</style>