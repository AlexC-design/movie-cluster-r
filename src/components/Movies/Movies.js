import React from "react";
import { withLastLocation } from "react-router-last-location";
import "./css/movies.css";

const Movies = ({ lastLocation }) => {
  return (
    <div
      className={`movies-page page ${
        lastLocation && lastLocation.pathname === "/" ? "movies-enter" : ""
      }`}
    >
      <div style={{ marginTop: "200px" }}>Movies</div>
    </div>
  );
};

export default withLastLocation(Movies);
