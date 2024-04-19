import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import Headerfile from '../../Components/Page-Header/CardHeader';
import { Link} from 'react-router-dom';
import axios from 'axios'; 
import { useEffect } from 'react';

import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import AccountIcon from '@mui/icons-material/AccountCircle';

import ChangePassword from './ChangePassword';

const allowedRoles = new Set(["pp:ad", "s:ad"]);

function OwnerForm() {

// get user ID from local storage or null
const initialUserID = JSON.parse(window.sessionStorage.getItem('userId')) || null;
  const [UserID] = useState(initialUserID);
  const [editRole, setEditRole] = useState(false);

  useEffect(() => {
    const roles = (JSON.parse(window.sessionStorage.getItem('roles'))).split(", ");
    setEditRole(allowedRoles.has(roles.find(role => role === 'pp:ad' || role === 's:ad')));
  }, []);

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
  
  // Mapping function to convert "Male", "Female", "Other" to "M", "F", "O"
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
  const [formData, setformData] = useState({
    username: '',
    email: '',
    phone: '',
    name: '',
    dob: '',
    gender: '',
    nic: '',
    city:'',
    province:'',
    profile_pic:''
  });
  
  useEffect(() => {
   
    axios.get('http://localhost:5000/owner/profile/'+UserID) 
      .then(response => {
        const { username, email, name, dob,gender , nic, city, province, phone,profile_pic } = response.data.data.userData;
        const dateOnly = dob.split('T')[0];
        console.log(response.data);
        setformData({
          username,
          email,
          phone,
          name,
          dob:dateOnly, 
          gender,
          nic,
          city,
          province,
          profile_pic
        });
      })

      .catch(error => {
        console.error('Error fetching user data:', error);
      });

  }, [UserID]);
  

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
    axios.patch('http://localhost:5000/owner/profile/'+UserID, formData)
      .then(response => {
        console.log('Profile updated successfully:', response.data); 
      })
      .catch(error => {
        console.error('Error updating profile:', error);  
    });
  };

  return (
    <div>
      <Headerfile title="Owner Profile"/>
      <Paper style={{ padding: 15, top: 5, maxWidth: 1200, display: 'flex' }}>
          <Grid container spacing={2}>
            <Grid item  xs={12}>
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
              <Grid container spacing={4.8} sx={{paddingTop:2}}>
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
                InputProps={{
                  ...(formData.dob && { inputProps: { placeholder: '' }})
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
              </Grid>
            </Grid>
           
            <Grid item xs={12} sm={6}>
          
                    <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        fullWidth
                        label="City"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                        fullWidth
                        label="Province"
                        name="province"
                        value={formData.province}
                        onChange={handleChange}
                        required
                        />
                    </Grid>
                  </Grid>
                </Grid>

           
            <div style={{ marginLeft: '68%', marginTop: '1%' }}>
              <Grid container spacing={5}>
                  <Grid item xs={6}>
                    <Button variant="contained" color="primary" type="submit">
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
              <ChangePassword/>
            </Grid>
            </div>

          </Grid>
      </Paper>

    </div>
  );
}

export default OwnerForm;