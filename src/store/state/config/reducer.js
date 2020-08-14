import { GET_CONFIG } from "./index";

const initialState = {
  images: {
    backdrop_sizes: [],
    profile_sizes: [],
    poster_sizes: []
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CONFIG:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
};
