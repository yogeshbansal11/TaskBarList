import { configureStore } from '@reduxjs/toolkit'
import loginSystem from './slice.jsx'
export const store = configureStore({
  reducer: {
    auth:loginSystem,
  },
})



