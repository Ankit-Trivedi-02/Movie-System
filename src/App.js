import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Auth Components
import ProtectedRoute from './components/auth/ProtectedRoute';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Main Pages
import Home from './pages/Home';
import MovieDetail from './pages/movie/MovieDetail';
import Watchlist from './pages/user/Watchlist';
import Profile from './pages/user/Profile';
import SearchResults from './pages/search/SearchResults';
import MovieHome from './pages/MovieHome/MovieHome';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected Routes - Using the ProtectedRoute component */}
      
        <Route path="/" element={<MovieHome />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<SearchResults />} />
   
      
      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;