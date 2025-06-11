import React from "react";
import Header from "./Header";
import CartItem from "../features/cart/CartItem";
import {
  Link,
  Outlet,
  ScrollRestoration,
  useNavigation,
} from "react-router-dom";
import Loader from "./Loader";
import { useSelector } from "react-redux";
import CartSlider from "../features/cart/CartSlider";

const MainLayout = () => {
  const toggleCartSlider = useSelector((state) => state.cart.toggleCartSlider);
  const navigation = useNavigation();
  console.log(navigation);
  return (
    <>
      {navigation.state === "loading" && <Loader />}
      <div className="main-layout">
        <main>
          <Header />
          <section className="features">
            <ScrollRestoration />
            <Outlet />
          </section>
        </main>

        {toggleCartSlider && <CartSlider />}
      </div>
    </>
  );
};

export default MainLayout;
