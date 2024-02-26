<script setup lang="ts">
import DailyUpdate from './weather/DailyUpdate.vue';
import {getDaysData} from '@/services/WeatherGetApi.vue'
import {getHoursData} from '@/services/getDataMethods.vue'
import {getWeekData} from '@/services/getDataMethods.vue';
import {getTodayWeatherData} from '@/services/getDataMethods.vue';
import {getCurrentDataIcon} from '@/services/getDataMethods.vue';
import HourlyUpdate from './weather/HourlyUpdate.vue';
import CurrentDayTemperature from './weather/CurrentDayTemperature.vue';
import CurrentDayGraph from './weather/CurrentDayGraph.vue';
import { ref, onMounted, watch } from 'vue';
import { useTodayWeatherDataStore } from '@/stores/todoList'


interface Props{
  isCel:boolean,
  cityName:string
}


const props = defineProps<Props>()
const daysData = ref<any>(null)
const loading=ref(false)
const weatherByHour=ref<any>([])
const todayWeatherData=ref<any>([])
const weatherByWeek=ref<any>([])
let currentDayIconPath:string=""

const todayWeatherDataStore = useTodayWeatherDataStore();



onMounted(async()=>{

  loading.value=true;
  daysData.value=await getDaysData();
  weatherByHour.value=getHoursData(daysData);
  weatherByWeek.value=getWeekData(daysData);
  todayWeatherData.value=getTodayWeatherData(daysData);
  currentDayIconPath=getCurrentDataIcon(daysData);
  todayWeatherDataStore.addTodayWeatherData(todayWeatherData.value);
  loading.value=false
})

watch(()=> props.cityName, async ()=>{
  loading.value=true
  daysData.value=await getDaysData(props.cityName)
  weatherByHour.value=[];
  weatherByWeek.value=[];
  todayWeatherData.value=[];
  currentDayIconPath='';
  weatherByHour.value=getHoursData(daysData)
  weatherByWeek.value=getWeekData(daysData)
  todayWeatherData.value=getTodayWeatherData(daysData);
  currentDayIconPath=getCurrentDataIcon(daysData)
  todayWeatherDataStore.clearTodayWeatherData()
  todayWeatherDataStore.addTodayWeatherData(todayWeatherData.value)
  loading.value=false
})





</script>

<template>
  <div v-if="loading" class="loading-wrapper">
    <div class="loader"></div>
    <p>LOADING ....</p>
  </div>
  <div v-if=" daysData && !loading " class="container weather-widget-wrapper">
    <div class="hero-section">
      <div class="current-day-wrapper">

        <div class="current-day-temperature-wrapper">
   
          <CurrentDayTemperature :temp_c="daysData.current.temp_c" 
            :temp_f="daysData.current.temp_f" 
            :humidity="daysData.current.humidity" 
            :condition="daysData.current.condition.text"
            :location="daysData.location.name"
            :country="daysData.location.country"
            :wind_kph="daysData.current.wind_kph"
            :wind_mph="daysData.current.wind_mph"
            :pressure_mb="daysData.current.pressure_mb"
            :chance_of_rain="daysData.forecast.forecastday[0].day.daily_chance_of_rain"
            :chance_of_snow="daysData.forecast.forecastday[0].day.daily_chance_of_snow"
            :icon_path="currentDayIconPath"
            :sunrise="daysData.forecast.forecastday[0].astro.sunrise"
            :sunset="daysData.forecast.forecastday[0].astro.sunset"
            :isCel="isCel"
          />

        </div>  

        <div class="current-day-graph-wrapper">

         <CurrentDayGraph
          :todayWeatherData="todayWeatherData"
          :isCel="isCel"
         />

        </div>

        

      
      </div>

      <div class="hourly-wrapper">
        <h2 class>24 Hour Weather</h2>

        <div class="hourly-items">
           <template v-for="hour in weatherByHour" :key="hour.hour">
            <HourlyUpdate :hour="hour.hour" 
             :condition="hour.condition"
             :icon_path="hour.icon_path"
             :temp_c="hour.hourTemp_c"
             :temp_f="hour.hourTemp_f"
             :is_day="hour.isDay"  
             :isCel="isCel"
             />
          </template> 
        </div>
      </div>
     
    </div>
    
    <div class="daily-wrapper">
        <h2>7 Days Weather</h2>
      <template v-for="day in weatherByWeek" :key="day.date">
        <DailyUpdate :date="day.date"
        :weekDay="day.weekDay"
        :condition="day.condition"
        :icon_path="day.icon_path"
        :maxtemp_c="day.maxtemp_c"
        :maxtemp_f="day.maxtemp_f"
        :mintemp_c="day.mintemp_c"
        :mintemp_f="day.mintemp_f"
        :isCel="isCel"
        />
      </template>
    </div>
    
  </div>

</template>

<style lang="scss" scoped>

.loading-wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50rem;
  background-color: #494b68;

  .loader {
  border: 0.2rem solid #2d5f5d; /* Light grey */
  border-top: 0.2rem solid #BCAB79; 
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 1rem;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
}

.weather-widget-wrapper {
  margin: 0 auto;
  display: flex;
  gap: 1rem;
  padding: 1.5rem 1rem;
  background-color: #494b68;
  border-radius: 0.5rem;

  .hero-section {
    flex: 1;
    max-width: 82%;
    .current-day-wrapper{
      display: flex;
      margin-bottom: 1rem;
      justify-content: space-between;
      
      @media screen and (max-width: 720px) {
        flex-direction: column;
        
      }
      
     
    }

   
    .current-day-graph-wrapper{
      width: 51%;
      max-height: 100%;
    }
    .hourly-wrapper {
      background-color: #022140;
      border-radius: 0.5rem;
      padding-bottom: 1rem;

      /* width */
      ::-webkit-scrollbar {
        width: 1rem;
      }

      /* Track */
      ::-webkit-scrollbar-track {
        background: #1e4258; 
        border-radius: 0.5rem;
        margin: 0 1rem;
      }
      
      /* Handle */
      ::-webkit-scrollbar-thumb {
        background: #2d5f5d; 
        width: 1rem;
        border-radius: 0.5rem;
      }

      /* Handle on hover */
      ::-webkit-scrollbar-thumb:hover {
        background: #BCAB79; 
      }

      h2{
        padding-top: 1rem;
        padding-bottom: 0.5rem;
        margin-bottom: 0.5rem;
        padding-left: 1rem;
        background-color: #1e4258;
        border-radius: 0.5rem 0.5rem  0 0 ;
      }

      .hourly-items {
        padding-left: 1rem;
        padding-right: 1rem;
        padding-bottom: 0.5rem;
        display: flex;
        gap: 1rem;
        overflow-x:scroll;
        
       }

       
    }
  }

  .current-day-diary-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: auto;
    max-width: 40%;

    // flex: 1;
  }
  .daily-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    background-color: #022140;
    border-radius: 0.5rem;
    padding-bottom: 0.5rem;
    width: 17%;
    @media screen and (max-width: 720px) {
      width: 100%;
    }

    h2{
    padding-top: 1rem;
    padding-bottom: 0.5rem;
    margin-bottom: 0.2rem;
    padding-left: 1rem;
    background-color: #1e4258;
    border-radius: 0.5rem 0.5rem  0 0 ;
    }
    // flex: 1;
  }

  @media screen and (max-width: 720px) {
    flex-direction: column;

    // .hourly-wrapper {
    //   display: none;
    // }
  }
}
</style>