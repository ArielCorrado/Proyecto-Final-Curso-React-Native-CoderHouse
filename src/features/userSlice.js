import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        value: {
            email: "", 
            idToken: "",
            refreshToken: "",
            expiresIn: "",
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
                registered: false,
            }
        }
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer; 