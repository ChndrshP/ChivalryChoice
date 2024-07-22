import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/users/userSlice";

//store

const store = configure({
    reducer:{
        users: userReducer
    }
})

export default store