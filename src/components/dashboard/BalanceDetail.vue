<script setup>
import {useTheme} from "vuetify";
import { useUserStore } from '@/stores/user';
import {computed} from "vue";
const theme = useTheme()
const store = useUserStore()
const balanceColor = computed(()=>{
  if(theme.global.name.value === 'light'){
    return 'blueone pa-5'
  }
  if(theme.global.name.value === 'dark'){
    return 'mygold pa-5'
  }
})
</script>
<template>
  <v-card
      rounded="xl opactiy-1"
      variant="text"
      :class="balanceColor"
    >
    

     

      <template v-slot:text>
        <div class="text-h6">Total Balance</div>
        <div class="text-h4">{{store.getBalance}} Credits</div>
        <div class="d-flex justify-space-between mt-4">
          <v-btn rounded="">Send</v-btn>
          <v-btn rounded="">Receive</v-btn>
        </div>
        <div class="d-flex justify-space-between align-center overflow-x-auto mt-5">
            <v-sheet  class="d-block pa-5 rounded-xl mr-10 " min-width="250">
                <v-avatar class="mb-15" image="da.svg.png"></v-avatar>
                <div class="h6 text-caption">Total dinar</div>
                <h1>1500000</h1>
            </v-sheet>
            <v-sheet class="d-block pa-5 rounded-xl mr-10" min-width="250">
                <v-avatar class="mb-15" image="euro.svg.png"></v-avatar>
                <div class="h6 text-caption">Total EUro</div>
                <h1>1500</h1>
            </v-sheet>
            <v-sheet class="d-block pa-5 rounded-xl mr-10" min-width="250">
                <v-avatar class="mb-15" image="usd.svg.png"></v-avatar>
                <div class="h6 text-caption">Total USD</div>
                <h1>800</h1>
            </v-sheet>
        </div>
        
        

    
      </template>
    </v-card>
</template>



<style lang="scss" scoped>
.mygold {
  background: radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%),
  radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%);
  color: black;
}
.blueone {

  background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898;
  color: whitesmoke;




}
</style>