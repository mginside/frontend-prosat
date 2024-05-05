<script setup>
import {computed, inject, onBeforeMount, provide, ref, watch} from "vue";
import searchbar from '@/components/navigation/SearchBar.vue'
import {useTheme} from "vuetify";

const switcher = ref()

const theme = useTheme()
const drawer = inject('rightdrawer')

const usedIcon = computed(()=>{
  if(drawer){
    return 'mdi mdi-cog-outline'
  }
  return 'mdi mdi-window-close'
})




watch(switcher,()=>{
  theme.global.name.value = switcher.value ? 'dark' : 'light'
  if (switcher.value){
    localStorage.setItem('theme','dark')
  }else{
    localStorage.setItem('theme','light')
  }



})
onBeforeMount(()=>{
  switcher.value = localStorage.getItem('theme') === 'dark' ? true : false
})
</script>

<template>

  <v-app-bar>
    <v-app-bar-nav-icon @click="$emit('drawerEvent')"></v-app-bar-nav-icon>

    <v-app-bar-title>
      <v-btn
          prepend-icon="mdi mdi-magnify"

      >
        <searchbar/>
        <template v-slot:prepend>
          <v-icon color="grey"></v-icon>
        </template>

        Search

          <template v-slot:append>
            <p  class="px-3 py-1 text-grey-lighten-1"><span class="mdi mdi-apple-keyboard-command"></span>+K</p>
          </template>



      </v-btn>

    </v-app-bar-title>


<template v-slot:append>
  <v-switch class="pt-5"
            v-model="switcher"

            true-icon="mdi mdi-weather-night"
            false-icon="mdi mdi-white-balance-sunny"
            inset>



  </v-switch>

  <v-btn color="grey" :icon="usedIcon" class="pl-2 pr-2"  @click="$emit('openrightdrawer')"/>
  
</template>

  </v-app-bar>

</template>

<style scoped>

</style>