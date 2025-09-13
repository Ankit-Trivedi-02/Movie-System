import React, { useState, useEffect } from 'react';
import './MovieHome.css';

const MovieHome = () => {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [moviesForYou, setMoviesForYou] = useState([]);
    const [moviesYouMayLike, setMoviesYouMayLike] = useState([]);

    // Fetch trending movies
    useEffect(() => {
        const fetchTrendingMovies = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/movies/trending/top');
                const data = await response.json();
                setTrendingMovies(data);
            } catch (error) {
                console.error('Error fetching trending movies:', error);
            }
        };

        // Fetch "Movies for You"
        const fetchMoviesForYou = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/movies');
                const data = await response.json();
                setMoviesForYou(data);
            } catch (error) {
                console.error('Error fetching movies for you:', error);
            }
        };

        // Fetch "Movies you may like"
        const fetchMoviesYouMayLike = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/movies/you-may-like/random');
                const data = await response.json();
                setMoviesYouMayLike(data);
            } catch (error) {
                console.error('Error fetching movies you may like:', error);
            }
        };

        fetchTrendingMovies();
        fetchMoviesForYou();
        fetchMoviesYouMayLike();
    }, []);

    // Render movie cards
    const renderMovieCards = (movies) => {
        return movies.map((movie) => (
            <div key={movie._id} className="movie-card">
                <img
                    src={movie.posterUrl || 'https://via.placeholder.com/300x450'}
                    alt={movie.title}
                    className="movie-poster"
                />
                <div className="movie-details">
                    <h3>{movie.title}</h3>
                    <p>{movie.description}</p>
                    <p><strong>Genres:</strong> {movie.genres.join(', ')}</p>
                    <p><strong>Director:</strong> {movie.director}</p>
                </div>
            </div>
        ));
    };

    return (
        <div className="movie-home">
            <h1 className="title">Movie Home</h1>

            <section className="movie-section">
                <h2>Trending Movies</h2>
                <div className="movie-list">{renderMovieCards(trendingMovies)}</div>
            </section>

            <section className="movie-section">
                <h2>Movies For You</h2>
                <div className="movie-list">{renderMovieCards(moviesForYou)}</div>
            </section>

            <section className="movie-section">
                <h2>Movies You May Like</h2>
                <div className="movie-list">{renderMovieCards(moviesYouMayLike)}</div>
            </section>
        </div>
    );
};

export default MovieHome;
