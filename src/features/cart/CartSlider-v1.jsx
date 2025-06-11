import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { toggleCartSlider } from "./cartSlice";
import CartItem from "./CartItem";
import Button from "../../ui/Button";
import CartAside from "./CartAside";

const CartSlider = () => {
  const dispatch = useDispatch();
  return (
    <section className="cart-slider">
      <div
        className="overlay"
        onClick={() => dispatch(toggleCartSlider())}
      ></div>
      <CartAside />
    </section>
  );
};

export default CartSlider;
