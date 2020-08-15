import { SET_REACHED_BOTTOM } from "./index";

const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_REACHED_BOTTOM:
      return action.payload;

    default:
      return state;
  }
};
