import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addToCart: (state, {payload}) => {
            const itemExist = state.find((item) => item.id === payload.id);
            if (itemExist) {
                itemExist.quantity += 1;
            } else {
                state.push({id: payload.id, quantity: 1});
            }
        },
        subtractToCart: (state, {payload}) => {
            const itemExist = state.find((item) => item.id === payload.id);
            if (itemExist && itemExist.quantity > 1) {
                itemExist.quantity -= 1;
            } else if (itemExist && itemExist.quantity === 1) {
                const indexToDelete = state.findIndex((item) => item.id === payload.id);
                state.splice(indexToDelete, 1);
            }
        },
        deleteItem: (state, {payload}) => {
            const indexToDelete = state.findIndex((item) => item.id === payload.id);
            state.splice(indexToDelete, 1);
        },
    },
}); 

export const { addToCart, subtractToCart, deleteItem} = cartSlice.actions;
export default cartSlice.reducer;