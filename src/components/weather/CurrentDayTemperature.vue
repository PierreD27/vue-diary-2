<script lang="ts" setup>
import { onMounted, ref } from 'vue'

interface Props {
  temp_c: number
  temp_f: number
  isCel: boolean
  humidity: number
  condition: string
  location: string
  country: string
  wind_kph: number
  wind_mph: number
  pressure_mb: number
  chance_of_rain: number
  chance_of_snow: number
  sunrise: string
  sunset: string
  icon_path: string
}

const props = defineProps<Props>()
const imageUrl = ref('')
onMounted(() => {
  imageUrl.value = new URL(`/src/assets/${props.icon_path}`, import.meta.url).href
})
</script>

<template>
  <div class="weather-info-wrapper">
    <h2>{{ location }}, {{ country }}</h2>
    <div class="current-day-temperature-wrapper">
      <div class="img-wrapper">
        <img v-if="imageUrl" :src="imageUrl" />
      </div>

      <div class="current-day-temperature-info">
        <h3 v-if="isCel">{{ Math.round(temp_c) }}°C</h3>
        <h3 v-else>{{ Math.round(temp_f) }}°F</h3>
        <p>{{ condition }}</p>

        <p><img src="@/assets/images/icons/sunrise.svg" alt="" />{{ sunrise }}</p>

        <p><img src="@/assets/images/icons/sunset.svg" alt="" />{{ sunset }}</p>
      </div>
    </div>
    <div class="current-day-temperature-additional-info">
      <div class="additional-info-item">
        <img src="@/assets/images/icons/wind.svg" />
        <span v-if="isCel"> {{ wind_kph }} km/h</span>
        <span v-else> {{ wind_mph }} MPH </span>
      </div>
      <div class="additional-info-item">
        <img src="@/assets/images/icons/humidity.svg" /> <span> {{ humidity }}% </span>
      </div>
      <div class="additional-info-item">
        <img src="@/assets/images/icons/rain-probability.svg" />
        <span v-if="chance_of_rain === 0 && chance_of_snow === 0">{{ chance_of_rain }}%</span>
        <span v-else-if="chance_of_rain > chance_of_snow">{{ chance_of_rain }}%</span>
        <span v-else>{{ chance_of_snow }}%</span>
      </div>
      <div class="additional-info-item">
        <img src="@/assets/images/icons/air-pressure.svg" />
        <span>{{ Math.ceil(pressure_mb / 1.333) }} mmHg </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.weather-info-wrapper {
  background-color: #022140;
  display: flex;
  flex-direction: column;
  min-width: 45%;
  border-radius: 0.5rem;

  @media screen and (max-width: 720px) {
    width: 96%;
    margin: 0 auto;
  }

  h2 {
    padding-top: 1rem;
    padding-bottom: 0.5rem;
    padding-left: 1rem;
    background-color: #1e4258;
    border-radius: 0.5rem 0.5rem 0 0;
  }

  .current-day-temperature-wrapper {
    display: flex;
    gap: 1rem;
    margin: 0 1rem;
    margin-top: 1rem;

    @media screen and (max-width: 720px) {
      justify-content: center;
    }

    .img-wrapper {
      width: 13.5rem;

      img {
        width: 100%;
      }
    }
    .current-day-temperature-info {
      width: 50%;

      h3 {
        text-align: center;
        font-size: 50px;
        font-weight: 600;
        margin-top: 0.7rem;
        margin-bottom: 0.5rem;
      }

      p {
        display: flex;
        text-align: center;
        justify-content: center;
        font-size: 20px;
        align-items: center;
        margin-bottom: 0.5rem;
      }
      img {
        height: 2.3rem;
        width: 2.3rem;
      }
    }
  }
  .current-day-temperature-additional-info {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 1rem;

    @media screen and (max-width: 720px) {
      flex-wrap: wrap;
    }

    .additional-info-item {
      display: flex;
      align-items: center;
      text-align: center;
      height: 3rem;
      width: 22%;
      background-color: #1e4258;
      padding: 0.2rem 0.2rem;
      margin: 1em auto;
      border-radius: 1rem;

      @media screen and (max-width: 720px) {
        width: 42%;
        justify-content: center;
      }

      span {
        font-size: 14px;
        text-align: center;
      }
      img {
        float: left;
        height: 80%;
      }
    }
  }
}
</style>
