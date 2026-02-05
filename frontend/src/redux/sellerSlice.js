import { createSlice } from "@reduxjs/toolkit"

const sellerSlice=createSlice({
    name:"seller",
    initialState:{
        myShopData:null,
    },
    reducers:{
        setMyShopData:(state,action)=>{
        state.myShopData=action.payload
        }
    }
})

export const {setMyShopData}=sellerSlice.actions
export default sellerSlice.reducer