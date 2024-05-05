<script setup>
import axios from 'axios';
import {ref,inject} from 'vue';

const props = defineProps(['item'])
const dialog = ref(inject('m3u_popup'))
const items = ref(['M3U','EXTREAM'])
const selected = ref()
const extream_data = ref()
const m3u_data = ref()



const getData = (ev)=>{
    extream_data.value=''
    m3u_data.value=''
    axios.get(`line/get/${props.item}/${selected.value.toLowerCase()}`).then((res)=>{
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

const copie_url = (item)=>{
    navigator.clipboard.writeText(item)

}
</script>

<template>
    <v-dialog class="pa-5" v-model="dialog" max-width="500">
        <v-card>
            <v-card-text>
             
            
                <div v-if="m3u_data">
                  
                    <v-text-field v-for="item in m3u_data" label="Url"  :model-value="item" readonly append-icon="mdi mdi-content-copy" @click:append="copie_url(item)"></v-text-field>
                        
                </div>
                <div v-if="extream_data">
                    <v-textarea no-resize v-for="item in extream_data" :model-value="item" variant="solo-filled" readonly></v-textarea>
                </div>
       
                

           
             

                <v-select v-model="selected" width="500" @update:model-value="getData"   label="select" :model-value="selected" :items="items">

                </v-select>
               
            </v-card-text>
        </v-card>
    </v-dialog>
</template>



<style lang="scss" scoped>

</style>