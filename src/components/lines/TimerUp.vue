<script setup>
import {onMounted, ref} from "vue";
const props = defineProps(['total_seconds'])
const timer = ref()
const totalSeconds = ref(Math.floor(props.total_seconds))

const count_time = ()=>{
  setInterval(()=>{
    ++totalSeconds.value
    let hour = Math.floor(totalSeconds.value / 3600);
    let minute = Math.floor((totalSeconds.value - hour * 3600) / 60);
    let seconds = totalSeconds.value - (hour * 3600 + minute * 60);
    if (hour < 10)
      hour = "0" + hour;
    if (minute < 10)
      minute = "0" + minute;
    if (seconds < 10)
      seconds = "0" + seconds;
    timer.value = hour + ":" + minute + ":" + seconds
  },1000)
}

onMounted(()=>{
  count_time()
})
</script>
<template>
  <Transition>
  <v-sheet height="30" class="bg-green-darken-3 rounded text-center py-1">
  {{timer}}
  </v-sheet>
  </Transition>
</template>
<style scoped>

</style>