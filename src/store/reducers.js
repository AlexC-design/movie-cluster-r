import { combineReducers } from "redux";
import logoState from "./state/logoState/reducer";
import config from "./state/config/reducer";
import errorPopup from "./state/errorPopup/reducer";
import filter from "./state/filter/reducer";
import genre from "./state/genre/reducer";

const reducers = () =>
  combineReducers({
    logoState,
    config,
    errorPopup,
    filter,
    genre
  });

export default reducers;
