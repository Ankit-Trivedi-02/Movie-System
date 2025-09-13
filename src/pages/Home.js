import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MovieRow from '../components/movie/MovieRow';
import movieService from '../services/movieService';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch trending movies
        const trendingData = await movieService.getTrending();
        setTrendingMovies(trendingData);
        
        // Fetch personalized recommendations if authenticated
        if (isAuthenticated) {
          const recommendationsData = await movieService.getRecommendations();
          setRecommendedMovies(recommendationsData);
          
          // Fetch user's watchlist
          const watchlistData = await movieService.getWatchlist();
          setWatchlist(watchlistData);
        }
      } catch (err) {
        setError('Failed to fetch movies. Please try again later.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [isAuthenticated]);
  
  const handleAddToWatchlist = async (movieId) => {
    try {
      await movieService.addToWatchlist(movieId);
      // Refresh watchlist
      const watchlistData = await movieService.getWatchlist();
      setWatchlist(watchlistData);
    } catch (err) {
      console.error('Error adding to watchlist:', err);
    }
  };
  
  const handleRemoveFromWatchlist = async (movieId) => {
    try {
      await movieService.removeFromWatchlist(movieId);
      // Refresh watchlist
      const watchlistData = await movieService.getWatchlist();
      setWatchlist(watchlistData);
    } catch (err) {
      console.error('Error removing from watchlist:', err);
    }
  };
  
  if (loading) {
    return <LoadingContainer>Loading...</LoadingContainer>;
  }
  
  if (error) {
    return <ErrorContainer>{error}</ErrorContainer>;
  }
  
  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Welcome to MovieRec</HeroTitle>
          <HeroSubtitle>Discover movies tailored just for you</HeroSubtitle>
        </HeroContent>
      </HeroSection>
      
      <ContentSection>
        {trendingMovies.length > 0 && (
          <MovieRow
            title="Trending Now"
            movies={trendingMovies}
            watchlist={watchlist}
            onAddToWatchlist={handleAddToWatchlist}
            onRemoveFromWatchlist={handleRemoveFromWatchlist}
          />
        )}
        
        {isAuthenticated && recommendedMovies.length > 0 && (
          <MovieRow
            title="Recommended For You"
            movies={recommendedMovies}
            watchlist={watchlist}
            onAddToWatchlist={handleAddToWatchlist}
            onRemoveFromWatchlist={handleRemoveFromWatchlist}
          />
        )}
      </ContentSection>
    </HomeContainer>
  );
};

// Styled Components
const HomeContainer = styled.div`
  width: 100%;
`;

const HeroSection = styled.div`
  height: 60vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.png');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  border-radius: 8px;
  
  @media (max-width: 768px) {
    height: 40vh;
  }
`;

const HeroContent = styled.div`
  text-align: center;
  max-width: 800px;
  padding: 0 20px;
`;

const HeroTitle = styled.h1`
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 16px;
  color: white;
  
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 24px;
  color: #e5e5e5;
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const ContentSection = styled.div`
  padding: 0 20px;
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60vh;
  font-size: 24px;
  color: #b3b3b3;
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60vh;
  font-size: 18px;
  color: #e50914;
  text-align: center;
  padding: 0 20px;
`;

export default Home;