import { defineStore } from 'pinia'

type todoItem = {
  id: number
  item: string
  time: string
  condition: string
  icon_path: string
  temp_c: number
  temp_f: number
  completed: boolean
  editing: boolean
}

type todoState = {
  todoList: todoItem[]
  id: number
}

type todayWeatherDataItem = {
  hour: string
  condition: string
  icon_path: string
  hourTemp_c: number
  hourTemp_f: number
}
type todayWeatherDataState = {
  todayWeatherData: todayWeatherDataItem[]
}

export const useTodoListStore = defineStore('todoList', {
  state: (): todoState => ({
    todoList: [],
    id: 0
  }),

  actions: {
    addTodo(
      item: string,
      time: string,
      condition: string,
      icon_path: string,
      temp_c: number,
      temp_f: number
    ) {
      this.todoList.push({
        id: this.id++,
        item,
        time,
        condition,
        icon_path,
        temp_c,
        temp_f,
        completed: false,
        editing: false
      })
    },

    editTodo(idToFind: number) {
      const todo = this.todoList.find((obj) => obj.id === idToFind)
      if (todo) {
        todo.editing = !todo.editing
      }
    },
    deleteTodo(itemId: number) {
      this.todoList = this.todoList.filter((object) => {
        return object.id !== itemId
      })
    },

    toggleCompleted(idToFind: number) {
      const todo = this.todoList.find((obj) => obj.id === idToFind)
      if (todo) {
        todo.completed = !todo.completed
      }
    }
  }
})

export const useTodayWeatherDataStore = defineStore('todayWeatherData', {
  state: (): todayWeatherDataState => ({
    todayWeatherData: []
  }),

  actions: {
    addTodayWeatherData(todayWeatherData: any[]) {
      this.todayWeatherData = todayWeatherData
    },
    clearTodayWeatherData() {
      if (this.todayWeatherData) {
        this.todayWeatherData = []
      }
    }
  }
})
