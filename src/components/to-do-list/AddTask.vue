<script lang="ts" setup>


import {ref} from 'vue'
import { useTodoListStore } from '@/stores/todoList'



const todo = ref ('')
const clock = ref ('00:00')

const store= useTodoListStore()

function addTaskAndClear(item:string, time:string){
    if (item.length===0){
        return
    }
    store.addTodo(item, time);
    todo.value='';
    clock.value='00:00';
}
</script>

<template>
    <form @submit.prevent="addTaskAndClear(todo, clock)"> 
        <input v-model="todo" type="text"/>
        <input v-model="clock" type="time">
        <button>Add</button>
    </form> 
</template>

<style lang="scss" scoped>



</style>