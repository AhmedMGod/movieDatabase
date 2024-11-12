import axios from "axios";

const REST_API_BASE_URL = "/api/movie"


export const listMovies = () => axios.get(REST_API_BASE_URL + "/getAll");

export const addMovie = (movie) => axios.post(REST_API_BASE_URL + "/add", movie);

export const getMovieById = (movieId) => axios.get(REST_API_BASE_URL + "/" + movieId);

export const updateMovie = (movieId, movie) => axios.put(REST_API_BASE_URL + "/update/" + movieId, movie);

export const deleteMovie = (movieId) => axios.delete(REST_API_BASE_URL + "/delete/" + movieId);