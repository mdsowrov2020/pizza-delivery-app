import React from "react";
import { formatCurrency } from "../../utils/helpers";

const OrderItem = ({ item, totalPrice, ingredients, isIngredientLoading }) => {
  return (
    <>
      <div
        className="order-item"
        style={{ padding: item.imageUrl ? "" : "20px 20px" }}
      >
        <div className="item">
          {item.imageUrl && (
            <div className="item-img">
              <img src={item.imageUrl} alt={item.name} />
              <span>{item.quantity}</span>
            </div>
          )}

          <p>
            {!item.imageUrl && <strong>{item.quantity} &times;</strong>}{" "}
            {item.name}
            {!item.imageUrl && (
              <p
                style={{
                  fontStyle: "italic",
                  fontSize: "13px",
                  marginTop: "8px",
                }}
              >
                {isIngredientLoading ? "Loading..." : ingredients.join(", ")}
              </p>
            )}
          </p>
        </div>
        <div className="item-price">
          <p>{formatCurrency(item.totalPrice)}</p>
        </div>
      </div>
    </>
  );
};

export default OrderItem;
