import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({                                    //Texto del input del buscador que se pasa a la screen de listado de productos
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