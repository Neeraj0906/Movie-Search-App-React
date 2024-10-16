import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import { fetchMovies } from './services/omdbAPI';
import MovieDetails from './components/MovieDetails'; 
import backgroundImage from './assets/movie-collage-wallpaper-thumb.jpg';

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
    <div style={{ 
      backgroundImage: `url(${backgroundImage})`,
      height: "98vh",
      width: "98vw",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "20px",
      opacity: 0.9,
      marginLeft:"8px"
    }}>
      <Router>
        <div className="container mx-auto">
          <SearchBar onSearch={handleSearch} />
          <Routes>
            <Route path="/" element={
              <div className="my-4">
                {error ? (
                  <p className="text-red-500">{error}</p>
                ) : (
                  <div 
                    className="flex flex-wrap justify-center" // Use flexbox for layout
                    style={{
                      borderRadius:"10px",
                      backgroundColor: "#005f5f", // Bluish-green background color
                      padding: "20px",
                      width: "97.5%", // Width of the container
                      margin: "0 auto", // Center the container
                      display:"flex",
                      flexWrap:"wrap",
                    }}
                  >
                    {movies.map((movie) => (
                     <div 
                     key={movie.imdbID} 
                     style={{
                       width: "280px",  // Adjusted width for each card
                       height: "300px", // Adjusted height for each card
                       margin: "10px", // Space between cards
                       border: "1px solid #ccc", // Border for the card
                       borderRadius: "10px",
                       overflow: "hidden", // Ensures the content doesn't overflow
                       backgroundColor: "orange", // Background color for the card
                       opacity: "1",
                       transition: "transform 0.3s ease", // Smooth transition for transform
                       marginLeft:"60px"
                      }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.transform = "scale(1.05)"; // Scale up on hover
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.transform = "scale(1)"; // Scale back on mouse leave
                     }}
                   >
                        <a href={`/movie/${movie.imdbID}`}>
                          <img
                            src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}
                            alt={movie.Title}
                            style={{
                              width: "100%", // Ensures the image takes full width
                              height: "200px", // Adjusted height for the image
                              objectFit: "cover" // Ensures the image covers the area without distortion
                            }}
                          />
                          <h3 className="text-lg font-semibold mt-2" style={{marginLeft:"1px",color:"black"}}>{movie.Title}</h3>
                          <p className="text-gray-500" style={{marginLeft:"1px",color:"green"}}>{movie.Year}</p>
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            }/>
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
