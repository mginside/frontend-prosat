<script setup>
import {computed,ref, watchEffect} from "vue";
import { useMagicKeys } from '@vueuse/core'
import mitt from "mitt";
import axios from "axios";
import {useUserStore} from "@/stores/user";
import { useClipboard } from '@vueuse/core'
const dialog = ref(false)
const { meta,g,e} = useMagicKeys()
const package_users = ref()
const quantity = ref(1)
const select = ref(null)
const note = ref('')
const error_message = ref('')
const step = ref(1)
const active_code = ref('')
const codes = ref('')
const current_index = ref(0)
const toltip_message = ref('codes copied')
const form = ref(null)
const loading = ref(false)
const store = useUserStore()
const emitter = mitt()
const { text, copy, copied, isSupported } = useClipboard({ active_code })
const required = (value)=>{
  return value ? true : "field are required"
}
const closeModal = ()=>{
  dialog.value=false
  error_message.value = ''
  codes.value=''
  active_code.value=''
  step.value = 1
  quantity.value=1
  select.value = null

}

const getPackageCost = computed(()=>{
  return package_users.value.find(obj=> obj.id === select.value).official_credits
})

const getTotalCost = computed(()=>{
  return quantity.value * getPackageCost.value
})
const getPackage = async ()=>{
 await axios.get('user/packages/').then((res)=>{

   package_users.value = res.data


  }).catch((err)=>{
    console.log(err)

  })
}

const openDialog = ()=>{
  dialog.value = true
  getPackage()


}


const TypeWritter = ()=>{
  if(current_index.value<active_code.value.length){
    codes.value += active_code.value.charAt(current_index.value)
    current_index.value++
    setTimeout(TypeWritter,40)

  }else{
    current_index.value=0
  }

}


const submitForm = ()=>{
  if (getTotalCost.value > store.getBalance){
    error_message.value = 'you do not have enough credit'
  }
  if (form.value.isValid){
    loading.value = true
    const obj = {
      'quantity':quantity.value,
      'package_id':select.value,
      'note': note.value,
    }
    axios.post('line/',obj).then((res)=>{
      loading.value = false
      store.refreshUserInfo()
      step.value++

      res.data.forEach((item)=>{
        active_code.value+=item.username+'\n'
      })

      TypeWritter()
      emitter.emit('reload_line')


    }).catch((err)=>{
      error_message.value = err.response.data.detail
      console.log(err)
    })

  }

}

watchEffect(()=>{
  if (meta.value && g.value){
    openDialog()
  }
  if (meta.value && e.value){
    closeModal()
  }
})



</script>

<template>
  <v-list-item prepend-icon="mdi mdi-television" title="Generate Code" value="generate-code" @click="openDialog">
    <template v-slot:append>
      <small  class="px-3"><span class="mdi mdi-apple-keyboard-command"></span>+G</small>
    </template>
  </v-list-item>

  <v-dialog v-model="dialog" max-width="500" class="own" @close="closeModal">
    <v-window v-model="step">
      <v-window-item :value="1">
    <v-card class="pa-5">
      <v-alert v-if="error_message" :text="error_message" color="red"/>
      <v-card-text>

        <v-form ref="form">
        <v-text-field min=1 type="number" v-model="quantity" label="Number of Code" variant="underlined"></v-text-field>
          <v-text-field type="text" v-model="note" label="Note" variant="underlined"></v-text-field>
          <v-select :rules="[required]" v-model="select" :items="package_users" item-title="package_name" item-value="id"  variant="underlined">


          </v-select>

          <v-row class="pa-5" v-if="select">
            <v-col>
            <v-sheet>
              <h5 class="text-teal-darken-2">package cost : {{ getPackageCost }} credits</h5>

            </v-sheet>
            </v-col>
            <v-col>
              <h5 class="text-teal-darken-2">total cost : {{getTotalCost}}</h5>

            </v-col>
          </v-row>
        </v-form>




      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="closeModal">close</v-btn>
        <v-btn type="submit" :loading="loading" color="success" @click.prevent="submitForm">Generate</v-btn>
      </v-card-actions>







    </v-card>
      </v-window-item>

      <v-window-item :value="2">
        <v-card class="pa-5">
          <v-card-text>

            <v-textarea auto-grow variant="solo-filled"  :model-value="codes">


            </v-textarea>


          </v-card-text>

          <v-card-actions>
            <v-btn @click="closeModal">close</v-btn>
            <v-spacer></v-spacer>

            <v-btn @click="copy(active_code)" append-icon="mdi mdi-content-copy" color="success">copie<v-tooltip v-if="copied"
                activator="parent"
                location="top"
            >{{ toltip_message }}</v-tooltip></v-btn>
          </v-card-actions>

        </v-card>

      </v-window-item>


    </v-window>
  </v-dialog>
</template>

<style scoped>
.v-dialog{
  align-items: flex-start;
  margin-top: 50px;

}
.v-textarea {
  overflow-y: auto;
  max-height: 500px;

}


</style>