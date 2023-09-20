import {createSlice} from '@reduxjs/toolkit'

const initialstate = []

const productSlice = createSlice({
    name:"product",
    initialState:initialstate,
    reducers:{
        setProductData :(state,action) => {
            state = [...action.payload]
            console.log("all product",action.payload)
        }
    }
})

export default productSlice.reducer
export const {setProductData} = productSlice.actions