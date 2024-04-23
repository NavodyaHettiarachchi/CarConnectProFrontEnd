import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Grid, TextField } from '@mui/material';

function ChangePassword() {
    const [isOpen, setIsOpen] = useState(false);
    const [prevPassword, setPrevPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showNewPasswordFields, setShowNewPasswordFields] = useState(false);

    const [userID, setUserID] = useState(null);
    const [userType, setUserType] = useState('');

    useEffect(() => {
        const storedUserType = sessionStorage.getItem('userType');
        setUserType(JSON.parse(storedUserType));

        const storedUserID = sessionStorage.getItem('userId');
        setUserID(JSON.parse(storedUserID));
    }, []);

    const openPopup = () => {
        setIsOpen(true);
        resetFields();
    };

    const closePopup = () => {
        setIsOpen(false);
        resetFields();
    };

    const resetFields = () => {
        setPrevPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setError('');
        setShowNewPasswordFields(false);
    };

    const handlePrevPasswordChange = (e) => {
        setPrevPassword(e.target.value);
        setError('');
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
        setError('');
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setError('');
    };

    const verifyPrevPassword = async () => {
      try {
          // Use template literals to correctly interpolate userType and userID into the API URL
          const apiUrl = `http://localhost:5000/password/current/${userType}/${userID}`;
          
          // Make the POST request using Axios
          const response = await axios.post(apiUrl, {
              prevPassword,
              userType,
              userID,
          });
  
          // Check the response
          if (response.data.correct) {
              // If the previous password is correct, allow the user to proceed to enter the new password
              setShowNewPasswordFields(true);
              setError('');
          } else {
              // If the previous password is incorrect, set an error message
              setError('The previous password is incorrect.');
          }
      } catch (error) {
          console.error('Error verifying previous password:', error);
          setError('Error verifying previous password.');
      }
  };
  

  const changePassword = async () => {
    try {
        // Define the API endpoint URL for changing the password
        const apiUrl = `http://localhost:5000/password/current/${userType}/${userID}`;

        // Make the PATCH request using Axios
        const response = await axios.patch(apiUrl, {
            newPassword,
        });

        // Check the server response
        if (response.data && response.data.success) {
            console.log('Password changed successfully');
            resetFields();
            closePopup();
        } else {
            // Only set the error if there's an actual failure
                // Check for a clear error message from the backend response
                if (response.data.message) {
                  setError(response.data.message);
              } else {
                  setError('Failed to change password.');
              }
        }
    } catch (error) {
        console.error('Error changing password:', error);

        // Extract error message from the error object
       // Use a more specific error message from the backend response
       const errorMessage = error.response && error.response.data.error
          ? error.response.data.error
          : 'Network error';
      setError(errorMessage);
    }
};


    const handlePasswordChange = async (e) => {
        e.preventDefault();

        if (!showNewPasswordFields) {
            // Verify the previous password
            await verifyPrevPassword();
        } else {
            // If the new password and confirm password match, change the password
            if (newPassword !== confirmPassword) {
                setError('New Password and Confirm Password do not match');
                return;
            }
            await changePassword();
        }
    };

    return (
        <>
            <Button variant="contained" onClick={openPopup}>Change Password</Button>
            {isOpen && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="close" onClick={closePopup}>&times;</span>
                        <h2>Change Password</h2>
                        <form onSubmit={handlePasswordChange}>
                            <Grid container spacing={3} sx={{ width: 400 }}>
                                {!showNewPasswordFields && (
                                    <>
                                        <Grid item xs={5}>
                                            <label htmlFor="prevPassword">Previous Password</label>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <TextField
                                                type="password"
                                                id="prevPassword"
                                                value={prevPassword}
                                                onChange={handlePrevPasswordChange}
                                                required
                                            />
                                        </Grid>
                                    </>
                                )}
                                {showNewPasswordFields && (
                                    <>
                                        <Grid item xs={5}>
                                            <label htmlFor="newPassword">New Password</label>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <TextField
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

                                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', marginTop: '0.5rem' }}>
                                    <Button variant="contained" type="submit">Confirm</Button>
                                </Grid>
                                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', marginTop: '0.5rem' }}>
                                    <Button variant="contained" color="secondary" onClick={closePopup}>Cancel</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default ChangePassword;