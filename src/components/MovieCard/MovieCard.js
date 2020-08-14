import React from "react";
import "./css/movie-card.css";
import { useSelector, useDispatch } from "react-redux";
import saveIconOff from "../../assets/svg/save-icon-off.svg";
import saveIconOn from "../../assets/svg/save-icon-on.svg";
import { setSelectedMovieId } from "../../store/state/selectedMovie";
import { withRouter } from "react-router";

const MovieCard = ({
  imgURL,
  title,
  description,
  releaseDate,
  rating,
  id,
  history
}) => {
  const { baseURL, backdropSizes } = useSelector(state => ({
    baseURL: state.config.images.secure_base_url,
    backdropSizes: state.config.images.backdrop_sizes
  }));
  const dispatch = useDispatch();

  const handleCardClick = () => {
    dispatch(setSelectedMovieId(id));
    history.push(`/movie/${id}`);
  };

  const cropDescription = description => {
    if (description.length > 200) {
      description = description.substring(0, 200);
      description += `...`;
    }

    return description;
  };

  const cardStyle = {
    background: `linear-gradient(rgba(24, 25, 30, 0), rgba(24, 25, 30, 0), rgb(24, 25, 30)), url("${baseURL}${backdropSizes[1]}${imgURL}") center center / cover no-repeat`
  };

  return (
    <div className="movie-card" style={cardStyle} onClick={handleCardClick}>
      <div className="movie-title">{title}</div>
      <div className="details">
        <div className="save-button">
          <img src={saveIconOff} />
        </div>
        <div className="description">{cropDescription(description)}</div>
        <div className="bottom-details">
          <div className="release-date">
            <div className="text">Release date</div>
            <div className="date">{releaseDate}</div>
          </div>
          <div className="movie-rating">
            <div className="text">Rating</div>
            <div className="rating">
              <span>{rating}</span>/10
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(MovieCard);
