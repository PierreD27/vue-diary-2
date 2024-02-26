<script lang="ts" setup>

interface Props {
    todayWeatherData:any,
    isCel:boolean,
}

const props=defineProps<Props>()


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs';

const labels:string[]=[];
const dataCel:number[]=[];
const dataFahr:number[]=[];
let maxtemp_c:number=0;
let maxtemp_f:number=0;
let mintemp_c:number=0;
let mintemp_f:number=0;

function getChartData(){
    maxtemp_c=Math.round(props.todayWeatherData[0].hourTemp_c);
    mintemp_c=Math.round(props.todayWeatherData[0].hourTemp_c);
    maxtemp_f=Math.round(props.todayWeatherData[0].hourTemp_f);
    maxtemp_f=Math.round(props.todayWeatherData[0].hourTemp_f);
    for (let i=0; i<props.todayWeatherData.length; i++){
        labels[i]=props.todayWeatherData[i].hour;
        dataCel[i]=Math.round(props.todayWeatherData[i].hourTemp_c);
        dataFahr[i]=Math.round(props.todayWeatherData[i].hourTemp_f);

        if (maxtemp_c<dataCel[i]){
            maxtemp_c=dataCel[i];
            maxtemp_f=dataFahr[i];
        }
        else if (mintemp_c>dataCel[i]){
            mintemp_c=dataCel[i];
            mintemp_f=dataFahr[i];
        }
        else{
            continue;
        }
    }
    maxtemp_c+=2;
    maxtemp_f+=2;
    mintemp_c-=2;
    mintemp_f-=2;
}
getChartData()

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
const chartDataCel = {
    labels: labels,
    datasets: [
        {
        label: 'Temperature °C ',
        backgroundColor: 'white',
        borderColor: 'rgb(75, 192, 192)',
        data: dataCel
        }
    ]
};
const chartDataFahr = {
    labels: labels,
    datasets: [
        {
        label: 'Temperature °F ',
        backgroundColor: 'white',
        borderColor: 'rgb(75, 192, 192)',
        data: dataFahr
        }
    ]
};
const optionsCel = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
      y: {
        min: mintemp_c,
        max: maxtemp_c,
        
      }
  }  
}
const optionsFahr = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
      y: {
        min: mintemp_f,
        max: maxtemp_f,
        
      }
  }  
}

</script>

<template>
    <div class="canvas-container">
        <h2>Curent Day Weather Chart</h2>
        <div class="canvas-wrapper">
           
            <Line v-if="isCel" :data="chartDataCel" :options="optionsCel"/>
            <Line v-else :data="chartDataFahr" :options="optionsFahr"/>
        </div>
    </div>  
</template>

<style lang="scss" scoped>
    .canvas-container{
        display: flex;
        flex-direction: column;
        height: 100%;
        background-color: #022140;
        border-radius: 0.5rem;

        h2{
            padding-top: 1rem;
            padding-bottom: 0.5rem;
            padding-left: 1rem;
            background-color: #1e4258;
            border-radius: 0.5rem 0.5rem  0 0 ;
            margin-bottom: 0.5rem;
        }
    .canvas-wrapper{
        padding: 0 1rem;
        height: 17.5rem;
        
        
     


    }

}
    



</style>
