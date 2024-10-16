import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import { fetchMovies } from './services/omdbAPI';
import MovieDetails from './components/MovieDetails';  // Import MovieDetails component

const App = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (searchTerm) => {
    try {
      const data = await fetchMovies(searchTerm);
      if (data.Response === 'True') {
        setMovies(data.Search);
        setError(null);
      } else {
        setError(data.Error);
        setMovies([]);
      }
    } catch (err) {
      setError('An error occurred while fetching movies.');
      setMovies([]);
    }
  };

  return (
    <Router>
      <div className="container mx-auto">
        <SearchBar onSearch={handleSearch} />
        <Routes>
          <Route
            path="/"
            element={
              <div className="my-4">
                {error ? (
                  <p className="text-red-500">{error}</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {movies.map((movie) => (
                      <div key={movie.imdbID} className="p-2 border rounded shadow">
                        <a href={`/movie/${movie.imdbID}`}> {/* Link to movie details */}
                          <img
                            src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}
                            alt={movie.Title}
                            className="w-full h-60 object-cover"
                          />
                          <h3 className="text-lg font-semibold mt-2">{movie.Title}</h3>
                          <p className="text-gray-500">{movie.Year}</p>
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            }
          />
          <Route path="/movie/:id" element={<MovieDetails />} />  {/* Movie details page route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
