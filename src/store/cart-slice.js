import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    cartChanged: false,
  },
  reducers: {
    addItemToCart(state, action) {
      state.cartChanged = true;
      const itemToBeAdded = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === itemToBeAdded.id
      );
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: itemToBeAdded.id,
          price: itemToBeAdded.price,
          quantity: 1,
          totalPrice: itemToBeAdded.price,
          name: itemToBeAdded.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + itemToBeAdded.price;
      }
    },
    removeItemFromCart(state, action) {
      state.cartChanged = true;
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
    replaceCart(state, action) {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
