import React, { useEffect, useState, useRef } from "react";
import { withLastLocation } from "react-router-last-location";
import { useDispatch, useSelector } from "react-redux";
import { setErrorOn } from "../../store/state/errorPopup";
import { filterToName } from "../../services/filterToName";
import { API } from "../../api";
import MovieCard from "../MovieCard/MovieCard";
import "./css/movies.css";
import Loading from "../Loading/Loading";

const Movies = ({ lastLocation }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingMovies, setLoadingMovies] = useState(false);
  const dispatch = useDispatch();
  const { filter, reachedBottom } = useSelector(state => ({
    filter: state.filter,
    reachedBottom: state.reachedBottom
  }));

  const pageRef = useRef();

  // ------------------------ FETCHING MOVIES -----------------------------

  const fetchMovies = async () => {
    setLoadingMovies(true);
    try {
      let { data } = await API.fetchMovies(filter, 1);
      setMovies(data.results);
    } catch (error) {
      dispatch(setErrorOn("An error has occured when fetching movies"));
    }
    setLoadingMovies(false);
  };

  const addMovies = async () => {
    setLoadingMovies(true);
    try {
      let { data } = await API.fetchMovies(filter, page);
      setMovies([...movies].concat(data.results));
    } catch (error) {
      dispatch(setErrorOn("An error has occured when fetching movies"));
    }
    setLoadingMovies(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchMovies();
    window.scrollTo(0, 0);
  }, [filter]);

  useEffect(() => {
    addMovies();
  }, [page]);

  useEffect(() => {
    if (reachedBottom) {
      setPage(page + 1);
    }
  }, [reachedBottom]);

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
        {loadingMovies && <Loading />}
      </div>
    </div>
  );
};

export default withLastLocation(Movies);
