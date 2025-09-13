import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styled from 'styled-components';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  
  const { login, isAuthenticated, loading } = useAuth();
  
  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    
    // Simple validation
    if (!email || !password) {
      setFormError('Please fill in all fields');
      return;
    }
    
    try {
      await login(email, password);
    } catch (error) {
      setFormError(error.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };
  
  return (
    <LoginContainer>
      <LoginWrapper>
        <LogoContainer>
          <LogoText>MovieRec</LogoText>
        </LogoContainer>
        
        <LoginForm onSubmit={handleSubmit}>
          <FormTitle>Sign In</FormTitle>
          
          {formError && <ErrorMessage>{formError}</ErrorMessage>}
          
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
          
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </SubmitButton>
          
          <FormFooter>
            New to MovieRec? <FormLink to="/register">Sign up now</FormLink>
          </FormFooter>
        </LoginForm>
      </LoginWrapper>
    </LoginContainer>
  );
};

// Styled Components
const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://assets.nflxext.com/ffe/siteui/vlv3/a1dc92ca-091d-4ca9-a05b-8cd44bbfce6a/f9368347-e982-4856-a5a4-396796381f28/RS-en-20191230-popsignuptwoweeks-perspective_alpha_website_large.jpg');
  background-size: cover;
  background-position: center;
  padding: 20px;
`;

const LoginWrapper = styled.div`
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

const LoginForm = styled.form`
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

export default Login;