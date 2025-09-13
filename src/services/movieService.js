import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with auth header
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Add auth token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const movieService = {
  // Get trending movies
  getTrending: async () => {
    const response = await axiosInstance.get('/movies/trending');
    return response.data;
  },

  // Get personalized recommendations
  getRecommendations: async () => {
    const response = await axiosInstance.get('/movies/recommendations');
    return response.data;
  },

  // Get movie details by ID
  getMovieById: async (movieId) => {
    const response = await axiosInstance.get(`/movies/${movieId}`);
    return response.data;
  },

  // Get user's watchlist
  getWatchlist: async () => {
    const response = await axiosInstance.get('/movies/watchlist');
    return response.data;
  },

  // Add movie to watchlist
  addToWatchlist: async (movieId) => {
    const response = await axiosInstance.put('/movies/watchlist', { movieId });
    return response.data;
  },

  // Remove movie from watchlist
  removeFromWatchlist: async (movieId) => {
    const response = await axiosInstance.delete(`/movies/watchlist/${movieId}`);
    return response.data;
  },

  // Rate a movie
  rateMovie: async (movieId, rating) => {
    const response = await axiosInstance.post('/movies/rating', {
      movieId,
      rating,
    });
    return response.data;
  },

  // Search movies by title or keyword
  searchMovies: async (query) => {
    const response = await axiosInstance.get(`/movies/search?q=${query}`);
    return response.data;
  },

  // Get user's rated movies
  getRatedMovies: async () => {
    const response = await axiosInstance.get('/movies/rated');
    return response.data;
  },
};

export default movieService;