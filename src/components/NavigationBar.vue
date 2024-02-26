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
    
    <div class="logo-wrapper">
      <img src="\src\assets\images\icons\logo.svg" >
      <h1>SNS Weather Channel<sup>©</sup></h1>
    </div>
    <div class="nav-buttons">
      <div class="change-location-wrapper">
        <input :value="cityName" @input="(e)=> onCityChange((e.target as HTMLInputElement).value) " type="text" >
        
      </div>
      <div class="cel-fahr-radio">
        <div class="middle">
          <label>
            <input  @change="onInputChange()" type="radio" name="radio" checked />
              <div id="cel-radio" class="box">
                <span>°C</span>
              </div>
          </label>
          <label>
              <input  @change="onInputChange()" type="radio" name="radio" />
              <div id="fahr-radio" class="box">
                <span>°F</span>
              </div>
          </label>    
        </div>
      </div>
    </div>
 </div> 
</template>

<style lang="scss" scoped>
.navbar-wrapper {
  color: white;
  max-width: 1100px;
  margin: 1rem auto;
  padding: 1rem 1rem;
  border-radius: 0.5rem;
  background-color: #265077;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .logo-wrapper{
    display: flex;
    width: 70%;
    
    align-items: center;

    img{
      height: 100%;
      width: 3rem;

    } 
      
    h1{
    font-family: "DM Sans", sans-serif;;
    font-size: 45px;
    font-weight: 500;
    color: white;
    padding-left: 1rem;
    }
    
  }

  
  .nav-buttons {
    display: flex;
    float: right;
    padding-right: 1rem;
  
    .change-location-wrapper{
      display: flex;
      padding-right: 1rem;

      input{
        border-radius: 0.5rem;
      }

    } 
    .cel-fahr-radio{

     

      .middle {
      width: 100%;
      text-align: center;
        
      #cel-radio{
        border-radius: 0.5rem 0 0 0.5rem;
        padding-left: 0.1rem;
      }
      #fahr-radio{
        border-radius: 0 0.5rem 0.5rem 0;
        padding-right: 0.1 rem;
      }
    
        input[type="radio"] {
          display: none;
          &:checked {
            + .box {
              background-color: #1e4258;
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
            font-size: 1.6rem;
            padding-right: 0.2rem;
            user-select: none;
            color: #2d5f5d;
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