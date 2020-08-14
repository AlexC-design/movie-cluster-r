import { SET_SELECTED_MOVIE_ID } from "./index";

const initialState = {
  id: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_MOVIE_ID:
      return {
        ...state,
        id: action.payload
      };

    default:
      return state;
  }
};
