import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/home-page.css";
import { connect } from "react-redux";
import { setLogoCompactOn } from "../../store/state/logoState";

const HomePage = ({ history, setLogoCompactOn }) => {
  const [pageHidden, setPageHidden] = useState(false);

  const handleClick = () => {
    setLogoCompactOn();
    setPageHidden(true);
    history.push("/movies");
  };

  useEffect(() => {
    setPageHidden(false);
  }, [history]);

  return (
    <div className={`home-page page ${pageHidden ? "hide" : ""}`}>
      <div className="description">
        Discover latest movies or browse your favourite ones
      </div>

      <button className="cta" onClick={handleClick}>
        Get started
      </button>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  setLogoCompactOn: () => dispatch(setLogoCompactOn())
});

export default connect(null, mapDispatchToProps)(HomePage);
