import React, { useEffect, useState } from 'react';
import './App.css'; // Import CSS

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [mood, setMood] = useState('All');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/movies')
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
        setFilteredMovies(data);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  useEffect(() => {
    let updatedMovies = movies;

    if (mood !== 'All') {
      updatedMovies = updatedMovies.filter((movie) => movie.mood === mood);
    }

    if (searchTerm) {
      updatedMovies = updatedMovies.filter((movie) =>
        movie.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredMovies(updatedMovies);
  }, [searchTerm, mood, movies]);

  const handleWatched = (movieName) => {
    if (!watchedMovies.includes(movieName)) {
      setWatchedMovies([...watchedMovies, movieName]);
    }
  };

  const recommendSimilar = () => {
    if (watchedMovies.length === 0) return [];

    const lastWatched = watchedMovies[watchedMovies.length - 1];
    const lastMovie = movies.find((movie) => movie.name === lastWatched);

    if (!lastMovie) return [];

    return movies.filter(
      (movie) => movie.genre === lastMovie.genre && movie.name !== lastWatched
    );
  };

  const moods = ['All', 'Happy', 'Sad', 'Excited', 'Romantic', 'Scary'];

  return (
    <div className="container">
      <h1>🎬 Movie Recommender 🎬</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search Movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />

        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="dropdown"
        >
          {moods.map((m, index) => (
            <option key={index} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <h2>Available Movies</h2>
      <div className="movie-list">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie, index) => (
            <div
              key={index}
              className="movie-card"
              onClick={() => handleWatched(movie.name)}
            >
              <h3>{movie.name}</h3>
              <p>Genre: {movie.genre}</p>
              <p>Mood: {movie.mood}</p>
            </div>
          ))
        ) : (
          <p>No movies match your search!</p>
        )}
      </div>

      <h2>Based on Your Watched Movies</h2>
      <div className="movie-list">
        {recommendSimilar().length > 0 ? (
          recommendSimilar().map((movie, index) => (
            <div key={index} className="movie-card recommended">
              <h3>{movie.name}</h3>
              <p>Genre: {movie.genre}</p>
              <p>Mood: {movie.mood}</p>
            </div>
          ))
        ) : (
          <p>Watch a movie to get recommendations!</p>
        )}
      </div>
    </div>
  );
}

export default App;


