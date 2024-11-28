import { configureStore } from '@reduxjs/toolkit'
import reducer from '../features/task/taskListSlice'

const store = configureStore({
  reducer: {
    taskList: reducer
  },
})

export default store