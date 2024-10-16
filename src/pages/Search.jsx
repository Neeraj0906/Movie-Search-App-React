import React, { useState, useEffect } from 'react';
import { searchMovies } from '../api/api';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';

const Search = () => {
  const [movies, setMovies] = useState([]);
  const [type, setType] = useState('');
  const [query, setQuery] = useState('Marvel'); // Default search term
  
  // Fetch movies based on search query and type (filter)
  useEffect(() => {
    const fetchData = async () => {
      const data = await searchMovies(query, 1, type);
      console.log(data);  // Check the API response in the console
      if (data && data.Search) {
        setMovies(data.Search);  // Update movies state if data exists
      } else {
        setMovies([]);  // Clear the movie list if no data
      }
    };
    fetchData();
  }, [query, type]);

  // Handle search query from SearchBar component
  const handleSearch = (newQuery) => {
    setQuery(newQuery);
  };

  return (
    <div className="p-8">
      <SearchBar onSearch={handleSearch} />
      
      {/* Dropdown filter for movie types */}
      <div className="flex justify-end mb-4">
        <select 
          onChange={(e) => setType(e.target.value)} 
          className="border p-2 rounded-md"
        >
          <option value="">All</option>
          <option value="movie">Movies</option>
          <option value="series">Series</option>
        </select>
      </div>

      {/* Display MovieList */}
      <MovieList movies={movies} />
    </div>
  );
};

export default Search;
