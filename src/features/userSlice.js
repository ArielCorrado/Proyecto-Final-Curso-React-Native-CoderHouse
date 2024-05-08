import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        value: {
            email: "", 
            idToken: "",
            refreshToken: "",
            expiresIn: "",
            localId: "",
            registered: false,
        }
    },
    reducers: {
        setUser: (state, {payload}) => {
            state.value = payload;
        },
        clearUser: (state) => {
            state.value = {
                email: "",
                idToken: "",
                refreshToken: "",
                expiresIn: "",
                localId: "",
                registered: false,
            }
        }
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer; 