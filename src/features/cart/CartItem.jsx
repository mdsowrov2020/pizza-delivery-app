import React from "react";
import { formatCurrency } from "../../utils/helpers";
import { IoChevronUpSharp } from "react-icons/io5";
import { IoChevronDownSharp } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";

import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  deleteCart,
  getQuantity,
  increaseQuantity,
} from "./cartSlice";

const CartItem = ({ item }) => {
  const { pizzaId, name, imageUrl, quantity, totalPrice } = item;
  const quantityById = useSelector(getQuantity(pizzaId));
  const dispatch = useDispatch();

  return (
    <>
      <div className="cart-item">
        <div className="item">
          <div className="item-img">
            <img src={imageUrl} alt={name} />
            <span>{quantity}</span>
          </div>

          <div className="item-info">
            <p>{name}</p>
            <p>{formatCurrency(totalPrice)}</p>
          </div>
        </div>

        <div className="cart-actions">
          <div className="cart-actions__update">
            <button onClick={() => dispatch(increaseQuantity(pizzaId))}>
              <IoChevronUpSharp />
            </button>
            <input disabled type="text" value={quantityById} name="" id="" />
            <button onClick={() => dispatch(decreaseQuantity(pizzaId))}>
              <IoChevronDownSharp />
            </button>
          </div>
          <div
            className="cart-actions__remove"
            onClick={() => dispatch(deleteCart(pizzaId))}
          >
            <IoTrashOutline />
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
