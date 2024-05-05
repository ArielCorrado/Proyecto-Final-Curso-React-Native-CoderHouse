import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import searchReducer from "../features/searchSlice";
import { shopApi } from "../services/firebaseDB";
import { setupListeners } from "@reduxjs/toolkit/query";
import userReducer from "../features/userSlice";
import { authApi } from "../services/firebaseAuth";

export default store = configureStore({
    reducer: {
        cart: cartReducer,
        search: searchReducer,
        user: userReducer,
        [shopApi.reducerPath]: shopApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
            .concat(shopApi.middleware)
            .concat(authApi.middleware),
});

setupListeners(store.dispatch);

