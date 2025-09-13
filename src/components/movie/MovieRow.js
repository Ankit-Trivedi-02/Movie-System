import React, { useRef } from 'react';
import styled from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import MovieCard from './MovieCard';

const MovieRow = ({ title, movies, watchlist = [], onAddToWatchlist, onRemoveFromWatchlist }) => {
  const rowRef = useRef(null);
  
  const scroll = (direction) => {
    if (rowRef.current) {
      const { current } = rowRef;
      const scrollAmount = direction === 'left' ? -400 : 400;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  const isInWatchlist = (movieId) => {
    return watchlist.some(item => item.id === movieId);
  };
  
  return (
    <RowContainer>
      <RowHeader>
        <RowTitle>{title}</RowTitle>
      </RowHeader>
      
      <RowContent>
        <ScrollButton direction="left" onClick={() => scroll('left')}>
          <FaChevronLeft />
        </ScrollButton>
        
        <MoviesContainer ref={rowRef}>
          {movies.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              inWatchlist={isInWatchlist(movie.id)}
              onAddToWatchlist={onAddToWatchlist}
              onRemoveFromWatchlist={onRemoveFromWatchlist}
            />
          ))}
        </MoviesContainer>
        
        <ScrollButton direction="right" onClick={() => scroll('right')}>
          <FaChevronRight />
        </ScrollButton>
      </RowContent>
    </RowContainer>
  );
};

// Styled Components
const RowContainer = styled.div`
  margin-bottom: 40px;
`;

const RowHeader = styled.div`
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RowTitle = styled.h2`
  font-size: 24px;
  font-weight: 500;
  color: white;
`;

const RowContent = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const MoviesContainer = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 10px 0;
  scrollbar-width: none; /* Firefox */
  
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const ScrollButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ direction }) => direction === 'left' ? 'left: 0;' : 'right: 0;'}
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
  
  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
  }
`;

export default MovieRow;