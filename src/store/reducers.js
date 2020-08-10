import { combineReducers } from "redux";
import logoState from "./state/logoState/reducer";

const reducers = () =>
  combineReducers({
    logoState
  });

export default reducers;
