import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const searchRef = useRef(null);
  const timeoutRef = useRef(null);

  // Handle click outside to collapse search bar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Debounce search
  useEffect(() => {
    if (query.trim() === '') return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onSearch(query);
    }, 500); // 500ms debounce

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [query, onSearch]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== '') {
      onSearch(query);
    }
  };

  const handleFocus = () => {
    setIsExpanded(true);
  };

  return (
    <SearchContainer ref={searchRef} isExpanded={isExpanded}>
      <SearchForm onSubmit={handleSubmit}>
        <SearchIcon>
          <FaSearch />
        </SearchIcon>
        <SearchInput
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          isExpanded={isExpanded}
        />
      </SearchForm>
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  position: relative;
  width: ${({ isExpanded }) => (isExpanded ? '240px' : '40px')};
  transition: width 0.3s ease;
  
  @media (max-width: 768px) {
    width: ${({ isExpanded }) => (isExpanded ? '180px' : '40px')};
  }
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #b3b3b3;
  z-index: 1;
  font-size: 14px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 12px 8px 36px;
  background-color: ${({ isExpanded }) => (isExpanded ? '#141414' : 'transparent')};
  border: 1px solid ${({ isExpanded }) => (isExpanded ? '#333' : 'transparent')};
  border-radius: 4px;
  color: white;
  font-size: 14px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    background-color: #141414;
    border-color: #666;
  }
  
  &::placeholder {
    color: #b3b3b3;
  }
`;

export default SearchBar;