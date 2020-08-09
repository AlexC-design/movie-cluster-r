import React, { useState } from "react";
import m from "../../assets/svg/m.svg";
import ovie from "../../assets/svg/ovie.svg";
import c from "../../assets/svg/c.svg";
import luster from "../../assets/svg/luster.svg";
import greenCircle from "../../assets/svg/green-circle.svg";
import "./css/logo.css";

const Logo = () => {
  const [logoCompact, setLogoCompact] = useState(false);

  return (
    <div className={`logo-root ${logoCompact ? "icon" : "text"}-state`}>
      <div
        className="logo-container"
        onClick={() => setLogoCompact(!logoCompact)}
      >
        <svg className="white-circle" width="180" height="180">
          <circle cx="90" cy="90" r="77" />
        </svg>
        <img className="m" src={m} alt="" />
        <img className="ovie" src={ovie} alt="" />
        <img className="c" src={c} alt="" />
        <img className="luster" src={luster} alt="" />
        <img className="green-circle" src={greenCircle} alt="" />
      </div>
    </div>
  );
};

export default Logo;
