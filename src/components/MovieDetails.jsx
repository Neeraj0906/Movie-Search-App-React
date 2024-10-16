import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // This should be at the top
import { fetchMovieDetails } from '../services/omdbAPI'; // This should also be at the top

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(id);
        if (data.Response === 'True') {
          setMovie(data);
        } else {
          setError(data.Error);
        }
      } catch (err) {
        setError('Failed to fetch movie details.');
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4" style={{backgroundColor:"black",color:"green",fontSize:"20px",width:"100%",paddingLeft:"20px"}}>
      <h1 className="text-2xl font-bold">{movie.Title}</h1>
      <img style={{marginTop:"-40px"}} src={movie.Poster} alt={movie.Title} className="my-4 w-full max-w-sm" />
      <p ><strong>Release Year:</strong> {movie.Released}</p>
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p style={{width:"80%"}}><strong>Plot:</strong> {movie.Plot}</p>
      <p><strong>Ratings:</strong></p>
      <ul>
        {movie.Ratings.map((rating) => (
          <li key={rating.Source}>
            {rating.Source}: {rating.Value}
          </li>
        ))}
      </ul>
      <p><strong>Cast:</strong> {movie.Actors}</p>
    </div>
  );
};

export default MovieDetails;
