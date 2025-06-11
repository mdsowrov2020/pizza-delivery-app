import React from "react";
import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  addCart,
  decreaseQuantity,
  getQuantity,
  increaseQuantity,
} from "../cart/cartSlice";

const MenuItem = ({ item }) => {
  const { name, imageUrl, ingredients, soldOut, unitPrice, id } = item;
  const quantityById = useSelector(getQuantity(id));
  const isInCart = quantityById > 0;
  const dispatch = useDispatch();
  const handleAddTocart = () => {
    const cartItem = {
      pizzaId: id,
      name,
      imageUrl,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };

    dispatch(addCart(cartItem));
  };
  return (
    <div className="menu-item">
      <div className="menu-item__img">
        <img src={imageUrl} alt={name} />

        {soldOut === true ? <span className="sold-out">Sold out </span> : ""}
      </div>

      <div className="menu-item__content">
        <p className="title">{name}</p>

        <p className="price">
          <span>Price: </span>
          {formatCurrency(unitPrice)}
        </p>
        <p className="ingradients">{ingredients.join(", ")}</p>
      </div>
      <div className="menu-cart-button">
        {isInCart ? (
          <span className="dec" onClick={() => dispatch(decreaseQuantity(id))}>
            -
          </span>
        ) : (
          ""
        )}
        <Button
          variation="cartBtn"
          onClick={handleAddTocart}
          disabled={isInCart || soldOut === true}
        >
          {isInCart
            ? `${quantityById} in cart`
            : soldOut === true
            ? "Sold out"
            : "Add to cart"}
        </Button>
        {isInCart ? (
          <span className="inc" onClick={() => dispatch(increaseQuantity(id))}>
            +
          </span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default MenuItem;
