import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./css/similar-movie-card.css";
import { withRouter } from "react-router";

const SimilarMovieCard = ({ movie, history }) => {
  const { baseURL, backdropSizes } = useSelector(state => ({
    baseURL: state.config.images.secure_base_url,
    backdropSizes: state.config.images.backdrop_sizes
  }));

  const handleCardClick = () => {
    history.replace(`/movie/${movie.id}`);
  };

  const cardStyle = {
    background: `linear-gradient(rgba(0,0,0, 0), rgba(0,0,0, 0), rgb(0,0,0)), url("${baseURL}${backdropSizes[1]}${movie.backdrop_path}") center center / cover no-repeat`
  };

  return (
    <div
      className="similar-movie-card"
      style={cardStyle}
      onClick={handleCardClick}
    >
      <div className="title">{movie.title}</div>
    </div>
  );
};

export default withRouter(SimilarMovieCard);
