import { combineReducers } from "redux";
import logoState from "./state/logoState/reducer";
import config from "./state/config/reducer";
import errorPopup from "./state/errorPopup/reducer";
import selectedMovie from "./state/selectedMovie/reducer";

const reducers = () =>
  combineReducers({
    logoState,
    config,
    errorPopup,
    selectedMovie
  });

export default reducers;
