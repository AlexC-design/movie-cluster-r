import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { API } from "api";
import CarouselArrow from "../CarouselArrow/CarouselArrow";
import "./css/small-carousel.css";

const SmallCarousel = ({ id }) => {
  const [trailers, setTrailers] = useState([]);
  const [activeTrailer, setActiveTrailer] = useState(0);
  const [slices, setSlices] = useState([]);
  const [slicePercentage, setSlicePercentage] = useState({ left: 1, right: 1 });
  const [controlDisabled, setControlDisabled] = useState("none");

  // ----------------------- FETCHING TRAILERS ----------------------

  const { baseURL, backdropSizes } = useSelector(state => ({
    baseURL: state.config.images.secure_base_url,
    backdropSizes: state.config.images.backdrop_sizes
  }));

  const getMovieTrailers = async () => {
    if (baseURL) {
      const response = await API.fetchMovieTrailers(id);

      let trailers = response.data.youtube.map(trailer => trailer.source);

      setTrailers(trailers);
    }
  };

  useEffect(() => {
    getMovieTrailers();
  }, [id, baseURL]);

  // ----------------------- CAROUSEL CONTROLS ----------------------

  const nextSlide = () => {
    let slicesArray = [...slices];
    setSlices([slicesArray.pop()].concat(slicesArray));
    disableControl("right");
  };
  const prevSlide = () => {
    let slicesArray = [...slices];
    setSlices(slicesArray.concat(slicesArray.shift()));
    disableControl("left");
  };
  const jumpToSlide = index => {
    let slicesArray = [];
    let currentSlice = 0;

    const incrementCurrentSlice = () => {
      currentSlice < (trailers.lenth - 1) / 2
        ? currentSlice++
        : currentSlice === (trailers.length - 1) / 2
        ? (currentSlice *= -1)
        : currentSlice++;
    };

    for (let i = index; i <= trailers.length - 1; i++) {
      slicesArray[i] = currentSlice;
      incrementCurrentSlice();
    }

    for (let i = 0; i < index; i++) {
      slicesArray[i] = currentSlice;
      incrementCurrentSlice();
    }

    setSlices(slicesArray);
  };

  const disableControl = side => {
    setControlDisabled(side);

    //stopping videos on calrousel slide
    document.querySelectorAll(".trailer-video").forEach(video => {
      video.contentWindow.postMessage(
        '{"event":"command","func":"' + "stopVideo" + '","args":""}',
        "*"
      );
    });

    setTimeout(() => {
      setControlDisabled("none");
    }, 200);
  };

  // ------------------------ INDEX TO VALUES -------------------------

  const indexToPosition = index => {
    return (
      50 +
      slices[index] *
        (slicePercentage[slices[index] < 0 ? "left" : "right"] +
          10 -
          Math.abs(slices[index]))
    );
  };

  const indexToSize = index => {
    const sizeFromIndex = 1 - Math.abs(slices[index]) / 10;
    return sizeFromIndex > 0 ? sizeFromIndex : 0;
    return 1;
  };

  const indexToCoverOpacity = index => {
    return (Math.abs(slices[index]) / 5) * Math.abs(slices[index]) || 0;
    return 0;
  };

  const indexToZIndex = index => {
    return Math.floor(trailers.length / 2) - Math.abs(slices[index]) || 0;
  };

  // ----------------------- STYLES ----------------------

  const slideStyle = index => {
    return {
      zIndex: indexToZIndex(index),
      left: `${indexToPosition(index)}%`,
      transform: `scale(${indexToSize(index)})`
    };
  };

  const coverStyle = index => {
    return {
      opacity: indexToCoverOpacity(index)
    };
  };

  useEffect(() => {
    //creating slices array [0, 1, 2 ... L/2 ... -2, -1]
    let slicesArray = [];
    for (let i = 0; i <= trailers.length / 2; i++) {
      slicesArray[i] = i;
    }
    for (
      let i = Math.floor(trailers.length / 2) + 1;
      i <= trailers.length - 1;
      i++
    ) {
      slicesArray[i] = -(trailers.length - i);
    }
    setSlices(slicesArray);
  }, [trailers]);

  return trailers.length ? (
    <div className="carousel-container">
      {trailers.length > 1 && (
        <div className="carousel-controls">
          <CarouselArrow
            direction="left"
            disabled={controlDisabled === "left"}
            clickAction={prevSlide}
          />
          <CarouselArrow
            direction="right"
            disabled={controlDisabled === "right"}
            clickAction={nextSlide}
          />

          <div className="minimap">
            {trailers.map((_, index) => (
              <div
                className={`line ${slices[index] === 0 ? "active" : ""}`}
                key={`dot-${index}`}
                onClick={() => {
                  jumpToSlide(index);
                }}
              />
            ))}
          </div>
        </div>
      )}
      <div className="trailers-root">
        <div className="trailers-container">
          {trailers.map((trailer, index) => (
            <div
              className="trailer-container"
              style={slideStyle(index)}
              key={trailer}
            >
              <div
                className={`cover ${slices[index] === 0 ? "active" : ""}`}
                style={coverStyle(index)}
              />
              <iframe
                className={`trailer-video`}
                src={`https://www.youtube.com/embed/${trailer}?enablejsapi=1`}
                allowFullScreen
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : <div>No trailers available</div>;
};

export default SmallCarousel;
