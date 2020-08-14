import { SET_GENRE } from "./index";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GENRE:
      return action.payload;

    default:
      return state;
  }
};
