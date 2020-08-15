import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { withLastLocation } from "react-router-last-location";
import FilterDropdown from "./FilterDropdown/FilterDropdown";
import "./css/navbar.css";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = ({ location, lastLocation }) => {
  const [searchOpen, setSearchOpen] = useState(false);

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
        {!searchOpen && location.pathname === "/movies" && <FilterDropdown />}
        <SearchBar open={searchOpen} setOpen={setSearchOpen} />
      </div>
    </div>
  ) : null;
};

const wrappedComponent = withRouter(Navbar);

export default withLastLocation(wrappedComponent);
