# Movie Recommendation App

A Netflix-inspired movie recommendation application built with React. This application allows users to browse trending movies, get personalized recommendations, search for movies, manage a watchlist, and rate movies.

## Features

- **User Authentication**: Register, login, and profile management
- **Movie Discovery**: Browse trending movies and personalized recommendations
- **Search Functionality**: Search for movies by title, actor, or genre
- **Watchlist Management**: Add/remove movies to your watchlist
- **Movie Ratings**: Rate movies and view your rated movies
- **Responsive Design**: Netflix-inspired UI that works on all devices

## Project Structure

```
├── public/                # Static files
│   ├── index.html        # HTML entry point
│   └── manifest.json     # Web app manifest
├── src/                  # Source code
│   ├── assets/           # CSS, images, and other static assets
│   ├── components/       # Reusable React components
│   │   ├── auth/         # Authentication-related components
│   │   ├── common/       # Common UI components
│   │   ├── layout/       # Layout components
│   │   └── movie/        # Movie-related components
│   ├── context/          # React context providers
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Page components
│   │   ├── auth/         # Authentication pages
│   │   ├── movie/        # Movie-related pages
│   │   ├── search/       # Search results page
│   │   └── user/         # User profile and watchlist pages
│   ├── services/         # API service modules
│   ├── utils/            # Utility functions
│   ├── App.js            # Main App component with routing
│   └── index.js          # React entry point
└── package.json          # Project dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Backend API

This frontend application expects a backend API running at `http://localhost:5000/api` with the following endpoints:

- **Authentication**
  - POST `/api/auth/register` - Register a new user
  - POST `/api/auth/login` - Login a user
  - GET `/api/auth/profile` - Get user profile
  - PUT `/api/auth/profile` - Update user profile

- **Movies**
  - GET `/api/movies/trending` - Get trending movies
  - GET `/api/movies/recommendations` - Get personalized recommendations
  - GET `/api/movies/:id` - Get movie details
  - GET `/api/movies/search?q=query` - Search movies
  - GET `/api/movies/watchlist` - Get user's watchlist
  - PUT `/api/movies/watchlist` - Add movie to watchlist
  - DELETE `/api/movies/watchlist/:id` - Remove movie from watchlist
  - POST `/api/movies/rating` - Rate a movie
  - GET `/api/movies/rated` - Get user's rated movies

## Technologies Used

- **React** - Frontend library
- **React Router** - Navigation and routing
- **Axios** - API requests
- **Styled Components** - Styling
- **React Icons** - Icon library

## Future Enhancements

- Add movie trailers
- Implement social features (sharing, comments)
- Add genre filtering
- Implement advanced recommendation algorithms
- Add dark/light theme toggle