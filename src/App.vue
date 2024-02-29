<script setup lang="ts">
import WeatherWidget from './components/WeatherWidget.vue';
import NavigationBar from '@/components/NavigationBar.vue';
import TaskList from './components/to-do-list/TaskList.vue';
import FooterAndCredits from './components/FooterAndCredits.vue';

import { ref } from 'vue';

const isCel=ref<boolean>(true)
const cityName=ref<string>('')


</script>

<template>
 <div class="container">
  <NavigationBar @toggle-weather-unit="isCel=$event"
    @city-changed="cityName=$event"
  />
  <WeatherWidget  :isCel="isCel" :city-name="cityName" />

  <TaskList :isCel="isCel"/>

  <FooterAndCredits/>
 </div>
</template> 

