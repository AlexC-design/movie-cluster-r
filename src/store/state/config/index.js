import { API } from "../../../api";
import { setErrorOn } from "../errorPopup/index";

export const GET_CONFIG = "GET_CONFIG";

export const getConfig = config => ({
  type: GET_CONFIG,
  payload: config
});

export const fetchConfig = () => async dispatch => {
  try {
    let response = await API.fetchConfig();
    dispatch(getConfig(response.data));
  } catch (error) {
    dispatch(setErrorOn('An error has occured when fetching the configuration'));
  }
};
