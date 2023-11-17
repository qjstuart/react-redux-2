import { useDispatch, useSelector } from "react-redux";

import cartSlice from "../../store/cart-slice";
import { uiActions } from "../../store/ui-slice";
import classes from "./CartButton.module.css";

const CartButton = (props) => {
  const dispatch = useDispatch();

  const numberOfItemsInCart = useSelector((state) => state.cart.totalQuantity);

  function toggleCartHandler() {
    dispatch(uiActions.toggle());
  }

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{numberOfItemsInCart}</span>
    </button>
  );
};

export default CartButton;
