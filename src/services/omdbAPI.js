// src/services/omdbAPI.js

const API_KEY = '89b17cde'; // Replace with your OMDB API key

// Function to fetch movies based on a search query
export const fetchMovies = async (query) => {
  const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${API_KEY}`);
  const data = await response.json();
  return data;
};

// Function to fetch detailed information about a specific movie
export const fetchMovieDetails = async (id) => {
  const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
  const data = await response.json();
  return data;
};
