import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <div className="border p-4 rounded-md shadow-lg">
      <Link to={`/movie/${movie.omdbID}`}>
        <img src={movie.Poster} alt={movie.Title} className="w-full h-60 object-cover rounded-md" />
        <h3 className="text-lg font-bold mt-2">{movie.Title}</h3>
        <p>{movie.Year}</p>
      </Link>
    </div>
  );
};

export default MovieCard;
