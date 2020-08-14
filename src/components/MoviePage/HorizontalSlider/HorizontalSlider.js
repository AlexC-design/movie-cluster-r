import React, { useState, useEffect } from "react";
import SimpleBar from "simplebar-react";
import "simplebar/src/simplebar.css";
import "./css/horizontal-slider.css";

const HorizontalSlider = ({ children }) => {
  return (
    <SimpleBar
      className="simplebar-component horizontal-slider"
      autoHide={false}
      style={{ width: "100%" }}
    >
      <div className="slider-content">{children}</div>
    </SimpleBar>
  );
};

export default HorizontalSlider;
