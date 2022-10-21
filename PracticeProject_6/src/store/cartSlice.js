import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        isVisible: false,
        items: [],
    },
    reducers: {
        showCart: (state) => {
            state.isVisible = true;
        },
        hideCart: (state) => {
            state.isVisible = false;
        },
        toggleVisiblity: (state) => {
            state.isVisible = !state.isVisible;
        },
        addItem: (state, action) => {
            if (state.items.some(item => item.title === action.payload.title)) {
                const index = state.items.findIndex(item => item.title === action.payload.title);
                state.items[index].quantity++;
                return;
            }
            state.items.push(action.payload);
        },
        removeItem: (state, action) => {
            const index = state.items.findIndex(item => item.title === action.payload.title);
            state.items.splice(index, 1);
        },
        increaseItemCount: (state, action) => {
            const index = state.items.findIndex(item => item.title === action.payload.title);
            state.items[index].quantity++;
        },
        decreaseItemCount: (state, action) => {
            const index = state.items.findIndex(item => item.title === action.payload.title);
            state.items[index].quantity--;
            state.items = state.items.filter(item => item.quantity > 0);
        },
    },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;