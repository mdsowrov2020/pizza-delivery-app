import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import { updateName } from "./userSlice";

const CreateUser = () => {
  const [username, setUserName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addUserName = (e) => {
    e.preventDefault();
    if (!username) return;

    dispatch(updateName(username));
    setUserName("");
    navigate("/menu");
  };
  return (
    <>
      <form onSubmit={addUserName}>
        <input
          type="text"
          value={username}
          className="searchOrderInput"
          placeholder="Your name.."
          onChange={(e) => setUserName(e.target.value)}
        />
        <div style={{ marginTop: "30px" }}>
          <Button variation="order-btn">Start order</Button>
        </div>
      </form>
    </>
  );
};

export default CreateUser;
