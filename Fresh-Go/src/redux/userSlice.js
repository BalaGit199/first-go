import {createSlice} from '@reduxjs/toolkit'

const intialState = {
    user:{}
};

export const userSlice = createSlice({
    name:"user",
    initialState : intialState,
    reducers:{
        loginRedux : (state,action) => {
             state.user = action.payload.userdata
            console.log("state user",state.user)
             console.log("action",action.payload.userdata)

        }
    }
})
export const {loginRedux} = userSlice.actions
export default userSlice.reducer