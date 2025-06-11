import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import CartIcon from "../features/cart/CartIcon";
import CartSlider from "../features/cart/CartSlider";

const Header = () => {
  return (
    <header className="navbar">
      <Link to="/">Today Menu</Link>
      <SearchOrder />
      <CartSlider>
        <CartSlider.ToggleCart>
          <CartIcon />
        </CartSlider.ToggleCart>
        <CartSlider.CartSlide />
      </CartSlider>
    </header>
  );
};

export default Header;
