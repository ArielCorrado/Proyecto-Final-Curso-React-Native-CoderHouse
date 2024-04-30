import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import searchReducer from "../features/searchSlice";

export default configureStore({
    reducer: {
        cart: cartReducer,
        search: searchReducer,
    },
});
