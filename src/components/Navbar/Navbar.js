import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { withLastLocation } from "react-router-last-location";
import { useDispatch, useSelector } from "react-redux";
import { setReachedBottom } from "../../store/state/reachedBottom";
import FilterDropdown from "./FilterDropdown/FilterDropdown";
import SearchBar from "../SearchBar/SearchBar";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import "./css/navbar.css";

const Navbar = ({ location, lastLocation }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [onTop, setOnTop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showFilters, setshowFilters] = useState(true);

  const dispatch = useDispatch();
  const { reachedBottom } = useSelector(state => ({
    reachedBottom: state.reachedBottom
  }));

  // ------------------------ SCROLL POSITION -----------------------------

  const handleScroll = e => {
    let scrollBot = document.documentElement.scrollTop + window.innerHeight;
    let scrollTop = document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight;

    if (scrollBot > height - 1) {
      if (!reachedBottom) {
        dispatch(setReachedBottom(true));
      }
    } else {
      if (reachedBottom) {
        dispatch(setReachedBottom(false));
      }
    }
    if (scrollTop > 0) {
      if (onTop) setOnTop(false);
    } else {
      if (!onTop) setOnTop(true);
    }
  };

  useEffect(() => {
    if (
      lastLocation &&
      lastLocation.pathname.includes("/movie/") &&
      !location.pathname.includes("/movie/")
    ) {
      window.scrollTo(0, 0);
    }

    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [onTop, reachedBottom]);

  useEffect(() => {
    setshowFilters(
      (!searchOpen && location.pathname === "/movies") ||
        (window.innerWidth <= 992 &&
          !menuOpen &&
          location.pathname === "/movies")
    );

    if (window.innerWidth <= 992 && !menuOpen) {
      setSearchOpen(false);
    }
  });

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
      } ${menuOpen ? "open" : ""}`}
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
        {showFilters && <FilterDropdown />}
        <SearchBar
          open={searchOpen}
          setOpen={setSearchOpen}
          menuOpen={menuOpen}
        />
        <BurgerMenu open={menuOpen} setOpen={setMenuOpen} />
      </div>
    </div>
  ) : null;
};

const wrappedComponent = withRouter(Navbar);

export default withLastLocation(wrappedComponent);
