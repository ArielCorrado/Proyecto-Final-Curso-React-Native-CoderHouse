import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
    name: "modal",
    initialState: {
        value: {show: false, text: "", icon: ""}
    },
    reducers: {
        modal: (state, {payload}) => {
            state.value = payload;
        },
    },
});

export const { modal } = modalSlice.actions;
export default modalSlice.reducer; 