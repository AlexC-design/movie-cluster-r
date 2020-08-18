import React from "react";
import smallCricle from "../../assets/svg/small-circle.svg";
import bigCricle from "../../assets/svg/big-circle.svg";
import "./css/loading.css";

const Loading = () => {
  return (
    <div className="loading">
      <img src={smallCricle} className="small-circle" alt="" />
      <img src={bigCricle} className="big-circle" alt="" />
      <div className="glow" />
    </div>
  );
};

export default Loading;
