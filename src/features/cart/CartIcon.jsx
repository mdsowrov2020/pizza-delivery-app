import { LuShoppingCart } from "react-icons/lu";
import { useSelector } from "react-redux";
import { getTotalCartItem } from "./cartSlice";

const CartIcon = ({ onClick }) => {
  const totalItemInCart = useSelector(getTotalCartItem);

  return (
    <div role="button" onClick={onClick}>
      <span data-count={totalItemInCart} className="cart-icon">
        <LuShoppingCart />
      </span>
    </div>
  );
};

export default CartIcon;
