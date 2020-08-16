import React, { useEffect, useState } from "react";
import { withLastLocation } from "react-router-last-location";
import { useDispatch, useSelector } from "react-redux";
import { setErrorOn } from "../../store/state/errorPopup";
import { API } from "../../api";
import MovieCard from "../MovieCard/MovieCard";
import Loading from "../Loading/Loading";
import "./css/genre-movies-page.css";

const GenreMoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingMovies, setLoadingMovies] = useState(false);
  const dispatch = useDispatch();
  const { genre, reachedBottom } = useSelector(state => ({
    genre: state.genre,
    reachedBottom: state.reachedBottom
  }));

  const fetchMovies = async () => {
    setLoadingMovies(true);
    try {
      let { data } = await API.fetchMoviesFromGenre(genre.id, 1);
      setMovies(data.results);
    } catch (error) {
      dispatch(setErrorOn("An error has occured when fetching movies"));
    }
    setLoadingMovies(false);
  };

  const addMovies = async () => {
    setLoadingMovies(true);
    try {
      let { data } = await API.fetchMoviesFromGenre(genre.id, page);
      setMovies([...movies, ...data.results]);
    } catch (error) {
      dispatch(setErrorOn("An error has occured when fetching movies"));
    }
    setLoadingMovies(false);
  };

  useEffect(() => {
    fetchMovies();
    window.scrollTo(0, 0);
  }, [genre.id]);

  useEffect(() => {
    addMovies();
  }, [page]);

  useEffect(() => {
    if (reachedBottom) {
      setPage(page + 1);
    }
  }, [reachedBottom]);

  return (
    <div className="genre-movies-page page">
      <div className="page-title">{genre.name}</div>
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
  );
};

export default withLastLocation(GenreMoviesPage);
