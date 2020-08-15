import React, { useState, useEffect, useRef } from "react";
import "./css/filter-dropdown.css";
import { setFilter } from "../../../store/state/filter";
import downArrow from "../../../assets/svg/down-arrow.svg";
import { useSelector, useDispatch } from "react-redux";
import { filterToName } from "../../../services/filterToName";

const FilterDropdown = () => {
  const [open, setOpen] = useState(false);

  const { activeFilter } = useSelector(state => ({
    activeFilter: state.filter
  }));
  const dispatch = useDispatch();

  const dropdownRef = useRef(null);

  const filters = ["popular", "top_rated", "now_playing"];

  const toggleDropdown = () => {
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
  useOutsideClick(dropdownRef);

  return (
    <div
      className={`filter-dropdown mc-fade-in ${open ? "open" : ""}`}
      ref={dropdownRef}
    >
      <div className="selected-option" onClick={toggleDropdown}>
        <div>{filterToName[activeFilter]}</div>
        <img className="arrow" src={downArrow} alt="" />
      </div>
      <div className="options">
        {filters.map(filter => (
          <div
            className={`option ${activeFilter === filter ? "active" : ""}`}
            onClick={() => {
              dispatch(setFilter(filter));
              toggleDropdown();
            }}
            key={filter}
          >
            {filterToName[filter]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterDropdown;
