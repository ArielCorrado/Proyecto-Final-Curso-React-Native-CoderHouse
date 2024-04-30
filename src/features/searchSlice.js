import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
    name: "search",
    initialState: {value: ""},
    reducers: {
        searchText: (state, {payload}) => {
            state.value = payload;
        },
    },
});

export const { searchText } = searchSlice.actions;
export default searchSlice.reducer; 