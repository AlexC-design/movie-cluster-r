import React from "react";
import "./css/carousel-arrow.css";
import arrowLeft from "../../../assets/svg/back-arrow.svg";
import arrowRight from "../../../assets/svg/forward-arrow.svg";

const CarouselArrow = ({ direction, clickAction, disabled }) => {
  return (
    <div
      className={`arrow-container ${direction} ${disabled ? "disabled" : ""}`}
      onClick={clickAction}
    >
      <img
        className="arrow"
        src={direction === "left" ? arrowLeft : arrowRight}
        alt=""
      />
    </div>
  );
};

export default CarouselArrow;
