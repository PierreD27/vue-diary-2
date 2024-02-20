<script lang="ts" setup>

interface Props {
    weatherByHour:any,
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

function getChartData(){
    for (let i=0; i<props.weatherByHour.length; i++){
        labels[i]=props.weatherByHour[i].hour;
        dataCel[i]=Math.round(props.weatherByHour[i].hourTemp_c);
        dataFahr[i]=Math.round(props.weatherByHour[i].hourTemp_f);
    }

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
const options = {
  responsive: true,
  maintainAspectRatio: false
}

</script>

<template>

    <div class="canvas-wrapper">
        <p>My Chart</p>
        <Line v-if="isCel" :data="chartDataCel" :options="options"/>
        <Line v-else :data="chartDataFahr" :options="options"/>
    </div>

</template>

<style lang="scss">
    .canvas-wrapper{
        display: flex;
        flex-direction: column;
        height: 19rem;
     


    }
 
    



</style>
