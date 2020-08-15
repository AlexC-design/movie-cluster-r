import React, { useEffect, useState, useRef } from "react";
import { withLastLocation } from "react-router-last-location";
import { useDispatch, useSelector } from "react-redux";
import { setErrorOn } from "../../store/state/errorPopup";
import { filterToName } from "../../services/filterToName";
import { API } from "../../api";
import MovieCard from "../MovieCard/MovieCard";
import "./css/movies.css";

const Movies = ({ lastLocation }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { filter } = useSelector(state => ({ filter: state.filter }));

  const pageRef = useRef();

  const fetchMovies = async () => {
    try {
      let { data } = await API.fetchMovies(filter, 1);
      setMovies(data.results);
    } catch (error) {
      dispatch(setErrorOn("An error has occured when fetching movies"));
    }
  };

  const addMovies = async () => {
    try {
      let { data } = await API.fetchMovies(filter, page);
      setMovies([...movies, ...data.results]);
    } catch (error) {
      dispatch(setErrorOn("An error has occured when fetching movies"));
    }
  };

  useEffect(() => {
    fetchMovies();
    window.scrollTo(0, 0);
  }, [filter]);

  useEffect(() => {
    addMovies();
  }, [page]);

  return (
    <div
      ref={pageRef}
      className={`movies-page page ${
        lastLocation && lastLocation.pathname === "/" ? "movies-enter" : ""
      }`}
    >
      <div className="container-wide">
        <div className="page-title">{filterToName[filter]} movies</div>
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
