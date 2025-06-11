import React, { useEffect } from "react";
import { getOrderbyId } from "../../services/baseApiService";
import { useFetcher, useLoaderData } from "react-router-dom";
import {
  calcMiniuteLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";
import UpdateOrder from "./UpdateOrder";

// test id   VA1P46 , FCK3OF

const Order = () => {
  const order = useLoaderData();
  const fetcher = useFetcher();

  useEffect(() => {
    if (!fetcher.data && fetcher.state === "idle") return fetcher.load("/menu");
  }, [fetcher]);

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.totalPrice;
  }, 0);
  const deliveryIn = calcMiniuteLeft(estimatedDelivery);
  return (
    <>
      <section className="order">
        <div className="order-heading">
          <div className="order-heading-container">
            <div className="order-id">
              <h3>Order: {id}</h3>
              <p>
                Estimated delivery: {formatDate(estimatedDelivery)}
                {/* {deliveryIn >= 0
                  ? `Only ${calcMiniuteLeft(estimatedDelivery)} minutes left 😃`
                  : "Order should have arrived"} */}
              </p>
            </div>
            <div className="order-status">
              {priority ? <p className="priority">Priority</p> : ""}
              <p className="status">
                {status === "preparing" ? "Preparing order" : status}
              </p>
            </div>
          </div>
          <div className="order-items">
            <h4>Order items</h4>
            {cart.map((item) => (
              <OrderItem
                item={item}
                key={item.pizzaId}
                totalPrice={totalPrice}
                isIngredientLoading={fetcher.state === "loading"}
                ingredients={
                  fetcher.data?.find((el) => el.id === item.pizzaId)
                    .ingredients ?? []
                }
              />
            ))}
            <div className="total-price">
              <p>Total: {formatCurrency(totalPrice)}</p>
            </div>
          </div>
          <div className="order-pay-info">
            <h4>Order Summary</h4>
            <div className="order-summary">
              <p>Pizza price: {formatCurrency(totalPrice)}</p>
              <p>Price priority: {formatCurrency(priorityPrice)}</p>
              <h3>
                To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
              </h3>
            </div>
          </div>
        </div>

        {!priority && (
          <span>
            <UpdateOrder />
          </span>
        )}
      </section>
    </>
  );
};

export const loader = async ({ params }) => {
  const order = await getOrderbyId(params.orderId);
  return order;
};

export default Order;
