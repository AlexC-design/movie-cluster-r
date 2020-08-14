// import { API } from "../../../api";
// import { setErrorOn } from "../errorPopup/index";

export const SET_SELECTED_MOVIE_ID = "SET_SELECTED_MOVIE_ID";

export const setSelectedMovieId = id => ({
  type: SET_SELECTED_MOVIE_ID,
  payload: id
});
