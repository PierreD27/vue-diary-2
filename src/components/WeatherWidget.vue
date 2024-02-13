<script setup lang="ts">
import DailyUpdate from './days/DailyUpdate.vue';
//import WeatherGetApi from '@/services/WeatherGetApi.js'
import axios from 'axios'
import HourlyUpdate from './days/HourlyUpdate.vue';
import CurrentDayTemperature from './days/CurrentDayTemperature.vue';
import CurrentDayDiary from './days/CurrentDayDiary.vue';
import { ref, onMounted } from 'vue';

const currentWeather= ref()

onMounted(()=>{
  axios.get('http://api.weatherapi.com/v1/current.json?key=2cacdf679ade4b979d471305241302&q=Bishkek')
    .then((response)=> {
      currentWeather.value=response.data
      console.log(currentWeather.value)
    })
    .catch((error)=>{
      console.log(error)
    })

})

const hourly = ref([
  {
    temperature: '2',
    hour: '11:00'
  },
  {
    temperature: '3',
    hour: '12:00'
  },
  {
    temperature: '5',
    hour: '13:00'
  },
  {
    temperature: '6',
    hour: '14:00'
  },
  {
    temperature: '7',
    hour: '15:00'
  }
])

const daily = ref([
  {
    min: '1',
    max: '5',
    day: 'Monday'
  },
  {
    min: '3',
    max: '7',
    day: 'Thuesday'
  },
  {
    min: '4',
    max: '7',
    day: 'Wednesday'
  },
  {
    min: '2',
    max: '3',
    day: 'Thrsday'
  },
  {
    min: '4',
    max: '8',
    day: 'Friday'
  },
  {
    min: '-2',
    max: '1',
    day: 'Saturday'
  },
])

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
  <div class="container weather-widget-wrapper">
    <div class="hero-section">
        <div class="current-day-wrapper">
        
        <CurrentDayTemperature/>
      

        <div class='current-day-diary-wrapper'>
            <h3 class="title">Список дел на сегодня</h3>
            <template v-for="todo in toDoList" :key="todo.time">
            <CurrentDayDiary :time="todo.time" :activity="todo.activity" />
            </template>

        </div>
      

      
      </div>

      <div class="hourly-wrapper">
        <h3 class="title">Погода в течение дня</h3>

        <div class="hourly-items">
          <template v-for="h in hourly" :key="h.hour">
            <HourlyUpdate :hour="h.hour" :temperature="h.temperature" />
          </template>
        </div>
      </div>
    </div>

    <div class="daily-wrapper">
      <template v-for="d in daily" :key="d.day">
        <DailyUpdate :day="d.day" :min="d.min" :max="d.max" />
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