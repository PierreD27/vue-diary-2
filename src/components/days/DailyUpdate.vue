<script lang="ts" setup>
interface Props {
  date: number,
  weekDay:string,
  condition: string,
  icon_path: string,
  maxtemp_c:number,
  maxtemp_f:number,
  mintemp_c:number,
  mintemp_f:number,
  isCel:boolean,
}


defineProps<Props>()
</script>

<template>
  <div class="daily-item">
    <div class="date-wrapper">
      <p class="date-unit">{{ weekDay }} </p> 
      <p class="date-unit">{{ date }} </p> 
    </div>
    <div class="icon-wrapper">    
      <img :src="icon_path"/>
    </div> 
      <div class="temp-wrapper">
        <p class="temp-unit" v-if="isCel"> {{ Math.round(maxtemp_c) }}°C</p>
        <p class="temp-unit" v-else> {{ Math.round(maxtemp_f) }}°F</p>
        <p class="temp-unit" v-if="isCel"> {{ Math.round(mintemp_c) }}°C</p>
        <p class="temp-unit" v-else> {{ Math.round(mintemp_f) }}°F</p>
    </div>
  </div>
</template>

<style lang="scss">
.daily-item {
  display: flex;
  justify-content:space-between;
  background: #1e4258;
  padding: 0.5rem 0.7rem;
  border-radius: 0.7rem;
  margin: 0 0.5rem;

  .date-wrapper{
    display: flex;
    flex-direction: column;


    .date-unit{
      font-weight: 600;
    }

  }




  .icon-wrapper{
    display: flex;
  
    align-items: center;

    img{
      height: 100%;
      margin: 0 0.1rem;
    }

  }
  
  .temp-wrapper{
      display: flex;
      flex-direction: column;
      align-items: flex-end;
       
      .temp-unit{
     text-align: end;
     }
      
    }
}
</style>