import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem('token') || null
}

const loginSystem = createSlice({
    name : "auth",
    initialState,
    reducers:{
        setToken:(state,action) =>{
            state.token = action.payload;
            localStorage.setItem('token',action.payload)
        },
        clearToken:(state) =>{
            state.token = null;
            localStorage.clear()
        }
    }
})

export const {setToken,clearToken} = loginSystem.actions;
export default loginSystem.reducer;
