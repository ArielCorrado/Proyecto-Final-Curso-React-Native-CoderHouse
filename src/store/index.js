import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import searchReducer from "../features/searchSlice";
import userReducer from "../features/userSlice";
import modalReducer from "../features/modal";
import spinnerReducer from "../features/spinner";
import favoritesReducer from "../features/favoritesSlice";
import titleReducer from "../features/titleSlice";
import { shopApi } from "../services/firebaseDB";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "../services/firebaseAuth";

export default store = configureStore({
    reducer: {
        cart: cartReducer,
        search: searchReducer,
        user: userReducer,
        modal: modalReducer,
        spinner: spinnerReducer,
        favorites: favoritesReducer,
        title: titleReducer,
        [shopApi.reducerPath]: shopApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
            .concat(shopApi.middleware)
            .concat(authApi.middleware),
});

setupListeners(store.dispatch);

