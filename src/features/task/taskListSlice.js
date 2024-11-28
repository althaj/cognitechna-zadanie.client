import { createSlice } from '@reduxjs/toolkit'

import config from "../../config/config.js"

export const taskListSlice = createSlice({
  name: 'taskList',
  initialState: {
    tasks: [],
    editingTask: null,
    isAwaiting: false
  },
  reducers: {
    onGetTasks: (state, action) => {
      state.tasks = action.payload
    },
    onInsertTask: (state, action) => {
      let index = state.tasks.findIndex(x => x.Id == action.payload.Id)
      if (index < 0) {
        state.tasks.push(action.payload)
      }
    },
    onUpdateTask: (state, action) => {
      let index = state.tasks.findIndex(x => x.Id == action.payload.Id)
      state.tasks[index].Title = action.payload.Title
      state.tasks[index].Description = action.payload.Description
    },
    onRemoveTask: (state, action) => {
      let index = state.tasks.findIndex(x => x.Id == action.payload)
      if (index > -1) {
        state.tasks.splice(index, 1)
      }

      if(state.editingTask.Id === action.payload) {
        state.editingTask = null
      }
    },
    onSetEditingTask: (state, action) => {
      if(state.editingTask != null && state.editingTask.Id === action.payload) {
        state.editingTask = null
      } else {
        let index = state.tasks.findIndex(x => x.Id == action.payload)
        if (index > -1) {
          state.editingTask = state.tasks[index]
        }
      }
    },
    onSetAwaiting: (state, action) => {
      state.isAwaiting = action.payload
    }
  }
})

export const getTasks = () => async dispatch => {
  const response = await fetch(config.SERVER_URL + '/api/tasks')
  dispatch(onGetTasks(await response.json()))
}

export const insertTask = task => async () => {
  await fetch(config.SERVER_URL + '/api/tasks', {
    method: "POST",
    body: JSON.stringify(task),
    headers: {
      "Content-Type": "application/json",
    }
  })
}

export const updateTask = (id, task) => async () => {
  await fetch(config.SERVER_URL + '/api/tasks/' + id, {
    method: "PUT",
    body: JSON.stringify(task),
    headers: {
      "Content-Type": "application/json",
    }
  })
}

export const removeTask = id => async () => {
  await fetch(config.SERVER_URL + '/api/tasks/' + id, {
    method: "DELETE"
  })
}

export const processHeavyTask = (id) => async dispatch => {
  dispatch(onSetAwaiting(true))
  await fetch(config.SERVER_URL + '/api/tasks/process-heavy/' + id)
  dispatch(onSetAwaiting(false))
}

// Action creators are generated for each case reducer function
export const { onGetTasks, onInsertTask, onUpdateTask, onRemoveTask, onSetEditingTask, onSetAwaiting } = taskListSlice.actions

export default taskListSlice.reducer