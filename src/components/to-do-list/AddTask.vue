<script lang="ts" setup>


import {ref} from 'vue'
import { useTodoListStore } from '@/stores/todoList'
import { useTodayWeatherDataStore } from '@/stores/todoList'



const todo = ref ('')
const clock = ref ('00:00')

const todoStore= useTodoListStore()
const todayWeatherDataStore=useTodayWeatherDataStore()

function addTaskAndClear(item:string, time:string){
    if (item.length===0){
        return
    }
    if (todayWeatherDataStore)
    {
        const timeHour:number=+(time.slice(0,2));
        const condition:string=todayWeatherDataStore.todayWeatherData[timeHour].condition;
        const icon_path:string=todayWeatherDataStore.todayWeatherData[timeHour].icon_path;
        const temp_c:number=todayWeatherDataStore.todayWeatherData[timeHour].hourTemp_c;
        const temp_f:number=todayWeatherDataStore.todayWeatherData[timeHour].hourTemp_f;
        todoStore.addTodo(item, time, condition, icon_path, temp_c, temp_f );
        todo.value='';
        clock.value='00:00';
    }
    
}
</script>

<template>
    <div class="add-task-wrapper">
        <form @submit.prevent="addTaskAndClear(todo, clock)"> 
            <span id="add-task-span">Add New Task:</span>
            <input v-model="todo" type="text"/>
            <input id="clock" v-model="clock" type="time">
            <button>Add</button>
        </form> 
    </div>
</template>

<style lang="scss" scoped>
    .add-task-wrapper{
        padding-top: 0.5rem;

        padding-left: 1rem;
        align-items: center;

        @media screen and (max-width: 720px) {
            padding-left: 0;

        }
        form{
            display: flex;
            align-items: center;

            @media screen and (max-width: 720px){
                margin: 0, auto;
                justify-content: center;
            }

            #add-task-span{
                @media screen and (max-width: 720px) {
                    display: none;
                }
            }
            
            span{
                padding-right: 0.5rem;
                font-weight: 600;
            }
            input{
                height: 1.3rem;
                border-radius: 0.5rem;
                margin-right: 0.5rem;
                font-family: "DM Sans", sans-serif;;
                font-size: 16px;

            
            }
            #clock{
                    font-weight: 800;
                    height: 1.55rem;
                    border: 0;
                    
                    
                }
            button{
                font-size: 16px;
                color: white;
                font-weight: 600;
                font-family: "DM Sans", sans-serif;;
                height: 1.6rem;
                border-radius: 0.5rem;
                background-color: #BCAB79 ;
                border: 0;
            }
        }
    }

</style>