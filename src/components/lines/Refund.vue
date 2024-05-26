<script setup>
import { useUserStore } from '@/stores/user';
import {useToast} from "vue-toastification";
import axios from 'axios';
import {ref,inject} from 'vue';
const dialog = ref(inject('refund_popup'))
const props = defineProps(['item'])
const emit = defineEmits(['reload'])
const store = useUserStore()

const toast = useToast()
const loading = ref(false)
const message = ref()

const perform_refund = ()=>{
    loading.value = true
    axios.post(`line/refund/${props.item.id}`).then((res)=>{
        loading.value = false
        dialog.value = false
        toast.success(res.data.message)
        emit('reload')
        store.refreshUserInfo()

        

    }).catch((err)=>{
        console.log(err)
    })

}
</script>

<template>
    <v-dialog v-model="dialog" max-width="500">
        <v-card class="pa-5">
            <v-card-item>
                <v-card-title>
                    Refund
                    <v-card-subtitle>
                        {{ item.username }}
                    </v-card-subtitle>
                </v-card-title>
            </v-card-item>
                <v-card-text>
                    <div v-if="!message">
                        Make sure that this active code {{ item.username }} are not used otherwise you can not refund it .
                        Are you sure you want to refund active code ?
                    </div>

                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="dialog=false">Close</v-btn>
                    <v-btn @click.once="perform_refund" :loading="loading" color="success">Refund</v-btn>
                </v-card-actions>
           
        </v-card>


    </v-dialog>
</template>



<style lang="scss" scoped>

</style>