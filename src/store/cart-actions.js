import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const sendCartData = (cart) => {
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
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
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

export function fetchCartData() {
  return async function fetchCartDataThunk(dispatch) {
    try {
      const response = await fetch(
        "https://react-http-9bf27-default-rtdb.europe-west1.firebasedatabase.app/cart.json"
      );
      if (!response.ok) {
        throw new Error("Fetch: Getting cart data failed, response not OK.");
      }
      const cartData = await response.json();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Data Fetched",
          message: "Cart data fetched successfully...",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Data Fetch Error",
          message: "Failed to get cart data...",
        })
      );
    }
  };
}
