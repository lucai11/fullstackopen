import { createSlice } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'


const initialState = {
    users: [],
    currentUser: null
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        currentUser: (state, action) => {
            state.currentUser = action.payload
        },
        logoutUser: (state) => {
            state.currentUser = null
        }
    }
})

export const { currentUser, setAllUsers, logoutUser } = usersSlice.actions

export default usersSlice.reducer