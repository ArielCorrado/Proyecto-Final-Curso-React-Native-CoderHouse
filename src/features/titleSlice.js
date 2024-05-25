import { createSlice } from "@reduxjs/toolkit";

export const titleSlice = createSlice({                                                 //Titulo de sección que aparece en el menú
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