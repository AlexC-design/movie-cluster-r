import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import saveIconOff from "../../assets/svg/save-icon-off.svg";
import saveIconOn from "../../assets/svg/save-icon-on.svg";
import { addMovie, removeMovie } from "../../store/state/savedMovies";
import "./css/movie-card.css";

const MovieCard = ({
  imgURL,
  title,
  description,
  releaseDate,
  rating,
  id,
  history
}) => {
  const [saved, setSaved] = useState(false);
  const { baseURL, backdropSizes, savedMovies } = useSelector(state => ({
    baseURL: state.config.images.secure_base_url,
    backdropSizes: state.config.images.backdrop_sizes,
    savedMovies: state.savedMovies
  }));
  const dispatch = useDispatch();

  const handleCardClick = () => {
    history.push(`/movie/${id}`);
  };

  useEffect(() => {
    if (savedMovies.find(movie => movie.id === id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [saved]);

  const handleSave = e => {
    e.stopPropagation();
    if (saved) {
      dispatch(removeMovie(id));
      setSaved(false);
    } else {
      dispatch(
        addMovie({ imgURL, title, description, releaseDate, rating, id })
      );
      setSaved(true);
    }
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
    <div
      className="movie-card mc-fade-in-movie"
      style={cardStyle}
      onClick={handleCardClick}
    >
      <div className="movie-title">{title}</div>
      <div className="save-button mobile" onClick={e => handleSave(e)}>
        <img src={saved ? saveIconOn : saveIconOff} />
      </div>
      <div className="details">
        <div className="save-button" onClick={e => handleSave(e)}>
          <img src={saved ? saveIconOn : saveIconOff} />
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
