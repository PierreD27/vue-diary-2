<script setup lang="ts">
import DailyUpdate from './days/DailyUpdate.vue';
import {getDaysData} from '@/services/WeatherGetApi.js'
import {getWeatherIconPath} from '@/services/getIconPath.js'
import HourlyUpdate from './days/HourlyUpdate.vue';
import CurrentDayTemperature from './days/CurrentDayTemperature.vue';
import CurrentDayGraph from './days/CurrentDayGraph.vue';
import CurrentDayDiary from './days/CurrentDayDiary.vue';
import { ref, onMounted, watch } from 'vue';

interface Props{
  isCel:boolean,
  cityName:string
}


const props = defineProps<Props>()

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
  loading.value=false
})

//props.cityName
watch(()=> props.cityName, async ()=>{
  loading.value=true
  daysData.value=await getDaysData(props.cityName)
  weatherByHour.value=[];
  weatherByWeek.value=[];
  currentDayIconPath='';
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
  function getWeekDay(date:Date) {
        let days:string[] = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

        return days[date.getDay()];
      }
  if (daysData.value){
    for (let i=1; i<daysData.value.forecast.forecastday.length; i++){
      const singleDayDate:string=daysData.value.forecast.forecastday[i].date;
      
      const dateYear:number=+singleDayDate.slice(0,4);
      const dateMonth:number=+singleDayDate.slice(-5,-3)-1;
      const dateDate:number=+singleDayDate.slice(-2);
      const tempDate:Date= new Date(dateYear, dateMonth, dateDate)

      const weekDay:string=getWeekDay(tempDate);

      //const singleDayDateNormalized:string=weekDay+" "+dateDate;
      const singleDayCondition:string=daysData.value.forecast.forecastday[i].day.condition.text;
      const iconPath:string=getWeatherIconPath(singleDayCondition)
      const fullIconPath:string='/src/assets/images/icons/weather-icons/day' +iconPath;
      const singleDayMaxTempC:number=daysData.value.forecast.forecastday[i].day.maxtemp_c;
      const singleDayMaxTempF:number=daysData.value.forecast.forecastday[i].day.maxtemp_f;
      const singleDayMinTempC:number=daysData.value.forecast.forecastday[i].day.mintemp_c;
      const singleDayMinTempF:number=daysData.value.forecast.forecastday[i].day.mintemp_f;
      const pushedObject:any={
        date:dateDate,
        weekDay:weekDay,
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
          :weatherByHour="weatherByHour"
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
      <!-- <div class='current-day-diary-wrapper'>
       <h3 class="title">Today's to do list</h3>
        <template v-for="todo in toDoList" :key="todo.time">
          <CurrentDayDiary :time="todo.time" :activity="todo.activity" />
        </template>

      </div> -->
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

<style lang="scss">
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
        background: #494b68; 
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