import React, { useState } from 'react';
import './ChangePassword.css';
import { Grid, TextField, Button } from '@mui/material';

function ChangePassword({ onClose, userId }) {
  const [prevPassword, setPrevPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [prevPwdCorrect, setPrevPwdCorrect] = useState(false);

  const dummyPrevPassword = '12345678'; // Dummy previous password

  const handlePrevPasswordChange = (e) => {
    const inputPrevPassword = e.target.value;
    setPrevPassword(inputPrevPassword);
    setPrevPwdCorrect(inputPrevPassword === dummyPrevPassword);
    setError('');
    if (inputPrevPassword !== dummyPrevPassword) {
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    setError(''); // Reset error when new password changes
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setError(''); // Reset error when confirm password changes
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (!prevPwdCorrect) {
      setError('Please enter the correct previous password.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New Password & Confirm Password do not match');
      return;
    }

    try {
      // Make API call to backend to update password
      // Dummy implementation: Log the new password to console
      console.log('New Password:', newPassword);
      
      // Reset newPassword and confirmPassword
      setNewPassword('');
      setConfirmPassword('');
      
      // Close the popup after handling password change
      onClose();
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while updating the password.');
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Change Password</h2>
        <form onSubmit={handlePasswordChange}>
          <Grid container spacing={3} sx={{ width: 400}}>
            <Grid item xs={5}>
              <label htmlFor="prevPassword">Previous Password</label>
            </Grid>
            <Grid item xs={7}>
              <TextField
                className="customTextField"
                type="password"
                id="prevPassword"
                value={prevPassword}
                onChange={handlePrevPasswordChange}
                required
              />
            </Grid>
            {prevPwdCorrect && (
              <>
                <Grid item xs={5}>
                  <label htmlFor="newPassword">New Password</label>
                </Grid>
                <Grid item xs={7}>
                  <TextField
                    className="customTextField"
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    required
                  />
                </Grid>
                <Grid item xs={5}>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                </Grid>
                <Grid item xs={7}>
                  <TextField
                    className="customTextField"
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                  />
                </Grid>
              </>
            )}
            {error && (
              <Grid item xs={12} sx={{ color: 'red', textAlign: 'center', marginTop: '0.5rem' }}>
                {error}
              </Grid>
            )}
            <Grid item xs={5} sx={{ marginLeft: 8, marginTop:1}}>
              <Button variant="contained" type="submit">Confirm</Button>
            </Grid>
            <Grid item xs={5} sx={{ marginTop:1 }}>
              <Button variant="contained" color="secondary" onClick={onClose}>Cancel</Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
