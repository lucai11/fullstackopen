import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
      good: 0,
      ok: 0,
      bad: 0
  },

  reducers: {
      increment_good: state => {
          state.good += 1
      },
      increment_ok: state => {
          state.ok += 1
      },
      increment_bad: state => {
          state.bad += 1
      },
      reset_count: state => {
        state.good = 0
        state.ok = 0
        state.bad = 0
      }

  }
})

export const { increment_good, increment_ok, increment_bad, reset_count } = counterSlice.actions

export default counterSlice.reducer