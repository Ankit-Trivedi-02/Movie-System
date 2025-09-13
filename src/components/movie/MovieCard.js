import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaStar, FaPlus, FaCheck } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';

const MovieCard = ({ movie, inWatchlist, onAddToWatchlist, onRemoveFromWatchlist }) => {
  const { isAuthenticated } = useAuth();
  
  const handleWatchlistToggle = (e) => {
    e.preventDefault(); // Prevent navigation to movie details
    
    if (inWatchlist) {
      onRemoveFromWatchlist(movie.id);
    } else {
      onAddToWatchlist(movie.id);
    }
  };
  
  return (
    <CardContainer to={`/movie/${movie.id}`}>
      <CardImage src={movie.poster_path} alt={movie.title} />
      
      <CardOverlay>
        <CardTitle>{movie.title}</CardTitle>
        
        <CardMeta>
          <CardRating>
            <FaStar />
            <span>{movie.vote_average?.toFixed(1) || 'N/A'}</span>
          </CardRating>
          
          <CardYear>{movie.release_date?.substring(0, 4) || 'N/A'}</CardYear>
        </CardMeta>
        
        {isAuthenticated && (
          <CardActions>
            <WatchlistButton onClick={handleWatchlistToggle}>
              {inWatchlist ? <FaCheck /> : <FaPlus />}
            </WatchlistButton>
          </CardActions>
        )}
        
        {movie.genres && (
          <CardGenres>
            {movie.genres.slice(0, 3).map((genre, index) => (
              <CardGenre key={index}>{genre}</CardGenre>
            ))}
          </CardGenres>
        )}
      </CardOverlay>
    </CardContainer>
  );
};

// Styled Components
const CardContainer = styled(Link)`
  position: relative;
  width: 200px;
  height: 300px;
  border-radius: 4px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  flex-shrink: 0;
  text-decoration: none;
  color: white;
  
  &:hover {
    transform: scale(1.05);
    z-index: 10;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
  }
  
  &:hover > div:last-child {
    opacity: 1;
  }
  
  @media (max-width: 768px) {
    width: 150px;
    height: 225px;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
`;

const CardRating = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #ffc107;
`;

const CardYear = styled.div`
  color: #b3b3b3;
`;

const CardActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
`;

const WatchlistButton = styled.button`
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid white;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const CardGenres = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const CardGenre = styled.span`
  font-size: 12px;
  color: #b3b3b3;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 2px 6px;
  border-radius: 4px;
`;

export default MovieCard;