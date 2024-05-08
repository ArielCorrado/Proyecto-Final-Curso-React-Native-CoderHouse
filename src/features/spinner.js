import { createSlice } from "@reduxjs/toolkit";

export const spinnersSlice = createSlice({
    name: "spinner",
    initialState: {
        value: {show: false, size: 75}
    },
    reducers: {
        spinner: (state, {payload}) => {
            state.value = payload;
        },
    },
});

export const { spinner } = spinnersSlice.actions;
export default spinnersSlice.reducer; 