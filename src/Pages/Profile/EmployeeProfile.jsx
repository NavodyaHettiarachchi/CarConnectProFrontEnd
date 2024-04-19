import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Paper, FormControl, Select, MenuItem, InputLabel, Avatar } from '@mui/material';
import Headerfile from '../../Components/Page-Header/CardHeader';
import { Link } from 'react-router-dom';

import DeleteIcon from '@mui/icons-material/DeleteOutline';
import AccountIcon from '@mui/icons-material/AccountCircle';

import ChangePassword from './ChangePassword';
import axios from 'axios';

function EmployeeForm() {

  // get user ID from local storage or null
 const initialUserID = JSON.parse(window.sessionStorage.getItem('userId')) || null;
 const [UserID] = useState(initialUserID);

  const mapGender = (value) => {
    switch(value) {
      case "M":
        return "male";
      case "F":
        return "female";
      case "O":
        return "other";
      default:
        return "";
    }
  };

  //Mapping function to convert "Male", "Female", "Other" to "M", "F", "O"
  const mapGenderReverse = (value) => {
    switch(value) {
      case "male":
        return "M";
      case "female":
        return "F";
      case "other":
        return "O";
      default:
        return "";
    }
  };

  // store form data
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    name: '',
    dob: '',
    gender: '',
    nic: '',
    managerName: '',
    designation: '',
    profile_pic: ''
  });

  // Fetch user data when component mounts
  useEffect(() => {
    axios.get(`http://localhost:5000/center/employee/`+UserID)
      .then(response => {
        const { username, email, name, dob, gender, nic,  managerName,  designation, phone, profile_pic } = response.data.data.userData;
        const dateOnly = dob.split('T')[0]; // Format date of birth to YYYY-MM-DD
        console.log(response.data);
        setFormData({
          username,
          email,
          phone,
          name,
          dob: dateOnly,
          gender,
          nic,
          managerName,
          designation,
          profile_pic
        });
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [UserID]);

  // Handle changes in the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle image file upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file instanceof Blob) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          profile_pic: reader.result
        }));
      };
      reader.readAsDataURL(file);
    } else {
      console.error('Selected file is not a Blob object');
    }
  };

  // Handle image deletion
  const handleDeleteImage = () => {
    setFormData((prevData) => ({
      ...prevData,
      profile_pic: '' // Remove the image
    }));

    // Clear the file input value
    const fileInput = document.getElementById('contained-button-file');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.patch(`http://localhost:5000/center/employee/`+UserID, formData)
      .then(response => {
        console.log('Profile updated successfully:', response.data);
      })
      .catch(error => {
        console.error('Error updating profile:', error);
      });
  };

  return (
    <div>
      <Headerfile title="Employee Profile" />
      <Paper style={{ padding: 15, maxWidth: 1200 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>

                <Paper style={{ padding: 5 }}>
                  <div style={{
                    width: 200,
                    height: 200,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '10px auto',
                    background: '#f0f0f0'
                  }}>
                    {formData.profile_pic ? (
                      <img src={formData.profile_pic} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '50%' }} />
                    ) : (
                      <Avatar alt="Avatar" style={{ width: '100%', height: '100%' }}><AccountIcon style={{ width: '100%', height: '100%', color: '#f0f0f0' }}/></Avatar>
                    )}
                    {formData.profile_pic && (
                      <Button onClick={handleDeleteImage} variant="contained" color="secondary" style={{ position: 'absolute', top: 345, left:780 }}><DeleteIcon/></Button>
                    )}
                  </div>
                  <input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                  // value={formData.profile_pic}
                    onChange={handleImageChange}
                  />
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Username"
                        name="username"
                        value={formData.username}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Date of Birth"
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Gender</InputLabel>
                    <Select
                          value={mapGender(formData.gender)}
                          onChange={(e) => handleChange({ target: { name: "gender", value: mapGenderReverse(e.target.value) } })} 
                          name="gender"
                          required
                        >
                          
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="NIC"
                    name="nic"
                    value={formData.nic}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Designation Details"
                    value={`${formData.managerName} | ${formData.designation}`}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Grid container justifyContent="flex-end" spacing={2}>
                    <Grid item>
                      <Button variant="contained" color="primary" type="submit">
                        Save
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="contained" color="secondary" component={Link} to="/">
                        Back
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Grid>

          <Grid container justifyContent="center">
            <Grid item xs={12}>
              <ChangePassword />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default EmployeeForm;