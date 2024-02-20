<script setup lang="ts">
import { ref } from 'vue';

const isCel=ref<boolean>(true)
const cityName=ref<string>('')

const emit=defineEmits([
  
  'toggleWeatherUnit',
  'cityChanged'
])

function onInputChange(){
  isCel.value=!isCel.value
  emit('toggleWeatherUnit', isCel.value)
  
}
let timerId:null|number = null
function onCityChange(value:string){
  cityName.value=value;
  if (timerId){
    clearTimeout(timerId)
  }
  timerId = setTimeout( ()=>{
    emit('cityChanged', cityName.value)
  }, 1000)
 
}

 

</script>

<template>
 <div class="navbar-wrapper">
    <div class="logo"><h1>SNS Weather Channel</h1></div>
    <div class="nav-buttons">
      <div class="change-location-wrapper">
        <input :value="cityName" @input="(e)=> onCityChange((e.target as HTMLInputElement).value) " type="text">
        
      </div>
      <div class="cel-fahr-radio">
        <div class="middle">
          <label>
            <input @change="onInputChange()" type="radio" name="radio" checked />
              <div class="box">
                <span>°C</span>
              </div>
          </label>
          <label>
              <input @change="onInputChange()" type="radio" name="radio" />
              <div class="box">
                <span>°F</span>
              </div>
          </label>    
        </div>
      </div>
    </div>
 </div> 
</template>

<style lang="scss">
.navbar-wrapper {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1rem;
  background-color: red;
  display: flex;
  justify-content: space-between;


  h1{
    font-size: 32px;
  }
  .nav-buttons {
    display: flex;
    float: right;
  
    .change-location-wrapper{
      display: flex;
    
      .change-location-button {
      background-color: #04AA6D; /* Green */
      border: none;
      color: white;
      
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 14px;
      }
    } 
    .cel-fahr-radio{

    
      .middle {
      width: 100%;
      text-align: center;
    
        input[type="radio"] {
          display: none;
          &:checked {
            + .box {
              background-color: green;
              span {
                color: white;
                &:before {
                  opacity: 1;
                }
              }
            }
          }
        }

        .box {
          
          background-color: white;
          transition: all 250ms ease;
          will-change: transition;
          display: inline-block;
          text-align: center;
          cursor: pointer;
          position: relative;
        
          
          span {
            position: relative;
            transform: translate(0, 0);
            text-align: center;
            left: 0;
            right: 0;
            transition: all 300ms ease;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 1.6em;
            user-select: none;
            color: green;
            &:before {
              font-family: Arial, Helvetica, sans-serif;
              display: block;
              opacity: 0;
              transition: all 300ms ease-in-out;
              font-weight: normal;
              color: white;
            }
          }
        }
      }
    }
  }
}


</style>