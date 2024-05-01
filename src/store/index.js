import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import searchReducer from "../features/searchSlice";
import { shopApi } from "../services/firebaseDB";
import { setupListeners } from "@reduxjs/toolkit/query";

export default store = configureStore({
    reducer: {
        cart: cartReducer,
        search: searchReducer,
        [shopApi.reducerPath]: shopApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shopApi.middleware)
});

setupListeners(store.dispatch);

