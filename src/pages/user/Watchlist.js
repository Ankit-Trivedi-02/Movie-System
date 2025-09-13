import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import movieService from '../../services/movieService';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        setLoading(true);
        const data = await movieService.getWatchlist();
        setWatchlist(data);
      } catch (err) {
        setError('Failed to fetch watchlist. Please try again later.');
        console.error('Error fetching watchlist:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchWatchlist();
  }, []);
  
  const handleRemoveFromWatchlist = async (movieId) => {
    try {
      await movieService.removeFromWatchlist(movieId);
      // Update watchlist state by filtering out the removed movie
      setWatchlist(watchlist.filter(movie => movie.id !== movieId));
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
    <WatchlistContainer>
      <WatchlistHeader>
        <WatchlistTitle>My Watchlist</WatchlistTitle>
        <WatchlistCount>{watchlist.length} {watchlist.length === 1 ? 'movie' : 'movies'}</WatchlistCount>
      </WatchlistHeader>
      
      {watchlist.length === 0 ? (
        <EmptyWatchlist>
          <EmptyMessage>Your watchlist is empty</EmptyMessage>
          <EmptySubMessage>Add movies to your watchlist to see them here</EmptySubMessage>
          <BrowseLink to="/">Browse Movies</BrowseLink>
        </EmptyWatchlist>
      ) : (
        <WatchlistGrid>
          {watchlist.map(movie => (
            <WatchlistItem key={movie.id}>
              <MovieLink to={`/movie/${movie.id}`}>
                <MoviePoster src={movie.poster_path} alt={movie.title} />
                <MovieOverlay>
                  <MovieTitle>{movie.title}</MovieTitle>
                  <MovieYear>{movie.release_date?.substring(0, 4)}</MovieYear>
                </MovieOverlay>
              </MovieLink>
              
              <RemoveButton onClick={() => handleRemoveFromWatchlist(movie.id)}>
                <FaTrash />
              </RemoveButton>
            </WatchlistItem>
          ))}
        </WatchlistGrid>
      )}
    </WatchlistContainer>
  );
};

// Styled Components
const WatchlistContainer = styled.div`
  width: 100%;
`;

const WatchlistHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
`;

const WatchlistTitle = styled.h1`
  font-size: 32px;
  font-weight: 500;
`;

const WatchlistCount = styled.span`
  font-size: 16px;
  color: #b3b3b3;
`;

const WatchlistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 16px;
  }
`;

const WatchlistItem = styled.div`
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    z-index: 10;
  }
`;

const MovieLink = styled(Link)`
  text-decoration: none;
  color: white;
  display: block;
`;

const MoviePoster = styled.img`
  width: 100%;
  aspect-ratio: 2/3;
  object-fit: cover;
`;

const MovieOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${WatchlistItem}:hover & {
    opacity: 1;
  }
`;

const MovieTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MovieYear = styled.span`
  font-size: 14px;
  color: #b3b3b3;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease, background-color 0.3s ease;
  
  ${WatchlistItem}:hover & {
    opacity: 1;
  }
  
  &:hover {
    background-color: rgba(229, 9, 20, 0.8);
  }
`;

const EmptyWatchlist = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  text-align: center;
`;

const EmptyMessage = styled.h2`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const EmptySubMessage = styled.p`
  font-size: 16px;
  color: #b3b3b3;
  margin-bottom: 24px;
`;

const BrowseLink = styled(Link)`
  background-color: #e50914;
  color: white;
  padding: 12px 24px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #f40612;
  }
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

export default Watchlist;