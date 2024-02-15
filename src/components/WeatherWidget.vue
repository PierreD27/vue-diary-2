<script setup lang="ts">
import DailyUpdate from './days/DailyUpdate.vue';
import {getDaysData} from '@/services/WeatherGetApi.js'
import {getWeatherIconPath} from '@/services/getIconPath.js'
import HourlyUpdate from './days/HourlyUpdate.vue';
import CurrentDayTemperature from './days/CurrentDayTemperature.vue';
import CurrentDayDiary from './days/CurrentDayDiary.vue';
import { ref, onMounted } from 'vue';



const daysData = ref<any>(null)
const loading=ref(false)
const weatherByHour=ref<any>([])
const weatherByWeek=ref<any>([])


onMounted(async()=>{

  loading.value=true;
  daysData.value=await getDaysData()
  getHoursData()
  getWeekData()
  getCurrentDataIcon()
  console.log(daysData)
  console.log(weatherByHour)
  console.log(weatherByWeek)
  loading.value=false
})



function getHoursData(){
  if (daysData.value){
    const now =new Date();
    const nowHour:number= now.getHours();
    for (let i=nowHour+1; i<daysData.value.forecast.forecastday[0].hour.length; i++){
      const time:string = daysData.value.forecast.forecastday[0].hour[i].time;
      const short_time:string =time.slice(-5);
      const hourCondition:string = daysData.value.forecast.forecastday[0].hour[i].condition.text;
      const iconPath:string=getWeatherIconPath(hourCondition)
      const temp_c:number=daysData.value.forecast.forecastday[0].hour[i].temp_c;
      const temp_f:number=daysData.value.forecast.forecastday[0].hour[i].temp_f;
      const is_day:number=daysData.value.forecast.forecastday[1].hour[i].is_day;
      let fullIconPath:string;
      if (is_day===1){
        fullIconPath='/src/assets/images/icons/weather-icons/day' +iconPath;
      }
      else{
        fullIconPath='/src/assets/images/icons/weather-icons/night' +iconPath;
      }
      const pushedObject:any={
        hour:short_time,
        condition:hourCondition,
        icon_path: fullIconPath,
        hourTemp_c:temp_c,
        hourTemp_f: temp_f,
        isDay: is_day,
      }
      weatherByHour.value.push(pushedObject)
   }
   const currentArrayLength:number=weatherByHour.value.length;
   for (let i=0; i<daysData.value.forecast.forecastday[1].hour.length-currentArrayLength; i++){
      const time:string = daysData.value.forecast.forecastday[1].hour[i].time;
      const short_time:string =time.slice(-5);
      const hourCondition:string = daysData.value.forecast.forecastday[1].hour[i].condition.text;
      const iconPath:string=getWeatherIconPath(hourCondition)
      const temp_c:number=daysData.value.forecast.forecastday[1].hour[i].temp_c;
      const temp_f:number=daysData.value.forecast.forecastday[1].hour[i].temp_f;
      const is_day:number=daysData.value.forecast.forecastday[1].hour[i].is_day;
      let fullIconPath:string;
      if (is_day===1){
        fullIconPath='/src/assets/images/icons/weather-icons/day' +iconPath;
      }
      else{
        fullIconPath='/src/assets/images/icons/weather-icons/night' +iconPath;
      }
      const pushedObject:any={
        hour:short_time,
        condition:hourCondition,
        icon_path: fullIconPath,
        hourTemp_c:temp_c,
        hourTemp_f: temp_f,
        isDay: is_day,
      }
      weatherByHour.value.push(pushedObject);
   }
  }
}

function getWeekData(){
  if (daysData.value){
    for (let i=1; i<daysData.value.forecast.forecastday.length; i++){
      const singleDayDate:string=daysData.value.forecast.forecastday[i].date;
      const singleDayDateNormalized:string=singleDayDate.slice(-2)+"."+singleDayDate.slice(-5,-3)+"."+singleDayDate.slice(0,4);
      const singleDayCondition:string=daysData.value.forecast.forecastday[i].day.condition.text;
      const iconPath:string=getWeatherIconPath(singleDayCondition)
      const fullIconPath:string='/src/assets/images/icons/weather-icons/day' +iconPath;
      const singleDayMaxTempC:number=daysData.value.forecast.forecastday[i].day.maxtemp_c;
      const singleDayMaxTempF:number=daysData.value.forecast.forecastday[i].day.maxtemp_f;
      const singleDayMinTempC:number=daysData.value.forecast.forecastday[i].day.mintemp_c;
      const singleDayMinTempF:number=daysData.value.forecast.forecastday[i].day.mintemp_f;
      const pushedObject:any={
        date:singleDayDateNormalized,
        condition: singleDayCondition,
        icon_path: fullIconPath,
        maxtemp_c: singleDayMaxTempC,
        maxtemp_f: singleDayMaxTempF,
        mintemp_c: singleDayMinTempC,
        mintemp_f: singleDayMinTempF,
      }
      weatherByWeek.value.push(pushedObject);
    }
  }
}
let currentDayIconPath:string
function getCurrentDataIcon(){
  if (daysData.value){
    const currentDayCondition:string=daysData.value.current.condition.text; 
    const isDay:number=daysData.value.current.is_day;
    const iconPath:string=getWeatherIconPath(currentDayCondition);
    if (isDay===1){
      currentDayIconPath='/src/assets/images/icons/weather-icons/day' +iconPath;
    }
    else{
      currentDayIconPath='/src/assets/images/icons/weather-icons/night' +iconPath;
    }
  }
}

const toDoList = ref([
  {
    time: '09:00',
    activity: 'Breakfast'

  },
  {
    time: '09:30',
    activity: 'Jogging'

  },
  {
    time: '10:30',
    activity: 'Shower'

  },
  {
    time: '11:30',
    activity: 'Get to bus station'

  },
  {
    time: '12:30',
    activity: 'Business meeting with new clients'

  },
  
])

</script>

<template>
  <div v-if="loading">LOADING ....</div>
  <div v-if=" daysData && !loading " class="container weather-widget-wrapper">
    <div class="hero-section">
        <div class="current-day-wrapper">
        
        <CurrentDayTemperature :temperature="daysData.current.temp_c" 
          :humidity="daysData.current.humidity" 
          :condition="daysData.current.condition.text"
          :location="daysData.location.name"
          :wind_kph="daysData.current.wind_kph"
          :pressure_mb="daysData.current.pressure_mb"
          :chance_of_rain="daysData.forecast.forecastday[0].day.daily_chance_of_rain"
          :chance_of_snow="daysData.forecast.forecastday[0].day.daily_chance_of_snow"
          :icon_path="currentDayIconPath"
          />


        <div class='current-day-diary-wrapper'>
            <h3 class="title">Today's to do list</h3>
            <template v-for="todo in toDoList" :key="todo.time">
            <CurrentDayDiary :time="todo.time" :activity="todo.activity" />
            </template>

        </div>
      

      
      </div>

      <div class="hourly-wrapper">
        <h3 class="title">24 hour weather</h3>

        <div class="hourly-items">
           <template v-for="hour in weatherByHour" :key="hour.hour">
            <HourlyUpdate :hour="hour.hour" 
             :condition="hour.condition"
             :icon_path="hour.icon_path"
             :temp_c="hour.hourTemp_c"
             :temp_f="hour.hourTemp_f"
             :is_day="hour.isDay"  
             />
          </template> 
        </div>
      </div>
    </div>

    <div class="daily-wrapper">
      <template v-for="day in weatherByWeek" :key="day.date">
        <DailyUpdate :date="day.date"
        :condition="day.condition"
        :icon_path="day.icon_path"
        :maxtemp_c="day.maxtemp_c"
        :maxtemp_f="day.maxtemp_f"
        :mintemp_c="day.mintemp_c"
        :mintemp_f="day.mintemp_f"
        />
      </template>
    </div>

  </div>
</template>

<style lang="scss">
.weather-widget-wrapper {
  margin: 0 auto;
  display: flex;
  gap: 2rem;
  padding: 2rem 1rem;
  background-color: black;

  .hero-section {
    flex: 1;
    max-width: 80%;
    .current-day-wrapper{
      display: flex;
      gap: 2 rem;
      margin-bottom: 2rem;
      @media screen and (max-width: 720px) {
        flex-direction: column;
      }
      
    }
    .hourly-wrapper {
      padding: 1rem 0.5rem;
      background-color: aqua;
      border-radius: 0.8rem;

      .title {
        padding-bottom: 0.5rem;
      }

      .hourly-items {
        display: flex;
        gap: 2rem;
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
    gap: 1rem;
    overflow-y: auto;
    width: 15%;
    @media screen and (max-width: 720px) {
      width: 100%;
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