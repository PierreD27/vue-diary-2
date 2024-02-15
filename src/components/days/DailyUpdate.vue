<script lang="ts" setup>
interface Props {
  date: string,
  condition: string,
  icon_path: string,
  maxtemp_c:number,
  maxtemp_f:number,
  mintemp_c:number,
  mintemp_f:number,
}


defineProps<Props>()
</script>

<template>
  <div class="daily-item">
    <p>{{ date }}</p>
    <img :src="icon_path"/>
    <p> {{ Math.round(maxtemp_c) }}°C</p>
    <p> {{ Math.round(mintemp_c) }}°C</p>
    
  </div>
</template>

<style lang="scss">
.daily-item {
  background: rgb(111, 52, 179);
  padding: 0.5rem 0.7rem;
  border-radius: 0.7rem;

  p {
    color: white;
  }
  
}
</style>