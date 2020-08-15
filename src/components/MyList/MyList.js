import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MovieCard from "../MovieCard/MovieCard";
import "./css/my-list.css";

const MyList = () => {
  const { movies } = useSelector(state => ({
    movies: state.savedMovies
  }));

  useEffect(() => {
    console.log(movies);
  });

  return (
    <div className="my-list-page page">
      <div className="container-wide">
        <div className="page-title">My List</div>
        <div className="cards-container">
          {movies.map(movie => {
            if (movie.imgURL) {
              return (
                <MovieCard
                  imgURL={movie.imgURL}
                  title={movie.title}
                  description={movie.description}
                  releaseDate={movie.releaseDate}
                  rating={movie.rating}
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

export default MyList;
