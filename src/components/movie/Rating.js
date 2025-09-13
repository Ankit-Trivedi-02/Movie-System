import React, { useState } from 'react';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';

const Rating = ({ initialRating = 0, onRate, readOnly = false }) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);
  
  const handleClick = (value) => {
    if (readOnly) return;
    
    setRating(value);
    if (onRate) {
      onRate(value);
    }
  };
  
  return (
    <RatingContainer>
      {[...Array(5)].map((_, index) => {
        const value = index + 1;
        
        return (
          <StarContainer
            key={index}
            onClick={() => handleClick(value)}
            onMouseEnter={() => !readOnly && setHover(value)}
            onMouseLeave={() => !readOnly && setHover(0)}
            readOnly={readOnly}
          >
            <Star 
              active={value <= (hover || rating)}
              readOnly={readOnly}
            />
          </StarContainer>
        );
      })}
      
      {!readOnly && <RatingText>{rating > 0 ? `${rating}/5` : 'Rate this'}</RatingText>}
    </RatingContainer>
  );
};

// Styled Components
const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StarContainer = styled.div`
  cursor: ${({ readOnly }) => (readOnly ? 'default' : 'pointer')};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Star = styled(FaStar)`
  color: ${({ active }) => (active ? '#ffc107' : '#e4e5e9')};
  font-size: 24px;
  transition: color 0.2s ease;
  
  ${({ readOnly }) => !readOnly && `
    &:hover {
      color: #ffc107;
    }
  `}
`;

const RatingText = styled.span`
  margin-left: 8px;
  font-size: 14px;
  color: #b3b3b3;
`;

export default Rating;