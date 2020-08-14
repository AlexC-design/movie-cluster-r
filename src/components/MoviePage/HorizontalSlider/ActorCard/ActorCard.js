import React from "react";
import "./css/actor-card.css";
import { useSelector } from "react-redux";

const ActorCard = ({ actor }) => {
  const { baseURL, profileSizes } = useSelector(state => ({
    baseURL: state.config.images.secure_base_url,
    profileSizes: state.config.images.profile_sizes
  }));

  return (
    <div className="actor-card">
      <img src={`${baseURL}${profileSizes[1]}${actor.profile_path}`} alt="" />
      <div className="charater-name">{actor.character}</div>
      <div className="actor-name">{actor.name}</div>
    </div>
  );
};

export default ActorCard;
