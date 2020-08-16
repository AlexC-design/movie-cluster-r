import axios from "../axios";

export const API = {
  fetchConfig: async () => {
    return await axios.get(`/configuration`);
  },

  fetchMovies: async (listType, page) => {
    return await axios.get(`/movie/${listType}`, {
      params: { page }
    });
  },

  fetchMovieDetails: async id => {
    return await axios.get(`/movie/${id}`);
  },

  fetchMovieImages: async id => {
    return await axios.get(`/movie/${id}/images`);
  },

  fetchMovieTrailers: async id => {
    return await axios.get(`/movie/${id}/trailers`);
  },

  fetchMovieCredits: async id => {
    return await axios.get(`/movie/${id}/credits`);
  },

  fetchSimilarMovies: async id => {
    return await axios.get(`/movie/${id}/recommendations`);
  },

  fetchGenres: async () => {
    return await axios.get("/genre/movie/list");
  },

  fetchMoviesFromGenre: async (id, page) => {
    return await axios.get(`/discover/movie`, {
      params: { page, with_genres: `${id}` }
    });
  },

  searchMovies: async (page, query) => {
    return await axios.get(`/search/movie`, {
      params: { page, query }
    });
  }
};
