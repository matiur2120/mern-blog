import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    error: null,
    loading: false
}
const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {

    }

})