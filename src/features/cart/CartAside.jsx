import CartItem from "./CartItem";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import emptyCart from "../../assets/images/emptyBag.png";
import { clearCart, getTotalCartItem } from "./cartSlice";
import { useLocation } from "react-router-dom";

const CartAside = () => {
  const cart = useSelector((state) => state.cart.cart);
  const totalItemInCart = useSelector(getTotalCartItem);
  const dispatch = useDispatch();
  const location = useLocation();
  const isNewOrderPage = location.pathname === "/order/new";

  return (
    <>
      <aside className="cart-sidebar">
        <div className="cart-sidebar-header">
          <p>Total ({totalItemInCart}) items</p>
          <button onClick={() => dispatch(clearCart())}>Clear cart</button>
        </div>
        {!cart.length ? (
          <div className="empty-cart">
            <div className="empty-cart__img">
              <img src={emptyCart} alt="" />
            </div>
          </div>
        ) : (
          <div className="cart-items">
            {cart.map((item) => (
              <CartItem item={item} key={item.pizzaId} />
            ))}
          </div>
        )}
        {cart.length !== 0 && (
          <footer className="cart-footer">
            {!isNewOrderPage && <Button to="/order/new">Place order</Button>}
          </footer>
        )}
      </aside>
    </>
  );
};

export default CartAside;
