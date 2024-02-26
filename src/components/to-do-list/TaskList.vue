<script lang="ts" setup>

import {useTodoListStore} from '@/stores/todoList'
import AddTask from './AddTask.vue';
import { storeToRefs } from 'pinia'

interface Props{
  isCel:boolean,
}

defineProps<Props>()

const toDoStore = useTodoListStore();


const {todoList} = storeToRefs(toDoStore);

const { toggleCompleted, deleteTodo, editTodo } = toDoStore;

</script>


<template>
   
    
    
    
    <div class="task-list-container">

        <h2>Today's To Do List</h2>
        
        <div class="task-list-wrapper"> 

            <AddTask/>

            <div class='task-items-wrapper'>
                <div v-for="todo in todoList" :key="todo.id" class="todo-item">
                    <div @click.stop="toggleCompleted(todo.id)" class="checkmark button" :class="{ completed: todo.completed }">
                        <img  src="/src/assets/images/icons/checkmark.svg">
                    </div>

                    <div class="display-info" v-if="!todo.editing"> 
                        <span>{{ todo.time }}</span>
                        <p id="task-text">{{ todo.item }} </p> 
                        <span>Estimated weather:</span>
                        <img :src="todo.icon_path">
                        <p class="task-temperature" v-if="isCel">{{Math.round( todo.temp_c )}}°C</p>
                        <p class="task-temperature" v-else> {{ Math.round( todo.temp_f ) }}°F</p>
                        <p class="weather-condition">{{ todo.condition }}</p>
                    </div>
                    <div class="edit-display" v-else>
                        <input v-model="todo.item" type="text" >
                        <input v-model="todo.time" type="time" id="clock">
                    </div>

                    <div @click="editTodo(todo.id)" class="edit button">
                        <img  src="/src/assets/images/icons/edit.svg">
                    </div>                    
                    <div @click="deleteTodo(todo.id)" class="delete button">
                        <img  src="/src/assets/images/icons/delete.svg">
                    </div>
                    
                </div> 
            </div>       
            

        </div>

        

    </div>
</template>


<style lang="scss" scoped >
    .task-list-container{
        display: flex;
        background-color: #022140;
        flex-direction:column;
        margin-top: 1rem;
        border-radius: 0.5rem;
        min-height: 15rem;

        h2{
            padding-top: 1rem;
            padding-bottom: 0.5rem;
            
            padding-left: 1rem;
            background-color: #1e4258;
            border-radius: 0.5rem 0.5rem  0 0 ;
        }
        .task-list-wrapper{
            
            width: 100%;

            .task-items-wrapper{
                padding-left: 1rem;
                padding-right: 1rem;
            
                

                .todo-item{
                    background-color:#1e4258;
                    margin-bottom: 0.75rem;
                    padding-left: 1rem;
                    gap: 1rem;
                    height: 3rem;
                    border-radius: 0.5rem;
                    display: flex;
                    align-items: center;
                    
                    
                    .display-info{
                        display: flex;
                        align-items: center;
                        gap: 1rem;

                        #task-text{
                            width: 20rem;
                        }
                        .weather-condition{
                            width: 15rem;
                        }
                        .task-temperature{
                            width: 2rem;
                            text-align: right;
                        }
                        
                    }
                    

                    .button{
                        display:flex;
                        width: 2rem;
                        height: 2rem;
                        border-radius:1rem;
                        justify-content: center;
                        align-items: center;
                        
                        img{
                            width: 70;
                        }
                    }

                    .checkmark{
                        background-color:#2d5f5d;
                    }
                    

                    .edit{
                        background-color:#CDC392;
                    }
                    .delete{
                        background-color:#DB2B39;
                    }

                    .completed {
                        background-color:#BCAB79; 
                    }


                    .edit-display{
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        width: 55.95rem;
                        input{
                            height: 1.3rem;
                            border-radius: 0.5rem;
                            margin-right: 0.5rem;
                            font-family: "DM Sans", sans-serif;;
                            font-size: 16px;

                        
                        }
                        #clock{
                            font-weight: 800;
                            height: 1.5rem;

                        }
                    }
                }       
            }


        }
        
        
    }
</style>