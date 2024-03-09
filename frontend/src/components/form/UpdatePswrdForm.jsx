import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom';

const UpdatePswrdForm = () => {
  const { grpId } = useParams();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const authToken = localStorage.getItem('authToken');
      console.log('AuthToken:', authToken); 
  
      if (!authToken) {
        setError('Authentication token is missing. Please log in.');
        return;
      }
  
      const response = await axios.put(
        `http://localhost:8000/student/updatePassword/${grpId}`,
        {
          currentPassword,
          newPassword,
          confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      window.alert(response?.data?.message || 'Password updated successfully');
      navigate('/loginGrp');
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred while updating the password.');
      setSuccessMessage(null);
    }
  };

  return (
    <div id="sachini_form">
      <h2>Update Password</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleFormSubmit}>
          <input
            type="password"
            placeholder='Current Password'
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        <br />

          <input
            type="password"
            placeholder='New Password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        <br />

          <input
            type="password"
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        <br />
        <center>
        <button type="submit">Update Password</button>
        </center>
      </form>
    </div>
  );
};

export default UpdatePswrdForm;
