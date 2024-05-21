<script setup>
import { useUserStore } from '@/stores/user';
const store = useUserStore()
</script>
<template>
  <v-card

      

      
      rounded="xl opactiy-1"
      variant="text"
      class="mysheet pa-5"
    >
    

     

      <template v-slot:text>
        <div class="text-h6 font-weight-black text-black">Total Balance</div>
        <div class="text-h4 font-weight-black text-black">{{store.getBalance}} Credits</div>
        <div class="d-flex justify-space-between mt-4">
          <v-btn rounded="">Send</v-btn>
          <v-btn rounded="">Receive</v-btn>
        </div>
        <div class="d-flex justify-space-between align-center overflow-x-auto mt-5">
            <v-sheet  class="bg-dark d-block pa-5 rounded-xl mr-10" min-width="250">
                <v-avatar class="mb-15" image="da.svg.png"></v-avatar>
                <div class="h6 text-caption">Total dinar</div>
                <h1>1500000</h1>
            </v-sheet>
            <v-sheet class="bg-dark d-block pa-5 rounded-xl mr-10" min-width="250">
                <v-avatar class="mb-15" image="euro.svg.png"></v-avatar>
                <div class="h6 text-caption">Total EUro</div>
                <h1>1500</h1>
            </v-sheet>
            <v-sheet class="bg-dark d-block pa-5 rounded-xl mr-10" min-width="250">
                <v-avatar class="mb-15" image="usd.svg.png"></v-avatar>
                <div class="h6 text-caption">Total USD</div>
                <h1>800</h1>
            </v-sheet>
        </div>
        
        

    
      </template>
    </v-card>
</template>



<style lang="scss" scoped>
.mysheet {
    background: radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%),
                radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%);
}
</style>