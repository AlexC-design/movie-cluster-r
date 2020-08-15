import React, { useRef, useState, useEffect } from "react";
import searchIcon from "../../assets/svg/search.svg";
import "./css/search-bar.css";

const SearchBar = ({ open, setOpen }) => {
  const inputRef = useRef();
  const imgRef = useRef();

  const handleClick = () => {
    !open ? inputRef.current.focus() : inputRef.current.blur();

    setOpen(!open);
  };

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
  useOutsideClick(imgRef);

  return (
    <div className={`search-bar ${open ? "open" : ""}`}>
      <input ref={inputRef} />
      <img
        className="search-icon"
        src={searchIcon}
        alt=""
        onClick={handleClick}
        ref={imgRef}
      />
    </div>
  );
};

export default SearchBar;
