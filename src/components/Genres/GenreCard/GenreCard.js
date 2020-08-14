import React, { useState, useEffect } from "react";
import { API } from "../../../api";
import { useSelector } from "react-redux";
import "./css/genre-card.css";

const GenreCard = ({ genre }) => {
  const [images, setImages] = useState([]);
  const [image, setImage] = useState(0);
  const [image2, setImage2] = useState(1);
  const [position, setPosition] = useState("center");
  const [position2, setPosition2] = useState(
    ["top", "bottom", "left", "right"][Math.floor(Math.random() * 4)]
  );
  const [resetCycle, setResetCycle] = useState(0);

  const { baseURL, posterSizes } = useSelector(state => ({
    baseURL: state.config.images.secure_base_url,
    posterSizes: state.config.images.poster_sizes
  }));

  const oppositePosition = position => {
    switch (position) {
      case "top":
        return "bottom";
      case "bottom":
        return "top";
      case "left":
        return "right";
      case "right":
        return "left";
    }
  };

  const getImages = async () => {
    let response = await API.fetchMoviesFromGenre(genre.id);
    const images = response.data.results.map(movie => {
      if (movie.poster_path) {
        return movie.poster_path;
      }
    });
    setImages(images);
  };

  useEffect(() => {
    if (images.length) {
      const timeoutId = setTimeout(() => {
        if (position === "center") {
          setPosition(oppositePosition(position2));
          setPosition2("center");
        }
        if (position2 === "center") {
          setPosition("center");
          setPosition2(oppositePosition(position));
        }
      }, 1000);

      const timeoutId2 = setTimeout(() => {
        if (position !== "center") {
          setImage2(getRandomIndex());
        }
        if (position2 !== "center") {
          setImage(getRandomIndex());
        }
      }, 2000);

      const timeoutId3 = setTimeout(() => {
        if (position !== "center") {
          setPosition2(getRandomPosition());
        }
        if (position2 !== "center") {
          setPosition(getRandomPosition());
        }
        setResetCycle(resetCycle + 1);
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
        clearTimeout(timeoutId2);
        clearTimeout(timeoutId3);
      };
    }
  }, [images.length, resetCycle]);

  const getRandomIndex = () => {
    let index = Math.floor(Math.random() * images.length);
    console.log(index);

    while (index === image2) {
      index = Math.floor(Math.random() * images.length);
    }

    return index;
  };
  const getRandomPosition = () => {
    let positions = ["top", "bottom", "left", "right"];

    let position = positions[Math.floor(Math.random() * 4)];

    while (position === position2) {
      position = positions[Math.floor(Math.random() * 4)];
    }

    return position;
  };

  useEffect(() => {
    getImages();
  }, []);

  useEffect(() => {
    console.log(position, position2);
  });

  return images.length ? (
    <div className="genre-card">
      <div className="images-container">
        <img
          className={`current-image ${position}`}
          src={`${baseURL}${posterSizes[1]}${images[image]}`}
        />
        <img
          className={`next-image ${position2}`}
          src={`${baseURL}${posterSizes[1]}${images[image2]}`}
        />
      </div>
      <div className="genre-name">{genre.name}</div>
    </div>
  ) : null;
};

export default GenreCard;
