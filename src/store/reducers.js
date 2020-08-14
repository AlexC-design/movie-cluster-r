import { combineReducers } from "redux";
import logoState from "./state/logoState/reducer";
import config from "./state/config/reducer";
import errorPopup from "./state/errorPopup/reducer";
import filter from "./state/filter/reducer";

const reducers = () =>
  combineReducers({
    logoState,
    config,
    errorPopup,
    filter
  });

export default reducers;
