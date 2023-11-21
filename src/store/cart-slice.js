import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    addItemToCart(state, action) {
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
  },
});

const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending Data",
        message: "Sending cart data...",
      })
    );

    async function sendRequest() {
      const response = await fetch(
        "https://react-http-9bf27-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        { method: "PUT", body: JSON.stringify(cart) }
      );

      if (!response.ok) {
        throw new Error("Fetch: Sending cart data failed, response not OK.");
      }
    }
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Data Sent",
          message: "Cart data sent successfully...",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Data Send Error",
          message: "Failed to send cart data...",
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;

export default cartSlice;
