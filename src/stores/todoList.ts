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
      this.todoList.sort(function (a, b) {
        if (a.time > b.time) {
          return 1
        }
        if (a.time < b.time) {
          return -1
        }
        return 0
      })
    },

    editTodo(idToFind: number) {
      const todo = this.todoList.find((obj) => obj.id === idToFind)
      if (todo) {
        todo.editing = !todo.editing
        console.log(todo)
        const timeIndex: number = +todo.time.slice(0, 2)
        const todayWeatherDataStore = useTodayWeatherDataStore()
        let previousTime: string = '00:00'
        if (todo.editing) {
          previousTime = todo.time
        } else {
          if (previousTime !== todo.time) {
            if (todayWeatherDataStore) {
              todo.condition = todayWeatherDataStore.todayWeatherData[timeIndex].condition
              todo.icon_path = todayWeatherDataStore.todayWeatherData[timeIndex].icon_path
              todo.temp_c = todayWeatherDataStore.todayWeatherData[timeIndex].hourTemp_c
              todo.temp_f = todayWeatherDataStore.todayWeatherData[timeIndex].hourTemp_f
            }
            this.todoList.sort(function (a, b) {
              if (a.time > b.time) {
                return 1
              }
              if (a.time < b.time) {
                return -1
              }
              return 0
            })
          }
        }
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
