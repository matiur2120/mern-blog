import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    currentUser: null,
    error: null,
    loading: false
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) =>{
            state.loading = true,
            state.error = null
        },
        signInSuccess: (state, action) =>{
            state.loading = false,
            state.error = null,
            state.currentUser = action.payload
        },
        signInFailure: (state, action) =>{
            state.loading = false,
            state.error = action.payload,
            state.currentUser = null
        },
        updateStart: (state) =>{
            state.loading = true,
            state.error = null
        },
        updateSuccess: (state, action) =>{
            state.loading = false,
            state.error = null,
            state.currentUser = action.payload
        },
        updateFailure: (state, action) =>{
            state.loading = false,
            state.error = action.payload

        },
        deleteUserStart: (state) =>{
            state.loading = true,
            state.error = null
        },
        deleteUserSuccess: (state) =>{
            state.loading = false,
            state.error = null,
            state.currentUser = null
        },
        deleteUserFailure: (state, action) =>{
            state.loading = false,
            state.error = action.payload
        },
        signOutSuccess: (state) =>{
            state.currentUser = null,
            state.loading =false,
            state.error = null
        }

    }
})

export const {signInStart, signInFailure, signInSuccess, updateFailure, updateStart, updateSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutSuccess} = userSlice.actions;
export default userSlice.reducer;
