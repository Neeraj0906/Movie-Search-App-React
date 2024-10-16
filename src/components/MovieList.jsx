import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies }) => {
  // Display a message if no movies are found
  if (!movies.length) {
    return <p className="text-center text-gray-500">No movies found.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
