import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Reduce/CartSlice.js"

const store = configureStore({
    reducer:{
        cart: cartReducer
    }
})

export default store;