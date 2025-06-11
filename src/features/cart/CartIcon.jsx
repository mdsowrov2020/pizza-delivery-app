import React from "react";
import { LuShoppingCart } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { getTotalCartItem, toggleCartSlider } from "./cartSlice";
import CartSlider from "./CartSlider";

const CartIcon = ({ onClick }) => {
  // const dispatch = useDispatch();
  const totalItemInCart = useSelector(getTotalCartItem);
  // const handleClick = () => {
  //   dispatch(toggleCartSlider());
  // };
  return (
    <div role="button" onClick={onClick}>
      <span data-count={totalItemInCart} className="cart-icon">
        <LuShoppingCart />
      </span>
    </div>
  );
};

export default CartIcon;
