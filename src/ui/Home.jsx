import React, { useState } from "react";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { updateName } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import CreateUser from "../features/user/CreateUser";

const Home = () => {
  const username = useSelector((state) => state.user.username);
  return (
    <section className="start-order">
      <div className="start-order-content">
        <h2>
          Fastest <span>Delivery</span> & <span>Easy</span> pickup.
        </h2>
        {username === "" ? (
          <CreateUser />
        ) : (
          <Button to="/menu" variation="linkBtn">
            Continue ordering, {username}
          </Button>
        )}
      </div>
    </section>
  );
};

export default Home;
