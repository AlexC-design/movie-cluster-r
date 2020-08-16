import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setErrorOn } from "../../store/state/errorPopup";
import { API } from "../../api";
import MovieCard from "../MovieCard/MovieCard";
import "./css/search-page.css";
import Loading from "../Loading/Loading";

const SearchPage = ({ match }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(2);
  const [loadingMovies, setLoadingMovies] = useState(false);
  const dispatch = useDispatch();
  const { reachedBottom } = useSelector(state => ({
    reachedBottom: state.reachedBottom
  }));
  const { term } = match.params;

  // ------------------------ FETCHING MOVIES -----------------------------

  const searchMovies = async () => {
    setLoadingMovies(true);
    try {
      let response = await API.searchMovies(1, term);
      let response2 = await API.searchMovies(2, term);
      setMovies([...response.data.results, ...response2.data.results]);
    } catch (error) {
      dispatch(setErrorOn("An error has occured when fetching movies"));
    }
    setLoadingMovies(false);
  };

  const addMovies = async () => {
    setLoadingMovies(true);
    try {
      let { data } = await API.searchMovies(page, term);
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
    searchMovies();
    window.scrollTo(0, 0);
  }, [term]);

  useEffect(() => {
    addMovies();
  }, [page]);

  useEffect(() => {
    if (reachedBottom) {
      setPage(page + 1);
    }
  }, [reachedBottom]);

  return (
    <div className="search-page page">
      <div className="container-wide">
        <div className="page-title">Searching for '{term}'</div>
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

export default SearchPage;
