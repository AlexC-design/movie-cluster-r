import React, { useEffect, useState } from "react";
import { API } from "../../api";
import backArrow from "../../assets/svg/back-arrow.svg";
import "./css/movie-page.css";
import LargeCarousel from "./LargeCarousel/LargeCarousel";
import SmallCarousel from "./SmallCarousel/SmallCarousel";
import HorizontalSlider from "./HorizontalSlider/HorizontalSlider";
import ActorCard from "./HorizontalSlider/ActorCard/ActorCard";
import SimilarMovieCard from "./HorizontalSlider/SimilarMovieCard/SimilarMovieCard";

const MoviePage = ({ match, history }) => {
  const [movieDetails, setmovieDetails] = useState({});
  const [actors, setActors] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);

  const { id } = match.params;

  const getMovieDetails = async () => {
    const response = await API.fetchMovieDetails(id);
    setmovieDetails(response.data);
  };
  const getMovieActors = async () => {
    const response = await API.fetchMovieCredits(id);

    let actors = [];

    response.data.cast.forEach(actor => {
      console.log(actor);
      if (actor.profile_path) {
        actors.push(actor);
      }
    });

    console.log(actors);

    if (actors.length) {
      setActors(actors);
    }
  };
  const getSimilarMovies = async () => {
    const response = await API.fetchSimilarMovies(id);
    setSimilarMovies(response.data.results);
  };

  useEffect(() => {
    getMovieDetails();
    getMovieActors();
    getSimilarMovies();
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [id]);

  return movieDetails.genres ? (
    <div className="movie-page page">
      <div className="back-arrow" onClick={() => history.goBack()}>
        <img src={backArrow} alt="" />
        <div className="text">Back</div>
      </div>
      <div className="container-wide">
        <LargeCarousel id={id} />
      </div>
      <div className="container-narrow">
        <div className="section-container">
          <div className="movie-title">{movieDetails.title}</div>
          <div className="movie-genres">
            {movieDetails.genres.map((genre, index) => {
              return (
                <div className="genre-container" key={genre.id}>
                  <div className="genre-name">{genre.name}</div>
                  {index !== movieDetails.genres.length - 1 ? (
                    <div className="genre-dot" />
                  ) : (
                    <div />
                  )}
                </div>
              );
            })}
          </div>
          <div className="movie-rating">
            {movieDetails.vote_average}
            <span>/10</span>
          </div>
        </div>
        <div className="section-container">
          <div className="section-title">Description</div>
          {movieDetails.overview && (
            <div className="description">{movieDetails.overview}</div>
          )}
          {!movieDetails.overview && <div>No description available</div>}
        </div>
        <div className="section-container full-width">
          <div className="section-title">Trailers</div>
          <SmallCarousel id={id} />
        </div>
        {actors.length ? (
          <div className="section-container">
            <div className="section-title">Actors</div>
            <HorizontalSlider>
              {actors.map(actor => (
                <ActorCard actor={actor} />
              ))}
            </HorizontalSlider>
          </div>
        ) : (
          <div className="section-container">
            <div className="section-title">Actors</div>
            <HorizontalSlider></HorizontalSlider>
            <div>No actor information available</div>
          </div>
        )}
        {similarMovies.length ? (
          <div className="section-container">
            <div className="section-title">Similar Movies</div>
            <HorizontalSlider>
              {similarMovies.map(movie => {
                if (movie.backdrop_path)
                  return <SimilarMovieCard movie={movie} />;
              })}
            </HorizontalSlider>
          </div>
        ) : (
          <div className="section-container">
            <div className="section-title">Similar Movies</div>
            <div>No similar movies available</div>
          </div>
        )}
      </div>
    </div>
  ) : null;
};

export default MoviePage;
