import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import CartAside from "./CartAside";
import { createPortal } from "react-dom";

const CartContext = createContext();
const CartSlider = ({ children }) => {
  const [togglrSlider, setIsToggleSlider] = useState(false);
  const toggleCartSlider = () => setIsToggleSlider((val) => !val);
  return (
    <CartContext.Provider value={{ toggleCartSlider, togglrSlider }}>
      {children}
    </CartContext.Provider>
  );
};

const CartSlide = () => {
  const { togglrSlider, toggleCartSlider } = useContext(CartContext);

  const ref = useRef();
  useEffect(() => {
    const handleToggle = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        console.log("Outside clicked");
        toggleCartSlider();
      }
    };
    document.addEventListener("click", handleToggle, true);
    return () => document.removeEventListener("click", handleToggle, true);
  }, [toggleCartSlider]);
  if (!togglrSlider) return null;

  return createPortal(
    <section className="cart-slider">
      <div className="overlay">
        <button
          style={{
            position: "absolute",
            right: "320px",
            zIndex: "1000",
            height: "30px",
            width: "30px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            color: "white",
            outline: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          ❌
        </button>
        <div ref={ref}>
          <CartAside />
        </div>
      </div>
    </section>,
    document.body
  );
};

const ToggleCart = ({ children }) => {
  const { toggleCartSlider } = useContext(CartContext);
  return (
    <div>{cloneElement(children, { onClick: () => toggleCartSlider() })}</div>
  );
};

CartSlider.ToggleCart = ToggleCart;
CartSlider.CartSlide = CartSlide;

export default CartSlider;
