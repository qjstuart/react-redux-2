import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { uiActions } from "./store/ui-slice";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

let isFirstRun = true;

function App() {
  const dispatch = useDispatch();
  const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    async function sendCartData() {
      if (isFirstRun) {
        isFirstRun = false;
        return;
      }

      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending Data",
          message: "Sending cart data...",
        })
      );

      const response = await fetch(
        "https://react-http-9bf27-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        { method: "PUT", body: JSON.stringify(cart) }
      );

      if (!response.ok) {
        throw new Error("Fetch: Sending cart data failed, response not OK.");
      }

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Data Sent",
          message: "Cart data sent successfully...",
        })
      );
    }

    try {
      sendCartData();
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Data Send Error",
          message: "Failed to send cart data...",
        })
      );
    }
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          message={notification.message}
          title={notification.title}
        />
      )}
      <Layout>
        {cartIsVisible && <Cart />}
        {/* <Cart /> */}
        <Products />
      </Layout>
    </>
  );
}

export default App;
