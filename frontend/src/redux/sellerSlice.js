import { createSlice } from "@reduxjs/toolkit"

const sellerSlice=createSlice({
    name:"seller",
    initialState:{
        myShopData:null,
    },
    reducers:{
        setMyShopData:(state,action)=>{
        state.myShopData=action.payload
        },
        clearSellerData:(state)=>{
            state.myShopData=null
        }
    }
})

export const {setMyShopData, clearSellerData}=sellerSlice.actions
export default sellerSlice.reducer