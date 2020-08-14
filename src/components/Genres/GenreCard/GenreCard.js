import React, { useState, useEffect } from "react";
import { API } from "../../../api";
import { useSelector, useDispatch } from "react-redux";
import "./css/genre-card.css";
import { setGenre } from "../../../store/state/genre";
import { withRouter } from "react-router";

const GenreCard = ({ genre, how, history }) => {
  const [images, setImages] = useState([]);
  const [image, setImage] = useState(0);
  const [image2, setImage2] = useState(1);
  const [position, setPosition] = useState("center");
  const [position2, setPosition2] = useState(
    ["top", "bottom", "left", "right"][Math.floor(Math.random() * 4)]
  );
  const [resetCycle, setResetCycle] = useState(0);
  const dispatch = useDispatch();

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

  // --------------------- FETCHING IMAGES -----------------------

  const getImages = async () => {
    let response = await API.fetchMoviesFromGenre(genre.id);

    const images = response.data.results.reduce((moviePaths, movie) => {
      if (movie.poster_path) {
        moviePaths.push(movie.poster_path);
      }
      return moviePaths;
    }, []);

    setImages(images);
  };

  useEffect(() => {
    getImages();
  }, []);

  // ------------------------- CYCLE -------------------------

  useEffect(() => {
    let timer = 1000 * Math.floor(Math.random() * 5);

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
      }, timer + 500);

      const timeoutId2 = setTimeout(() => {
        if (position !== "center") {
          setImage2(getRandomIndex());
        }
        if (position2 !== "center") {
          setImage(getRandomIndex());
        }
      }, timer + 2500);

      const timeoutId3 = setTimeout(() => {
        if (position !== "center") {
          setPosition2(getRandomPosition());
        }
        if (position2 !== "center") {
          setPosition(getRandomPosition());
        }
        setResetCycle(resetCycle + 1);
      }, timer + 2600);

      return () => {
        clearTimeout(timeoutId);
        clearTimeout(timeoutId2);
        clearTimeout(timeoutId3);
      };
    }
  }, [images.length, resetCycle]);

  // ------------------- GET NEW RANDOM VALUES ----------------------

  const getRandomIndex = () => {
    let index = Math.floor(Math.random() * images.length);

    while ([image, image2].includes(index)) {
      index = Math.floor(Math.random() * images.length);
    }

    return index;
  };
  const getRandomPosition = () => {
    let positions = ["top", "bottom", "left", "right"];

    let newPosition = positions[Math.floor(Math.random() * 4)];

    while (
      [oppositePosition(position), oppositePosition(position2)].includes(
        newPosition
      )
    ) {
      newPosition = positions[Math.floor(Math.random() * 4)];
    }

    return newPosition;
  };

  // ------------------- GO TO GENRE ----------------------

  const handleClick = () => {
    console.log(genre)
    dispatch(setGenre(genre));
    history.push(`genre/${genre.id}`);
  };

  return images.length ? (
    <>
      <div className="genre-card" onClick={handleClick}>
        <div className={`images-container ${how ? "how" : ""}`}>
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

      {how && (
        <div style={{ position: "absolute", top: "700px", textAlign: "left" }}>
          <div className="mc-green">image1 pos: ["{position} "]</div>
          <div className="mc-yellow">image2 pos: ["{position2}"]</div>

          <div>
            [{" "}
            {images.map((_, index) => (
              <span
                className={`${
                  index === image
                    ? "mc-green"
                    : index === image2
                    ? "mc-yellow"
                    : ""
                }`}
              >
                {index}
                {index !== images.length - 1 ? ", " : " "}
              </span>
            ))}
            ]
          </div>
          <div>
            {["top", "bottom", "left", "right"].map(pos => (
              <span
                className={`${
                  pos === position
                    ? "mc-green"
                    : pos === position2
                    ? "mc-yellow"
                    : ""
                }`}
              >
                ["{pos}"]
              </span>
            ))}
          </div>

          <div>cycle: {resetCycle} </div>
        </div>
      )}
    </>
  ) : null;
};

export default withRouter(GenreCard);
