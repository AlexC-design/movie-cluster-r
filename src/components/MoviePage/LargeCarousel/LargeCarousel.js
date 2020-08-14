import React, { useEffect, useState } from "react";
import { API } from "../../../api";
import "./css/large-carousel.css";
import { useSelector } from "react-redux";
import CarouselArrow from "../CarouselArrow/CarouselArrow";

const LargeCarousel = ({ id }) => {
  const [images, setImages] = useState([]);
  const [activeImage, setActiveImage] = useState(0);
  const { baseURL, backdropSizes } = useSelector(state => ({
    baseURL: state.config.images.secure_base_url,
    backdropSizes: state.config.images.backdrop_sizes
  }));

  const getMovieImages = async () => {
    if (baseURL) {
      const response = await API.fetchMovieImages(id);

      let images = response.data.backdrops.map((image, index) => {
        return `${baseURL}${backdropSizes[2]}${image.file_path}`;
      });

      if (images.length > 18) {
        images = images.slice(0, 18);
      }
      setImages(images);
    }
  };

  useEffect(() => {
    getMovieImages();
  }, [id, baseURL]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      nextSlide();
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  });

  const prevSlide = () => {
    if (activeImage === 0) {
      setActiveImage(images.length - 1);
    } else {
      setActiveImage(activeImage - 1);
    }
  };
  const nextSlide = () => {
    if (activeImage === images.length - 1) {
      setActiveImage(0);
    } else {
      setActiveImage(activeImage + 1);
    }
  };

  return (
    <div className="large-carousel">
      <CarouselArrow direction="left" clickAction={prevSlide} />
      <CarouselArrow direction="right" clickAction={nextSlide} />
      <div className="image-container">
        <div className="dots">
          {images.map((image, index) => (
            <div
              className={`dot ${index === activeImage ? "active" : ""}`}
              onClick={() => setActiveImage(index)}
              key={`${image}-dot`}
            />
          ))}
        </div>
        <img className="size-control-image" src={images[0]} alt="" />
        {images.map((image, index) => (
          <img
            className={`carousel-image ${
              index === activeImage ? "active" : ""
            }`}
            src={image}
            alt=""
            key={image}
          />
        ))}
      </div>
    </div>
  );
};

export default LargeCarousel;
