import { createSlice } from "@reduxjs/toolkit";

export const spinnersSlice = createSlice({                                                  //Todos los componentes tienen acceso a la apertura y cierre del spinner
    name: "spinner",
    initialState: {
        value: {show: false}
    },
    reducers: {
        spinner: (state, {payload}) => {
            state.value = payload;
        },
    },
});

export const { spinner } = spinnersSlice.actions;
export default spinnersSlice.reducer; 