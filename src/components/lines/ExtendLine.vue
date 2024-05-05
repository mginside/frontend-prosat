<script setup>
import {computed, inject, ref} from "vue";
import {useUserStore} from "@/stores/user";
import axios from "axios";

const emit = defineEmits(['RefreshLine'])
const props = defineProps(['item','extend'])
const dialog = ref(inject('extend_popup'))
const select = ref(null)
const message = ref('')
const store = useUserStore()

const getPackageCost = computed(()=>{
  return props.extend.find(obj=> obj.id === select.value).official_credits
})

const reminingCredit = computed(()=>{
  return store.getBalance - getPackageCost.value
})

const submitForm = async ()=>{
  if(select.value){
    const data = {
      'packageId':select.value,
      'lindeId': props.item.id
    }

   await axios.post('line/extend/',data).then((res)=>{
      message.value = res.data.message
      emit('RefreshLine')
      setTimeout(() => {
        dialog.value=false
        message.value=''
        select.value=null

      }, 700);


    }).catch((err)=>{
      console.log(err)
    })

  }
  else{
    message.value='Please Select a Pakacge'
  }
}


</script>

<template>
<v-dialog v-model="dialog" max-width="500">
  <v-card class="pa-5">
    <v-alert v-if="message" color="success" :text="message"/>
    <v-card-item>
    <v-card-title>
      Extend Active Code
      <v-card-subtitle>
        {{item.username}}
      </v-card-subtitle>
    </v-card-title>
    </v-card-item>
  <v-card-text>

    <v-form>

      <v-select v-model="select" :items="extend" item-value="id" item-title="package_name"  variant="underlined">


      </v-select>
      <v-row class="pa-5" v-if="select">
        <v-col>
          <v-sheet>
            <h5 class="text-teal-darken-2">package cost : {{ getPackageCost }}</h5>

          </v-sheet>
        </v-col>
        <v-col>
          <h5 class="text-teal-darken-2">remining credit : {{reminingCredit}}</h5>

        </v-col>
      </v-row>



    </v-form>
  </v-card-text>
  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn @click="dialog=false">Close</v-btn>
    <v-btn @click="submitForm" color="success">Extend</v-btn>
  </v-card-actions>

  </v-card>
</v-dialog>
</template>

<style scoped>
.v-dialog {
  align-items: flex-start;
  margin-top: 50px;


}
</style>