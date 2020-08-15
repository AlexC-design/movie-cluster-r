import { ADD_MOVIE, REMOVE_MOVIE } from "./index";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_MOVIE:
      return [...state, action.payload];
    case REMOVE_MOVIE:
      return [...state].filter(movie => movie.id !== action.payload);

    default:
      return state;
  }
};
