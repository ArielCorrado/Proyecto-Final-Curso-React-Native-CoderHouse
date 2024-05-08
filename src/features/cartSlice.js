import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        value: []
    },
    reducers: {
        addToCart: (state, {payload}) => {
            const itemExist = state.value.find((item) => item.id === payload);
            if (itemExist) {
                itemExist.quantity += 1;
            } else {
                state.value.push({id: payload, quantity: 1});
            }
        },
        subtractToCart: (state, {payload}) => {
            const itemExist = state.value.find((item) => item.id === payload);
            if (itemExist && itemExist.quantity > 1) {
                itemExist.quantity -= 1;
            } else if (itemExist && itemExist.quantity === 1) {
                const indexToDelete = state.value.findIndex((item) => item.id === payload);
                state.value.splice(indexToDelete, 1);
            }
        },
        deleteItem: (state, {payload}) => {
            const indexToDelete = state.value.findIndex((item) => item.id === payload);
            state.value.splice(indexToDelete, 1);
        },
        clearCart: (state) => {
            state.value.length = 0;
        },
        updateCart: (state, {payload}) => {
            state.value = payload;     
        }
    },
}); 

export const { addToCart, subtractToCart, deleteItem, clearCart, updateCart} = cartSlice.actions;
export default cartSlice.reducer;