<script lang="ts" setup>

// interface Props {
//   temperature: string,
//   humidity: string,
//   condition:string,
//   location:string,
//   wind_kph: string,
 
// }

// defineProps<Props>()


</script>

<template>
  <div class="weather-info-wrapper"> 
    <div class="current-day-temperature-wrapper">
      <div class="img-wrapper">
        <!-- <p>Today's weather in {{ location }} </p> -->
        <img src="@/assets/images/icons/moon.svg" />
      </div>

      <div class="current-day-temperature-info">
        <!-- <h2>{{ temperature }}°C</h2> -->
        <!-- <p>{{ condition }}</p> -->
      </div> 
    </div>
    <!-- <div class="current-day-temperature-additional-info">
        <ul>
          <li>
            <img src="@/assets/images/icons/wind.svg"> {{wind_kph}} km/h
            </li>
            <li>
              <img src="@/assets/images/icons/humidity.svg"> {{humidity}}%
            </li>
            <li>
              <img src="@/assets/images/icons/rain-probability.svg"> 0%
            </li>
            <li>
              <img src="@/assets/images/icons/air-pressure.svg"> 701 mmHg
            </li>
        </ul>
      </div> -->
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
        ul {
        padding: 0;
        list-style-type: none;
        display: flex;
        flex: 1;
        align-items: center;
        
      } 

      li {
        display: inline;
        text-align: center;
        flex: 1;
        border: 1px solid white;
        
      }
    }
}
</style>