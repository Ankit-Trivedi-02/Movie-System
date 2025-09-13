import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import movieService from '../../services/movieService';

const Profile = () => {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [ratedMovies, setRatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '',
        confirmPassword: ''
      });
      
      // Fetch user's rated movies
      const fetchRatedMovies = async () => {
        try {
          setLoading(true);
          const data = await movieService.getRatedMovies();
          setRatedMovies(data);
        } catch (err) {
          console.error('Error fetching rated movies:', err);
        } finally {
          setLoading(false);
        }
      };
      
      fetchRatedMovies();
    }
  }, [user]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    // Validate passwords match if changing password
    if (formData.password && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      // Only send fields that have values
      const updateData = {};
      if (formData.name) updateData.name = formData.name;
      if (formData.email) updateData.email = formData.email;
      if (formData.password) updateData.password = formData.password;
      
      await updateProfile(updateData);
      setSuccess('Profile updated successfully');
      setIsEditing(false);
      
      // Clear password fields after successful update
      setFormData(prev => ({
        ...prev,
        password: '',
        confirmPassword: ''
      }));
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    }
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileTitle>My Profile</ProfileTitle>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </ProfileHeader>
      
      <ProfileContent>
        <ProfileSection>
          <SectionTitle>
            Account Information
            {!isEditing ? (
              <EditButton onClick={() => setIsEditing(true)}>
                <FaEdit /> Edit
              </EditButton>
            ) : (
              <CancelButton onClick={() => {
                setIsEditing(false);
                setError(null);
                // Reset form data to user data
                if (user) {
                  setFormData({
                    name: user.name || '',
                    email: user.email || '',
                    password: '',
                    confirmPassword: ''
                  });
                }
              }}>
                <FaTimes /> Cancel
              </CancelButton>
            )}
          </SectionTitle>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}
          
          {isEditing ? (
            <ProfileForm onSubmit={handleSubmit}>
              <FormGroup>
                <FormLabel>Name</FormLabel>
                <FormInput 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="Your name"
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Email</FormLabel>
                <FormInput 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="Your email"
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>New Password (leave blank to keep current)</FormLabel>
                <FormInput 
                  type="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  placeholder="New password"
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Confirm New Password</FormLabel>
                <FormInput 
                  type="password" 
                  name="confirmPassword" 
                  value={formData.confirmPassword} 
                  onChange={handleChange} 
                  placeholder="Confirm new password"
                  disabled={!formData.password}
                />
              </FormGroup>
              
              <SaveButton type="submit">
                <FaSave /> Save Changes
              </SaveButton>
            </ProfileForm>
          ) : (
            <ProfileInfo>
              <InfoItem>
                <InfoLabel>Name:</InfoLabel>
                <InfoValue>{user?.name || 'Not set'}</InfoValue>
              </InfoItem>
              
              <InfoItem>
                <InfoLabel>Email:</InfoLabel>
                <InfoValue>{user?.email || 'Not set'}</InfoValue>
              </InfoItem>
              
              <InfoItem>
                <InfoLabel>Member Since:</InfoLabel>
                <InfoValue>
                  {user?.createdAt 
                    ? new Date(user.createdAt).toLocaleDateString() 
                    : 'Not available'}
                </InfoValue>
              </InfoItem>
            </ProfileInfo>
          )}
        </ProfileSection>
        
        <ProfileSection>
          <SectionTitle>My Ratings</SectionTitle>
          
          {loading ? (
            <LoadingMessage>Loading your ratings...</LoadingMessage>
          ) : ratedMovies.length > 0 ? (
            <RatedMoviesGrid>
              {ratedMovies.map(movie => (
                <RatedMovie key={movie.id} onClick={() => navigate(`/movie/${movie.id}`)}>
                  <MoviePoster src={movie.poster_path} alt={movie.title} />
                  <MovieInfo>
                    <MovieTitle>{movie.title}</MovieTitle>
                    <MovieYear>{movie.release_date?.substring(0, 4)}</MovieYear>
                    <MovieRating>
                      Your Rating: {movie.user_rating} / 5
                    </MovieRating>
                  </MovieInfo>
                </RatedMovie>
              ))}
            </RatedMoviesGrid>
          ) : (
            <EmptyMessage>You haven't rated any movies yet</EmptyMessage>
          )}
        </ProfileSection>
      </ProfileContent>
    </ProfileContainer>
  );
};

// Styled Components
const ProfileContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
`;

const ProfileTitle = styled.h1`
  font-size: 32px;
  font-weight: 500;
`;

const LogoutButton = styled.button`
  background-color: transparent;
  color: #b3b3b3;
  border: 1px solid #b3b3b3;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: white;
    border-color: white;
  }
`;

const ProfileContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ProfileSection = styled.section`
  background-color: rgba(20, 20, 20, 0.7);
  border-radius: 4px;
  padding: 24px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  
  @media (min-width: 768px) {
    &:first-child {
      grid-column: 1;
    }
    
    &:last-child {
      grid-column: 1 / span 2;
    }
  }
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const EditButton = styled.button`
  background-color: transparent;
  color: #b3b3b3;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: color 0.3s ease;
  
  &:hover {
    color: white;
  }
`;

const CancelButton = styled(EditButton)`
  color: #b3b3b3;
  
  &:hover {
    color: #e50914;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const InfoLabel = styled.span`
  font-weight: 500;
  color: #b3b3b3;
  width: 120px;
`;

const InfoValue = styled.span`
  color: white;
`;

const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FormLabel = styled.label`
  font-size: 14px;
  color: #b3b3b3;
`;

const FormInput = styled.input`
  background-color: #333;
  border: none;
  border-radius: 4px;
  padding: 12px;
  color: white;
  font-size: 16px;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(229, 9, 20, 0.5);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SaveButton = styled.button`
  background-color: #e50914;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background-color 0.3s ease;
  margin-top: 8px;
  
  &:hover {
    background-color: #f40612;
  }
`;

const ErrorMessage = styled.div`
  color: #e50914;
  background-color: rgba(229, 9, 20, 0.1);
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 16px;
`;

const SuccessMessage = styled.div`
  color: #2ecc71;
  background-color: rgba(46, 204, 113, 0.1);
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 16px;
`;

const RatedMoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`;

const RatedMovie = styled.div`
  cursor: pointer;
  border-radius: 4px;
  overflow: hidden;
  transition: transform 0.3s ease;
  position: relative;
  
  &:hover {
    transform: scale(1.05);
    z-index: 10;
  }
`;

const MoviePoster = styled.img`
  width: 100%;
  aspect-ratio: 2/3;
  object-fit: cover;
`;

const MovieInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${RatedMovie}:hover & {
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
  display: block;
  margin-bottom: 4px;
`;

const MovieRating = styled.div`
  font-size: 14px;
  color: #ffc107;
`;

const EmptyMessage = styled.div`
  color: #b3b3b3;
  text-align: center;
  padding: 32px 0;
`;

const LoadingMessage = styled.div`
  color: #b3b3b3;
  text-align: center;
  padding: 32px 0;
`;

export default Profile;