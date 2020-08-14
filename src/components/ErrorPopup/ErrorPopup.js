import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setErrorOff } from "../../store/state/errorPopup";
import "./css/error-popup.css";

const ErrorPopup = () => {
  const dispatch = useDispatch();
  const { errorMessage } = useSelector(state => ({
    errorMessage: state.errorPopup.errorMessage
  }));

  return (
    <div className={`error-popup ${!errorMessage ? "hide" : ""}`}>
      <div className="inner-popup">
        <div className="message">{errorMessage}</div>
        <button onClick={() => dispatch(setErrorOff())}>OK</button>
      </div>
    </div>
  );
};

export default ErrorPopup;
