import {createSlice} from "@reduxjs/toolkit"


const cartData = {
     allCartData : [],
     allCartLength : 0
}

const cartSlice = createSlice({
    name:'cart',
    initialState:cartData,
    reducers:{

        setAllCartdata:(state,value) =>{
            state.allCartData = value.payload
            console.log("payload data",value.payload)
        },

        setLengthCart:(state,value) => {
            state.allCartLength = value.payload
            console.log("cart length",value.payload)
        }

    }
})

export default cartSlice.reducer
export const {setAllCartdata,setLengthCart} = cartSlice.actions