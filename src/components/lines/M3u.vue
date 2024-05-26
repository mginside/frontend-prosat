<script setup>
import axios from 'axios';
import { useClipboard } from '@vueuse/core'
import {ref,inject} from 'vue';
const props = defineProps(['item'])
const dialog = ref(inject('m3u_popup'))
const items = ref(['M3U','EXTREAM'])
const selected = ref()
const extream_data = ref()
const m3u_data = ref()
const loading = ref(false)
const { text, copy, copied, isSupported } = useClipboard({ m3u_data,extream_data })


const getData = (ev)=>{
    loading.value = true
    extream_data.value=''
    m3u_data.value=''
    axios.get(`line/get/${props.item}/${selected.value.toLowerCase()}`).then((res)=>{
        loading.value = false
        switch (selected.value) {
            case 'M3U':
                m3u_data.value=res.data.playlist
                
                break;
            case 'EXTREAM':
                extream_data.value = res.data.extream
            break;
        
            default:
                break;
        }


    }).catch((err)=>{
        console.log(err)
    })

}


</script>

<template>
    <v-dialog class="pa-5" v-model="dialog" max-width="700">
        <v-card>
            <v-card-text>
             
            
                <div v-if="m3u_data">
                  
                    <v-text-field  v-for="item in m3u_data" label="Url"  :model-value="item" readonly append-icon="mdi mdi-content-copy" @click:append="copy(m3u_data)"></v-text-field>
                        
                </div>
                <div v-if="extream_data">
                    <v-textarea no-resize v-for="item in extream_data" :model-value="item" variant="solo-filled" append-inner-icon="mdi mdi-content-copy" @click:prepend-inner="copy(extream_data)" readonly></v-textarea>
                </div>
       
                

           
             

                <v-select :loading="loading"  v-model="selected" width="500" @update:model-value="getData"   label="select" :model-value="selected" :items="items">

                </v-select>
               
            </v-card-text>
        </v-card>
    </v-dialog>
</template>



<style lang="scss" scoped>

</style>