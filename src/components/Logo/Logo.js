import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import m from "../../assets/svg/m.svg";
import ovie from "../../assets/svg/ovie.svg";
import c from "../../assets/svg/c.svg";
import luster from "../../assets/svg/luster.svg";
import greenCircle from "../../assets/svg/green-circle.svg";
import { setLogoCompactOff } from "../../store/state/logoState";
import "./css/logo.css";

const Logo = ({ history, logoCompact, setLogoCompactOff }) => {
  const handleClick = () => {
    setLogoCompactOff();
    if (history.location.pathname === "/movies") {
      history.push("/");
    }
  };

  return (
    <div className={`logo-root ${logoCompact ? "icon" : "text"}-state`}>
      <div className="logo-container" onClick={handleClick}>
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

const mapStateToProps = state => ({
  logoCompact: state.logoState.logoCompact
});

const mapDispatchToProps = dispatch => ({
  setLogoCompactOff: () => dispatch(setLogoCompactOff())
});

const wrappedComponent = withRouter(Logo);

export default connect(mapStateToProps, mapDispatchToProps)(wrappedComponent);
