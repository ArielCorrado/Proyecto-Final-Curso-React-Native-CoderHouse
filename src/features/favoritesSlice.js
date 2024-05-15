import { createSlice } from "@reduxjs/toolkit";

export const favoritesSlice = createSlice({
    name: "favorites",
    initialState: {
        value: []
    },
    reducers: {
        handleFavorites: (state, {payload}) => {
            const favoriteIndex = state.value.indexOf(payload);
            if (favoriteIndex !== -1) {
                state.value.splice(favoriteIndex, 1);
            } else {
                state.value.push(payload);
            }
        },
    },
}); 

export const { handleFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;