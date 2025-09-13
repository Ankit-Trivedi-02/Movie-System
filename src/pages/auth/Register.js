import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styled from 'styled-components';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [preferredGenres, setPreferredGenres] = useState([]);
  const [formError, setFormError] = useState('');
  
  const { register, isAuthenticated, loading } = useAuth();
  
  // Movie genres list
  const genres = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' }
  ];
  
  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    
    // Simple validation
    if (!name || !email || !password || !confirmPassword) {
      setFormError('Please fill in all required fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return;
    }
    
    try {
      await register(name, email, password, preferredGenres);
    } catch (error) {
      setFormError(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };
  
  return (
    <RegisterContainer>
      <RegisterWrapper>
        <LogoContainer>
          <LogoText>MovieRec</LogoText>
        </LogoContainer>
        
        <RegisterForm onSubmit={handleSubmit}>
          <FormTitle>Sign Up</FormTitle>
          
          {formError && <ErrorMessage>{formError}</ErrorMessage>}
          
          <FormGroup>
            <FormInput
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <FormInput
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <FormInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <FormInput
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <GenreLabel>Select Your Preferred Genres (Optional)</GenreLabel>
            <GenreCheckboxContainer>
              {genres.map(genre => (
                <GenreCheckboxItem key={genre.id}>
                  <GenreCheckbox
                    type="checkbox"
                    id={`genre-${genre.id}`}
                    value={genre.id}
                    checked={preferredGenres.includes(genre.id.toString())}
                    onChange={(e) => {
                      const genreId = e.target.value;
                      if (e.target.checked) {
                        setPreferredGenres([...preferredGenres, genreId]);
                      } else {
                        setPreferredGenres(preferredGenres.filter(id => id !== genreId));
                      }
                    }}
                  />
                  <GenreCheckboxLabel htmlFor={`genre-${genre.id}`}>{genre.name}</GenreCheckboxLabel>
                </GenreCheckboxItem>
              ))}
            </GenreCheckboxContainer>
          </FormGroup>
          
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </SubmitButton>
          
          <FormFooter>
            Already have an account? <FormLink to="/login">Sign in now</FormLink>
          </FormFooter>
        </RegisterForm>
      </RegisterWrapper>
    </RegisterContainer>
  );
};

// Styled Components
const RegisterContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://assets.nflxext.com/ffe/siteui/vlv3/a1dc92ca-091d-4ca9-a05b-8cd44bbfce6a/f9368347-e982-4856-a5a4-396796381f28/RS-en-20191230-popsignuptwoweeks-perspective_alpha_website_large.jpg');
  background-size: cover;
  background-position: center;
  padding: 20px;
`;

const RegisterWrapper = styled.div`
  width: 100%;
  max-width: 450px;
`;

const LogoContainer = styled.div`
  margin-bottom: 20px;
`;

const LogoText = styled.h1`
  color: #e50914;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
`;

const RegisterForm = styled.form`
  background-color: rgba(0, 0, 0, 0.75);
  padding: 60px 40px;
  border-radius: 4px;
`;

const FormTitle = styled.h2`
  color: white;
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 28px;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 16px;
  border-radius: 4px;
  background-color: #333;
  border: none;
  color: white;
  font-size: 16px;
  
  &:focus {
    outline: none;
    background-color: #454545;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  margin-top: 24px;
  background-color: #e50914;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #f40612;
  }
  
  &:disabled {
    background-color: #b81d24;
    cursor: not-allowed;
  }
`;

const FormFooter = styled.div`
  margin-top: 16px;
  color: #b3b3b3;
  font-size: 16px;
  text-align: center;
`;

const FormLink = styled(Link)`
  color: white;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.div`
  background-color: #e87c03;
  color: white;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 16px;
  font-size: 14px;
`;

const GenreLabel = styled.div`
  color: white;
  margin-bottom: 8px;
  font-size: 16px;
`;

const GenreCheckboxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  max-height: 150px;
  overflow-y: auto;
  background-color: #333;
  padding: 10px;
  border-radius: 4px;
`;

const GenreCheckboxItem = styled.div`
  display: flex;
  align-items: center;
  width: calc(50% - 10px);
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const GenreCheckbox = styled.input`
  margin-right: 8px;
  cursor: pointer;
`;

const GenreCheckboxLabel = styled.label`
  color: white;
  font-size: 14px;
  cursor: pointer;
`;

export default Register;