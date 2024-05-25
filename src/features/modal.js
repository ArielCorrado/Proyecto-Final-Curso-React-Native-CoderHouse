import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({                                                                         //Estado global del modal para que pueda ser abierto por cualquier componente
    name: "modal",
    initialState: {
        value: {show: false, text: "", icon: "", redirect: "", params: "", showCancelButton: false}
    },
    reducers: {
        modal: (state, {payload}) => {                                          
            state.value = payload;
        },
    },
});

export const { modal } = modalSlice.actions;
export default modalSlice.reducer; 