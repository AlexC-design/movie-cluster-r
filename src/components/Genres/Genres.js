import React, { useState, useEffect } from "react";
import { API } from "../../api";
import GenreCard from "./GenreCard/GenreCard";
import "./css/genres.css";

const Genres = ({ how }) => {
  const [genres, setGenres] = useState([]);

  const getGenres = async () => {
    let response = await API.fetchGenres();

    setGenres(how ? [response.data.genres[0]] : response.data.genres);
  };

  useEffect(() => {
    getGenres();
  }, []);

  return (
    <div className="genres-page page">
      <div className="container-narrow">
        <div className="page-title">Genres</div>
        <div className="genres-container">
          {genres.map(genre => (
            <GenreCard genre={genre} key={genre.id} how={how} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Genres;
