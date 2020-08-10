import { SET_LOGO_COMPACT_ON, SET_LOGO_COMPACT_OFF } from "./index";

const initialState = {
  logoCompact: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGO_COMPACT_ON:
      return {
        ...state,
        logoCompact: true
      };
    case SET_LOGO_COMPACT_OFF:
      return {
        ...state,
        logoCompact: false
      };

    default:
      return state;
  }
};
