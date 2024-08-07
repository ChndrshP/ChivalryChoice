import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../../../utils/baseURL';

//initial state
const initialState = {
    loading: false,
    errro: false,
    users:[],
    user:{},
    profile:{},
    userAuth:{
        loading:false,
        error:null,
        userInfo: {},
    },
};

//login action
export const loginUserAction = createAsyncThunk(
    "users/login",
    async ({email, password}, { rejectWithValue, getState, dispatch }) => {
        try {
            //make the http request
            const res = await axios.post(`${baseURL}/users/login`, {
                email,
                password,
            });
            return res;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

//user slice
const userSlice = createSlice({
    name: "users",
    initialState,
    extraReducers: (builder)=>{
        //action handler
        //login
        builder.addCase(loginUserAction.pending, (state, action)=>{
            state.userAuth.loading = true;
        });;
        builder.addCase(loginUserAction.fulfilled, (state, action)=>{
            state.userAuth.userInfo = action.payload;
            state.userAuth.loading = false;
        });
        builder.addCase(loginUserAction.rejected, (state, action)=>{
            state.userAuth.userInfo = action.payload;
            state.userAuth.loading = false;
        });//newlinw
    },
});

//generate reducer

const userReducer = userSlice.reducer;

export default userReducer;