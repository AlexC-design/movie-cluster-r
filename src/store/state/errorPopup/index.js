export const SET_ERROR_ON = "SET_ERROR_ON";
export const SET_ERROR_OFF = "SET_ERROR_OFF";

export const setErrorOn = message => ({
  type: SET_ERROR_ON,
  payload: message
});

export const setErrorOff = () => ({
  type: SET_ERROR_OFF
});
