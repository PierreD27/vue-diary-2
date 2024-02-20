<script lang="ts" setup>
interface Props {
  hour:string,
  condition:string,
  icon_path: string,
  temp_c:number,
  temp_f:number,
  is_day:number,
  isCel:boolean,
}

defineProps<Props>()
</script>

<template>
  <div class="hour-wrapper">
    <p> {{ hour }}</p>
    <img :src="icon_path">
    <p v-if="isCel"> {{Math.round(temp_c) }}°C</p>
    <p v-else> {{Math.round(temp_f) }}°F</p>
    
  </div>
</template>

<style lang="scss">
.hour-wrapper {
  background: rgb(14, 168, 168);
  padding: 0.5rem 0.7rem;
  border-radius: 0.7rem;
}
</style>