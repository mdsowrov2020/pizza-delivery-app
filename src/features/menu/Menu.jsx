import { getMenuList } from "../../services/baseApiService";
import { useLoaderData } from "react-router-dom";
import Hero from "../../ui/Hero";
import MenuItem from "./MenuItem";
import CartAside from "../cart/CartAside";

const Menu = () => {
  const menu = useLoaderData();

  return (
    <>
      <section className="menu-container">
        <div className="menu-main">
          <Hero />
          <div className="menu-heading">
            <p>Choose your flavour</p>
            <h3>Best pizza menu in town</h3>
          </div>
          <hr />
          <div className="menu-list">
            {menu.map((item) => (
              <MenuItem item={item} key={item.id} />
            ))}
          </div>
        </div>
        <div className="menu-sidebar">
          <CartAside />
        </div>
      </section>
    </>
  );
};

export const loader = async () => {
  const menu = await getMenuList();
  return menu;
};

export default Menu;
