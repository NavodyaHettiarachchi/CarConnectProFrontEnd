import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import Headerfile from '../../Components/Page-Header/CardHeader';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import AccountIcon from '@mui/icons-material/AccountCircle';

import ChangePassword from './ChangePassword';

const allowedRoles = new Set(["pp:ad", "s:ad"]);

function EmployeeForm() {

  // get user ID from local storage or null
  const initialUserID = JSON.parse(window.sessionStorage.getItem('userId')) || null;
  const [UserID] = useState(initialUserID);
  const [editRole, setEditRole] = useState(false);
  const [schema, setschema] = useState('');

 // store form data
 const [formData, setformData] = useState({
  username: '',
  email: '',
  contact: '',
  name: '',
  dob: '',
  gender: '',
  nic: '',
  manager_name: '', 
  designation: '',
  profile_pic: ''
});
     
useEffect(() => {
  const roles = (JSON.parse(window.sessionStorage.getItem('roles')) || '').split(", ");
  setEditRole(allowedRoles.has(roles.find(role => role === 'pp:ad' || role === 's:ad')));

  const storedschema = sessionStorage.getItem('schema');
  setschema(storedschema);
  // Fetch employee data when UserID and schema are available
  if (UserID && storedschema) {
    axios.get(`http://localhost:5000/center/employee/profile/${UserID}?schema=${storedschema}`)
      .then(response => {
        const { username, email, name, dob, gender, nic, contact, profile_pic, manager_name, designation } = response.data.data.empData;
        const dateOnly = dob.split('T')[0];
        setformData({
          username,
          email,
          contact,
          name,
          dob: dateOnly,
          gender,
          nic,
          profile_pic,
          manager_name,
          designation
        });
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }
}, [UserID, schema]); 

  const mapGender = (value) => {
    switch (value) {
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

  // Mapping function to convert "Male", "Female", "Other" to "M", "F", "O"
  const mapGenderReverse = (value) => {
    switch (value) {
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


  // const MAX_VISIBLE_CHARACTERS = 4;
  // const [email, domain] = formData.email.split('@');
  // const truncatedEmail = email.slice(0, MAX_VISIBLE_CHARACTERS) + '*****';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file instanceof Blob) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setformData({
          ...formData,
          profile_pic: reader.result
        });
      };
      reader.readAsDataURL(file);
    } else {
      console.error("Selected file is not a Blob object");
    }
  };

  const handleDeleteImage = () => {
    setformData({
      ...formData,
      profile_pic: ''
    });

    // Clear file input value
    const fileInput = document.getElementById('contained-button-file');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if UserID and schema are available
    if (UserID && schema) {
      const url = `http://localhost:5000/center/employee/profile/${UserID}?schema=${schema}`; 
      axios.patch(url, formData)
        .then(response => {
          console.log('Profile updated successfully:', response.data);
        })
        .catch(error => {
          console.error('Error updating profile:', error);
          if (error.response) {
            // Server responded with an error status code
            console.error('Server responded with status code:', error.response.status);
            console.error('Error response data:', error.response.data);
          } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received from server');
          } else {
            // Something else happened while setting up the request
            console.error('Error setting up the request:', error.message);
          }
        });
    } else {
      console.error('UserID or schema is missing');
    }
  };
  

  return (
    <div>
      <Headerfile title="Employee Profile" />
      <Paper style={{ padding: 15, top: 5, maxWidth: 1200, display: 'flex' }}>
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
                        <Avatar alt="Avatar" style={{ width: '100%', height: '100%' }}><AccountIcon style={{ width: '100%', height: '100%', color: '#f0f0f0' }} /></Avatar>
                      )}
                      {formData.profile_pic && (
                        <Button disabled={!editRole} onClick={handleDeleteImage} variant="contained" color="secondary" style={{ position: 'absolute', top: 345, left: 780 }}><DeleteIcon /></Button>
                      )}
                    </div>
                    <input
                      accept="image/*"
                      id="contained-button-file"
                      multiple
                      type="file"
                      disabled={!editRole}
                      // value={formData.profile_pic}
                      onChange={handleImageChange}
                    />
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Grid container spacing={4.8} sx={{ paddingTop: 2 }}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Username"
                        name="username"
                        value={formData.username}
                        disabled={!editRole}
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
                        disabled={!editRole}
                        type="email"
                        // value={truncatedEmail + '@' + domain}
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
                        name="contact"
                        disabled={!editRole}
                        value={formData.contact}
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
                    disabled={!editRole}
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
                    disabled={!editRole}
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      ...(formData.dob && { inputProps: { placeholder: '' } })
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>

                      <FormControl fullWidth>
                        <InputLabel>Gender</InputLabel>
                        <Select
                          value={mapGender(formData.gender)}
                          onChange={(e) => handleChange({ target: { name: "gender", value: mapGenderReverse(e.target.value) } })}
                          name="gender"
                          disabled={!editRole}
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
                        disabled={!editRole}
                        name="nic"
                        value={formData.nic}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={6}>

                  

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Manager Name"
                        disabled={!editRole}
                        name="manager_name"
                        value={formData.manager_name}
                        InputProps={{
                          readOnly: true,
                        }}
                        required
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Designation"
                        disabled={!editRole}
                        name="designation"
                        value={formData.designation}
                        InputProps={{
                          readOnly: true,
                        }}
                        required
                      />
                    </Grid>   
                </Grid>

                </Grid>


                <div style={{ marginLeft: '68%', marginTop: '1%' }}>
                  <Grid container spacing={5}>
                    <Grid item xs={6}>
                      <Button variant="contained" disabled={!editRole} color="primary" type="submit">
                        Save
                      </Button>
                    </Grid>

                    <Grid item xs={6}>
                      <Button variant="contained" color="secondary" type="button" component={Link} to="/">
                        Back
                      </Button>
                    </Grid>

                  </Grid>
                </div>

              </Grid>
            </form>
          </Grid>

          <div style={{ marginLeft: '18%', marginTop: '-3%' }}>
            <Grid item xs={12} sm={12}>
              {editRole && <ChangePassword />}
            </Grid>
          </div>

        </Grid>
      </Paper>

    </div>
  );
}

export default  EmployeeForm;