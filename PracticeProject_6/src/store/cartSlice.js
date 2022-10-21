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
            const index = state.items.findIndex(item => item.title === action.payload.title);
            if (index === -1) {
                state.items.push(action.payload);
                return;
            }
            state.items[index].quantity++;
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