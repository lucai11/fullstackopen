import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    message: null
}

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        set: (state, action) => {
            state.message = action.payload
        }
    }
})

export const { set } = notificationSlice.actions

export default notificationSlice.reducer