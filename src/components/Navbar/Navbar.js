import React from "react";
import { Link, withRouter } from "react-router-dom";
import { withLastLocation } from "react-router-last-location";
import FilterDropdown from "./FilterDropdown/FilterDropdown";
import "./css/navbar.css";

const Navbar = ({ location, lastLocation }) => {
  return !(
    location.pathname === "/" || location.pathname.includes("/movie/")
  ) ? (
    <div
      className={`navbar ${
        lastLocation && lastLocation.pathname === "/" ? "navbar-enter" : ""
      } ${
        lastLocation && lastLocation.pathname.includes("/movie/")
          ? "mc-fade-in"
          : ""
      }`}
    >
      <div className="navbar-content">
        <Link
          to="/movies"
          className={location.pathname === "/movies" ? "active" : ""}
        >
          Movies
        </Link>
        <Link
          to="/genres"
          className={location.pathname === "/genres" ? "active" : ""}
        >
          Genres
        </Link>
        <Link
          to="/mylist"
          className={location.pathname === "/mylist" ? "active" : ""}
        >
          My list
        </Link>
        <FilterDropdown />
      </div>
    </div>
  ) : null;
};

const wrappedComponent = withRouter(Navbar);

export default withLastLocation(wrappedComponent);
