<script lang="ts" setup>

import {useTodoListStore} from '@/stores/todoList'
import AddTask from './AddTask.vue';
import { storeToRefs } from 'pinia'


const store = useTodoListStore();


const {todoList} = storeToRefs(store);

const { toggleCompleted, deleteTodo, editTodo } = store;

</script>


<template>
   
    
    
    
    <div class="task-list-container">

        <h2>Today's To Do List</h2>
        
        <div class="task-list-wrapper"> 

            <div>
                <AddTask/>
            </div>

            <div class='task-items-wrapper'>
                <div v-for="todo in todoList" :key="todo.id" class="todo-item">
                    <div @click.stop="toggleCompleted(todo.id)" class="checkmark button" :class="{ completed: todo.completed }">
                        <img  src="/src/assets/images/icons/checkmark.svg">
                    </div>
                    <p v-if="!todo.editing">{{ todo.time }} {{ todo.item }}</p>
                    <div v-else>
                        <input v-model="todo.item" type="text"/>
                        <input v-model="todo.time" type="time">
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
        margin-top: 1rem;
        display: flex;
        background-color: #022140;
        flex-direction:column;
        border-radius: 0.5rem;

        h2{
            padding-top: 1rem;
            padding-bottom: 0.5rem;
            margin-bottom: 0.5rem;
            padding-left: 1rem;
            background-color: #1e4258;
            border-radius: 0.5rem 0.5rem  0 0 ;
        }
        .task-list-wrapper{
            padding-left: 1rem;
            
            

            .task-items-wrapper{
                width:50%;
                

                .todo-item{
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    

                    .button{
                        display:flex;
                        width: 2rem;
                        height: 2rem;
                        border-radius:1rem;
                        margin-right: 1rem;
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
                }
            }


        }
        
        
        }
</style>