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
                state.push(payload);
            }
        },
    },
}); 

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;