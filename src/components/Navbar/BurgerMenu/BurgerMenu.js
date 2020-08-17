import React from "react";
import "./css/burger-menu.css";

const BurgerMenu = ({ open, setOpen }) => {
  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={`burger-menu ${open ? "open" : ""}`} onClick={toggleOpen}>
      <div className="circle" />
      <div className="line top" />
      <div className="line" />
      <div className="line" />
    </div>
  );
};

export default BurgerMenu;
