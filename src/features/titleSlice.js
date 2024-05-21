import { createSlice } from "@reduxjs/toolkit";

export const titleSlice = createSlice({
    name: "title",
    initialState: {
        value: ""
    },
    reducers: {
        setTitle: (state, {payload}) => {
            state.value = payload;
        },
    },
});

export const { setTitle } = titleSlice.actions;
export default titleSlice.reducer; 