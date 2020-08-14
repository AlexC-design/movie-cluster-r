import React, { useEffect, useState } from "react";
import { withLastLocation } from "react-router-last-location";
import { useDispatch } from "react-redux";
import { setErrorOn } from "../../store/state/errorPopup";
import { API } from "../../api";
import MovieCard from "../MovieCard/MovieCard";
import "./css/movies.css";

const Movies = ({ lastLocation }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [listType, setListType] = useState("popular");
  const dispatch = useDispatch();
  //now_playing   top_rated

  const fetchMovies = async () => {
    try {
      let { data } = await API.fetchMovies(listType, 1);
      setMovies([...movies, ...data.results]);
    } catch (error) {
      dispatch(setErrorOn("An error has occured when fetching movies"));
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div
      className={`movies-page page ${
        lastLocation && lastLocation.pathname === "/" ? "movies-enter" : ""
      }`}
    >
      <div className="container-wide">
        <div className="page-title">Most popular movies</div>
        <div className="cards-container">
          {movies.map(movie => {
            if (movie.backdrop_path) {
              return (
                <MovieCard
                  imgURL={movie.backdrop_path}
                  title={movie.title}
                  description={movie.overview}
                  releaseDate={movie.release_date}
                  rating={movie.vote_average}
                  id={movie.id}
                  key={movie.id}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default withLastLocation(Movies);
