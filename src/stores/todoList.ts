
import { defineStore } from "pinia";

type todoItem={
    id:number
    item:string,
    time:string,
    completed:boolean,
    editing: boolean,
}

type State={
    todoList: todoItem[]
    id:number
}
export const useTodoListStore = defineStore ('todoList', {
    //state
    state: (): State => ({
        todoList:[],
        id:0
    }),
    //getters


    //actions

    actions:{
        addTodo(item:string, time:string) {
            this.todoList.push( { id: this.id++, item , time, completed: false, editing:false});
        },

        editTodo(idToFind:number){
            const todo = this.todoList.find((obj) => obj.id === idToFind);
            if (todo){
                todo.editing=!todo.editing;
            }
            
        },
        deleteTodo(itemId:number){
            this.todoList = this.todoList.filter((object)=>{
                return object.id !== itemId
            })       
         },
        
         toggleCompleted(idToFind:number){
            const todo = this.todoList.find((obj) => obj.id === idToFind)
            if (todo) {
                todo.completed = !todo.completed;
            }
        },


    }
})

