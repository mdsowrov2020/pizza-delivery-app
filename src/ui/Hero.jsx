import React from "react";
import HeroImg from "../assets/images/hero.png";
import { useSelector } from "react-redux";

const Hero = () => {
  const username = useSelector((store) => store.user.username);
  return (
    <div className="hero">
      <div className="hero-content">
        <h2>Hello {username},</h2>
        <h5>Stay home and enjoy pizza!</h5>
      </div>
      <div className="hero-img">
        <img src={HeroImg} alt="Hero Image" />
      </div>
    </div>
  );
};

export default Hero;
