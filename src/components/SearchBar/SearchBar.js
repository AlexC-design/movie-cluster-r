import React, { useRef, useState, useEffect } from "react";
import closeButton from "../../assets/svg/close.svg";
import searchIcon from "../../assets/svg/search.svg";
import "./css/search-bar.css";
import { withRouter } from "react-router";

const SearchBar = ({ open, setOpen, history, menuOpen }) => {
  const [query, setQuery] = useState("");

  const inputRef = useRef();
  const searchBarRef = useRef();

  const handleSearchClick = () => {
    if (open && query !== "") {
      history.push(`/search/${query}`);
    }

    inputRef.current.focus();
    setOpen(true);
  };

  const handleInputChange = e => {
    setQuery(e.target.value);
  };

  const handleKeyDown = e => {
    if (e.key === "Enter" && query !== "") {
      history.push(`/search/${query}`);
    }
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (window.innerWidth <= 992 && menuOpen) {
      setOpen(true);
    }
  });

  const useOutsideClick = ref => {
    useEffect(() => {
      const handleClickOutside = e => {
        if (ref.current && !ref.current.contains(e.target)) {
          setOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };
  useOutsideClick(searchBarRef);

  useEffect(() => {
    if (!open && window.innerWidth >= 992) {
      setQuery("");
    }
  });

  return (
    <div
      ref={searchBarRef}
      className={`search-bar ${open ? "open" : ""} ${
        menuOpen ? "menu-open" : ""
      }`}
    >
      <img
        className="search-icon"
        src={searchIcon}
        alt=""
        onClick={handleSearchClick}
      />
      <input
        ref={inputRef}
        placeholder="Search movies"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <img
        className="close"
        src={closeButton}
        alt=""
        onClick={() => setOpen(false)}
      />
    </div>
  );
};

export default withRouter(SearchBar);
