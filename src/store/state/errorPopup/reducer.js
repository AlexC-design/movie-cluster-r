import { SET_ERROR_ON, SET_ERROR_OFF } from "./index";

const initialState = {
  errorMessage: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ERROR_ON:
      return {
        ...state,
        errorMessage: action.payload
      };
    case SET_ERROR_OFF:
      return {
        ...state,
        errorMessage: null
      };

    default:
      return state;
  }
};
