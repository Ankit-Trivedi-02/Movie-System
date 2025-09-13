import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaSearch, FaTimes } from 'react-icons/fa';
import movieService from '../../services/movieService';
import MovieCard from '../../components/movie/MovieCard';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('q') || '';
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(query);
  
  useEffect(() => {
    // Reset search term when query changes
    setSearchTerm(query);
    
    const fetchSearchResults = async () => {
      if (!query.trim()) {
        setResults([]);
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        const data = await movieService.searchMovies(query);
        setResults(data);
      } catch (err) {
        console.error('Error searching movies:', err);
        setError('Failed to fetch search results. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSearchResults();
  }, [query]);
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };
  
  const handleClearSearch = () => {
    setSearchTerm('');
    navigate('/search');
  };
  
  return (
    <SearchContainer>
      <SearchHeader>
        <SearchForm onSubmit={handleSearch}>
          <SearchInputContainer>
            <SearchIcon />
            <SearchInput 
              type="text" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              placeholder="Search for movies..."
              autoFocus
            />
            {searchTerm && (
              <ClearButton type="button" onClick={handleClearSearch}>
                <FaTimes />
              </ClearButton>
            )}
          </SearchInputContainer>
          <SearchButton type="submit">Search</SearchButton>
        </SearchForm>
      </SearchHeader>
      
      <SearchContent>
        {loading ? (
          <LoadingMessage>Searching...</LoadingMessage>
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : results.length > 0 ? (
          <>
            <ResultsCount>
              Found {results.length} {results.length === 1 ? 'result' : 'results'} for "{query}"
            </ResultsCount>
            <ResultsGrid>
              {results.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ResultsGrid>
          </>
        ) : query ? (
          <NoResultsMessage>
            <NoResultsIcon />
            <NoResultsText>No results found for "{query}"</NoResultsText>
            <NoResultsSuggestion>
              Try different keywords or check your spelling
            </NoResultsSuggestion>
          </NoResultsMessage>
        ) : (
          <EmptySearchMessage>
            <SearchPromptIcon />
            <SearchPromptText>Search for movies by title, actor, or genre</SearchPromptText>
          </EmptySearchMessage>
        )}
      </SearchContent>
    </SearchContainer>
  );
};

// Styled Components
const SearchContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SearchHeader = styled.div`
  margin-bottom: 32px;
`;

const SearchForm = styled.form`
  display: flex;
  gap: 16px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInputContainer = styled.div`
  position: relative;
  flex: 1;
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #b3b3b3;
`;

const SearchInput = styled.input`
  width: 100%;
  background-color: #333;
  border: none;
  border-radius: 4px;
  padding: 16px 16px 16px 48px;
  color: white;
  font-size: 16px;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(229, 9, 20, 0.5);
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #b3b3b3;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: white;
  }
`;

const SearchButton = styled.button`
  background-color: #e50914;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0 24px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #f40612;
  }
  
  @media (max-width: 768px) {
    padding: 16px 24px;
  }
`;

const SearchContent = styled.div`
  min-height: 60vh;
`;

const ResultsCount = styled.div`
  font-size: 18px;
  margin-bottom: 24px;
  color: #b3b3b3;
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 16px;
  }
`;

const LoadingMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60vh;
  font-size: 24px;
  color: #b3b3b3;
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60vh;
  font-size: 18px;
  color: #e50914;
  text-align: center;
  padding: 0 20px;
`;

const NoResultsMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  text-align: center;
  padding: 0 20px;
`;

const NoResultsIcon = styled(FaSearch)`
  font-size: 48px;
  color: #b3b3b3;
  margin-bottom: 16px;
`;

const NoResultsText = styled.h2`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const NoResultsSuggestion = styled.p`
  font-size: 16px;
  color: #b3b3b3;
`;

const EmptySearchMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  text-align: center;
  padding: 0 20px;
`;

const SearchPromptIcon = styled(FaSearch)`
  font-size: 48px;
  color: #b3b3b3;
  margin-bottom: 16px;
`;

const SearchPromptText = styled.h2`
  font-size: 24px;
  font-weight: 500;
  color: #b3b3b3;
`;

export default SearchResults;