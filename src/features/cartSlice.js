import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addToCart: (state, {payload}) => {
            state.push(payload);
        },
    },
}); 

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;