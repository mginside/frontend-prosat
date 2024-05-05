<script setup>
import axios from 'axios';
import { useToast } from "vue-toastification";
import { VueDraggableNext } from 'vue-draggable-next'
import { ref,onMounted } from 'vue';
import { useRoute } from 'vue-router';
const selected_config=ref()
const confirm_config_creation = ref(false)
const config_name = ref('')
const dialog = ref(false)
const message = ref()
const toast = useToast()
const alert_color = ref()
const bouquet = ref()
const line_bouquets = ref([])
const removed_boquet = ref()

const route = useRoute()


const getBouquetName = (id)=>{
   const name = bouquet.value.filter((item)=>item.id==id)
   return name[0].bouquet_name
}

const loadata = ()=>{
   axios.get(`line/bouquet/${route.params.id}`).then((res)=>{
   
    bouquet.value=res.data.bouquet
    line_bouquets.value = res.data.line_bouquet
    removed_boquet.value = res.data.bouquet_ids.filter(item=>!line_bouquets.value.includes(item))
    
    
    

   }).catch((err)=>{
    console.log(err)
   })
}


const save_edit = ()=>{
    message.value = ''
    if (selected_config.value || dialog.value){
        const obj = {
            "bouquet":JSON.stringify(line_bouquets.value),
            "save_config":confirm_config_creation.value,
            "config_name":config_name.value,

        }
        axios.post(`line/save/bouquet/${route.params.id}`,obj).then((res)=>{
            
            console.log(res)
            dialog.value=false
            toast.success(res.data.message, {
            timeout: 2000
      });
            config_name.value = ''
            loadata()
        }).catch((err)=>{
            message.value=err.response.data.detail
            alert_color.value="red"
        })

    }
    else{
        dialog.value = true

    }


}
 onMounted(() => {
    loadata()
 })
 

</script>
<template>
    <v-row>
        <v-dialog v-model="dialog" max-width="500">
            <v-card class="pa-5">
                <v-alert :color="alert_color" :text="message" v-if="message"></v-alert>
                <v-card-text>
                    Do you want to save this bouquet config for next edition ?
                    <v-form class="mt-5">
                        <v-radio-group v-model="confirm_config_creation" inline>
                            <v-radio class="mr-5" color="red" label="No" :value="false"></v-radio>
                            <v-radio color="success" label="Yes" :value="true"></v-radio>
                        
                        </v-radio-group>
                        <v-text-field v-if="confirm_config_creation" variant="underlined" v-model="config_name" label="Config name">
                          
                        </v-text-field>
                       
            
      
                       
                        
                    </v-form>


                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="dialog=false">Close</v-btn>
                    <v-btn @click="save_edit" color="success">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
     

    <v-row>
        
        <v-col  sm="6" md="4" lg="6">
     
            <v-card class="text-center">
                <v-toolbar>
                    <v-toolbar-title class="text-teal">Active bouquets</v-toolbar-title>
                </v-toolbar>
                
               
                <v-card-text>
                   
                    <v-list  height="500">
                        
                            <VueDraggableNext class="list-group" :list="line_bouquets"   group="people">
               
                                <v-list-tem class="d-flex border pa-2 ma-1 text-teal" append-icon="mdi mdi-drag-variant" v-for="item in line_bouquets" :key="item">{{ getBouquetName(item) }}</v-list-tem>
                               
         
                  

                            </VueDraggableNext>
                  </v-list>
                    
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="success" @click="save_edit">Save</v-btn>
                   
                </v-card-actions>
             
        
            </v-card>
     
        </v-col>
        <v-col  sm="6" md="4" lg="6">

            <v-card class="text-center" >
                <v-toolbar>
                    <v-toolbar-title class="text-teal">Inactive bouquets</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
             
                    
                    <v-list height="500">
                        
                        <VueDraggableNext class="list-group" :list="removed_boquet"   group="people">
           
                            <v-list-tem  class="d-flex border pa-2 ma-1 text-teal" v-for="item in removed_boquet" :key="item">{{ getBouquetName(item) }}</v-list-tem>
                           
     
              

                        </VueDraggableNext>
              </v-list>
                  
            

                </v-card-text>
            </v-card>

            
        </v-col>
     
    </v-row>



  

</template>


<style lang="css" scoped>



</style>