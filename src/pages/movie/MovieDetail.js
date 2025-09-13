import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FaPlus, FaCheck, FaArrowLeft } from 'react-icons/fa';
import Rating from '../../components/movie/Rating';
import movieService from '../../services/movieService';
import { useNavigate } from 'react-router-dom';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [movie, setMovie] = useState(null);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        
        // Fetch movie details
        const movieData = await movieService.getMovieById(id);
        setMovie(movieData);
        
        // Check if movie is in watchlist
        const watchlistData = await movieService.getWatchlist();
        setInWatchlist(watchlistData.some(item => item.id === parseInt(id)));
        
        // Get user's rating for this movie if available
        if (movieData.user_rating) {
          setUserRating(movieData.user_rating);
        }
      } catch (err) {
        setError('Failed to fetch movie details. Please try again later.');
        console.error('Error fetching movie details:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovieDetails();
  }, [id]);
  
  const handleWatchlistToggle = async () => {
    try {
      if (inWatchlist) {
        await movieService.removeFromWatchlist(id);
        setInWatchlist(false);
      } else {
        await movieService.addToWatchlist(id);
        setInWatchlist(true);
      }
    } catch (err) {
      console.error('Error toggling watchlist:', err);
    }
  };
  
  const handleRating = async (rating) => {
    try {
      await movieService.rateMovie(id, rating);
      setUserRating(rating);
    } catch (err) {
      console.error('Error rating movie:', err);
    }
  };
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  if (loading) {
    return <LoadingContainer>Loading...</LoadingContainer>;
  }
  
  if (error || !movie) {
    return <ErrorContainer>{error || 'Movie not found'}</ErrorContainer>;
  }
  
  return (
    <DetailContainer>
      <BackButton onClick={handleGoBack}>
        <FaArrowLeft />
        <span>Back</span>
      </BackButton>
      
      <MovieHeader style={{ backgroundImage: `url(${movie.backdrop_path})` }}>
        <HeaderOverlay>
          <PosterContainer>
            <PosterImage src={movie.poster_path} alt={movie.title} />
          </PosterContainer>
          
          <MovieInfo>
            <MovieTitle>{movie.title}</MovieTitle>
            
            <MovieMeta>
              <MetaItem>{movie.release_date?.substring(0, 4)}</MetaItem>
              <MetaItem>{movie.runtime} min</MetaItem>
              <MetaItem>{movie.vote_average?.toFixed(1)} ⭐</MetaItem>
            </MovieMeta>
            
            <GenreList>
              {movie.genres?.map((genre, index) => (
                <GenreTag key={index}>{genre}</GenreTag>
              ))}
            </GenreList>
            
            <ActionButtons>
              <WatchlistButton onClick={handleWatchlistToggle} inWatchlist={inWatchlist}>
                {inWatchlist ? <><FaCheck /> In Watchlist</> : <><FaPlus /> Add to Watchlist</>}
              </WatchlistButton>
              
              <RatingContainer>
                <RatingLabel>Your Rating:</RatingLabel>
                <Rating initialRating={userRating} onRate={handleRating} />
              </RatingContainer>
            </ActionButtons>
          </MovieInfo>
        </HeaderOverlay>
      </MovieHeader>
      
      <MovieContent>
        <Section>
          <SectionTitle>Overview</SectionTitle>
          <Overview>{movie.overview}</Overview>
        </Section>
        
        {movie.keywords && movie.keywords.length > 0 && (
          <Section>
            <SectionTitle>Keywords</SectionTitle>
            <KeywordList>
              {movie.keywords.map((keyword, index) => (
                <KeywordTag key={index}>{keyword}</KeywordTag>
              ))}
            </KeywordList>
          </Section>
        )}
        
        {movie.recommendations && movie.recommendations.length > 0 && (
          <Section>
            <SectionTitle>Similar Movies</SectionTitle>
            <SimilarMovies>
              {movie.recommendations.slice(0, 6).map((similar, index) => (
                <SimilarMovie key={index} onClick={() => navigate(`/movie/${similar.id}`)}>
                  <SimilarPoster src={similar.poster_path} alt={similar.title} />
                  <SimilarTitle>{similar.title}</SimilarTitle>
                </SimilarMovie>
              ))}
            </SimilarMovies>
          </Section>
        )}
      </MovieContent>
    </DetailContainer>
  );
};

// Styled Components
const DetailContainer = styled.div`
  width: 100%;
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const MovieHeader = styled.div`
  height: 70vh;
  background-size: cover;
  background-position: center;
  position: relative;
  
  @media (max-width: 768px) {
    height: auto;
  }
`;

const HeaderOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(20, 20, 20, 1));
  display: flex;
  align-items: center;
  padding: 40px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    position: relative;
    padding: 20px;
  }
`;

const PosterContainer = styled.div`
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const PosterImage = styled.img`
  width: 300px;
  height: 450px;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    width: 200px;
    height: 300px;
  }
`;

const MovieInfo = styled.div`
  margin-left: 40px;
  
  @media (max-width: 768px) {
    margin-left: 0;
    text-align: center;
  }
`;

const MovieTitle = styled.h1`
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const MovieMeta = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const MetaItem = styled.span`
  color: #b3b3b3;
  font-size: 16px;
`;

const GenreList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const GenreTag = styled.span`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 14px;
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const WatchlistButton = styled.button`
  background-color: ${({ inWatchlist }) => (inWatchlist ? 'rgba(0, 128, 0, 0.7)' : '#e50914')};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${({ inWatchlist }) => (inWatchlist ? 'rgba(0, 128, 0, 0.9)' : '#f40612')};
  }
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  
  @media (max-width: 768px) {
    margin-top: 16px;
  }
`;

const RatingLabel = styled.span`
  font-size: 16px;
  color: #b3b3b3;
`;

const MovieContent = styled.div`
  padding: 40px;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 16px;
  color: white;
`;

const Overview = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #e5e5e5;
`;

const KeywordList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const KeywordTag = styled.span`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 14px;
  color: #b3b3b3;
`;

const SimilarMovies = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
`;

const SimilarMovie = styled.div`
  cursor: pointer;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const SimilarPoster = styled.img`
  width: 100%;
  aspect-ratio: 2/3;
  border-radius: 4px;
  margin-bottom: 8px;
  object-fit: cover;
`;

const SimilarTitle = styled.h3`
  font-size: 14px;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

export default MovieDetail;