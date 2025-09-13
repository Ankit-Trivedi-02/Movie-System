import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import SearchBar from '../common/SearchBar';
import styled from 'styled-components';

const MainLayout = ({ children }) => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (query) => {
    navigate(`/search?q=${query}`);
  };

  return (
    <LayoutContainer>
      <Header>
        <NavContainer>
          <LogoLink to="/">
            <LogoText>MovieRec</LogoText>
          </LogoLink>
          
          <NavLinks>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/watchlist">My List</NavLink>
          </NavLinks>
          
          <RightSection>
            <SearchBar onSearch={handleSearch} />
            
            <UserMenu>
              <UserAvatar>
                {currentUser?.name?.charAt(0) || 'U'}
              </UserAvatar>
              
              <DropdownMenu>
                <DropdownItem to="/profile">Profile</DropdownItem>
                <DropdownItem as="button" onClick={logout}>Logout</DropdownItem>
              </DropdownMenu>
            </UserMenu>
          </RightSection>
        </NavContainer>
      </Header>
      
      <Main>
        {children}
      </Main>
      
      <Footer>
        <FooterText>© {new Date().getFullYear()} MovieRec. All rights reserved.</FooterText>
      </Footer>
    </LayoutContainer>
  );
};

// Styled Components
const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background-color: #141414;
  padding: 16px 0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

const LogoLink = styled(Link)`
  text-decoration: none;
`;

const LogoText = styled.h1`
  color: #e50914;
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: #e5e5e5;
  font-size: 14px;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: #fff;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const UserMenu = styled.div`
  position: relative;
  cursor: pointer;
  
  &:hover > div {
    display: block;
  }
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background-color: #e50914;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #141414;
  border: 1px solid #333;
  border-radius: 4px;
  width: 150px;
  display: none;
  margin-top: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 10px 16px;
  color: #e5e5e5;
  text-decoration: none;
  transition: background-color 0.3s ease;
  font-size: 14px;
  text-align: left;
  width: 100%;
  background: none;
  border: none;
  cursor: pointer;
  
  &:hover {
    background-color: #333;
    color: #fff;
  }
`;

const Main = styled.main`
  flex: 1;
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
`;

const Footer = styled.footer`
  background-color: #141414;
  padding: 20px;
  text-align: center;
  border-top: 1px solid #333;
`;

const FooterText = styled.p`
  color: #b3b3b3;
  font-size: 14px;
`;

export default MainLayout;