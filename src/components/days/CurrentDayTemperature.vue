<script lang="ts" setup>

interface Props {
  temperature: number,
  humidity: number,
  condition:string,
  location:string,
  wind_kph: number,
  pressure_mb:number,
  chance_of_rain:number,
  chance_of_snow:number,
  icon_path:string,
 
}

defineProps<Props>()


</script>

<template>
  <div class="weather-info-wrapper"> 
    <div class="current-day-temperature-wrapper">
      <div class="img-wrapper">
        <p>Today's weather in {{ location }} </p>
        <img :src="icon_path" />
      </div>

      <div class="current-day-temperature-info">
        <h2>{{ Math.round(temperature) }}°C</h2>
        <p>{{ condition }}</p>
      </div> 
    </div>
    <div class="current-day-temperature-additional-info">
        <ul>
          <li>
            <img src="@/assets/images/icons/wind.svg"> {{wind_kph}} km/h
            </li>
            <li>
              <img src="@/assets/images/icons/humidity.svg"> {{humidity}}%
            </li>
            <li>
              <img src="@/assets/images/icons/rain-probability.svg"> 
              <span v-if="chance_of_rain===0 && chance_of_snow===0">{{chance_of_rain}}%</span>
              <span v-else-if="chance_of_rain > chance_of_snow">{{chance_of_rain}}%</span>
              <span v-else>{{chance_of_snow}}%</span>
            </li>
            <li>
              <img src="@/assets/images/icons/air-pressure.svg"> {{ Math.ceil(pressure_mb/1.333) }} mmHg
            </li>
        </ul>
      </div>
  </div>  
</template>

<style lang="scss">
.weather-info-wrapper{
 display: flex;
 flex-direction: column;
 margin-right: 2rem;

  .current-day-temperature-wrapper {
    display: flex;
    gap: 2rem;
    padding-right: 2em;
    margin: 0 1em;

    .img-wrapper {
      width: 15rem;

      img {
        // width: 150px;
        width: 100%;
      }
      
    }
    .current-day-temperature-info{
      p {
        
        font-size: 25px;
        margin: 2em auto;
      }
    }
    
    
  }
  .current-day-temperature-additional-info{
      display: flex;
      justify-content: center;
      
        ul {
        padding: 0;
        list-style-type: none;
        display: flex;

        
        
        
      } 

      li {
        display: inline;
        text-align: center;
        align-items: center;
        flex: 1;
        height: 3rem;
        background-color: rgb(146, 142, 142);
        padding: 0.7rem 0.2rem;
        font-size: smaller;
        
        span{
          text-align: center;
        }
        img{
          float: left;
          height: 100%;
        }
        
      }
      
    }
}
</style>