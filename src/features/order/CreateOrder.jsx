import React, { useState } from "react";
import Button from "../../ui/Button";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createNewOrder } from "../../services/baseApiService";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddress } from "../user/userSlice";
import OrderItem from "./OrderItem";
import { formatCurrency } from "../../utils/helpers";
import store from "../../store";
import { clearCart } from "../cart/cartSlice";

const isValidateNumber = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const CreateOrder = () => {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const cartFromState = useSelector((state) => state.cart.cart);
  const {
    username,
    status: addressStatus,
    position,
    address,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === "loading";
  const dispatch = useDispatch();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();
  const cart = cartFromState;
  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.totalPrice;
  }, 0);
  const priorityPrice = withPriority ? totalPrice * 0.2 : 0;
  return (
    <>
      <section className="order-address-form">
        {/* <button onClick={() => dispatch(fetchAddress())}>Get address</button> */}
        <h3>Deliver to:</h3>

        <hr />
        <Form method="POST">
          <div className="form-container">
            <div className="order-form-input">
              <label htmlFor="customer">Full name</label>
              <input
                type="text"
                name="customer"
                id="customer"
                defaultValue={username}
              />
            </div>
            <div className="order-form-input">
              <label htmlFor="phone">Phone</label>
              <input type="text" name="phone" id="phone" />
              {formErrors?.phone && <span>{formErrors.phone}</span>}
            </div>
            <div className="order-form-input teaxt-area">
              <label htmlFor="address">Address</label>
              <input
                disabled={isLoadingAddress}
                defaultValue={address}
                type="text"
                name="address"
                id="address"
              />

              {!position.latitude && !position.longitude && (
                <span className="geocode-address">
                  <Button
                    variation="small"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(fetchAddress());
                    }}
                  >
                    Get your position
                  </Button>
                </span>
              )}
            </div>
            <div className="order-form-input ">
              <input type="hidden" name="cart" value={JSON.stringify(cart)} />
              <input
                type="hidden"
                name="position"
                value={
                  position.latitude && position.longitude
                    ? `${position.latitude}, ${position.longitude}`
                    : ""
                }
              />
              {/* <Button variation="submit">Create order</Button> */}
            </div>
            <div className="order-form-input input-check ">
              <input
                type="checkbox"
                name="priority"
                id="priority"
                value={withPriority}
                onChange={(e) => setWithPriority(e.target.checked)}
              />
              <label htmlFor="priority">Add priority to your order</label>
            </div>
          </div>
          <section className="order-details">
            <h3>Order details:</h3>
            <hr />
            <div className="order-items">
              {cart.map((item) => (
                <OrderItem
                  item={item}
                  key={item.pizzaId}
                  totalPrice={totalPrice}
                />
              ))}
              <div className="total-price">
                <p>Total: {formatCurrency(totalPrice)}</p>
              </div>
            </div>
          </section>
          <Button
            variation="submit"
            disabled={isSubmitting || isLoadingAddress}
          >
            {isSubmitting ? "Placing order" : "Create order"}
          </Button>
        </Form>
      </section>
    </>
  );
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};

  if (!isValidateNumber(order.phone))
    errors.phone =
      "Please provide a valid phone number. We might need it to contact to you";

  if (Object.keys(errors).length > 0) return errors;
  const newOrder = await createNewOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
};

export default CreateOrder;
