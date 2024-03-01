import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import Headerfile from '../../Components/Page-Header/CardHeader';
import { Link } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import AccountIcon from '@mui/icons-material/AccountCircle';


import ChangePassword from './ChangePassword';

function OwnerForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    name: '',
    dob: '',
    gender: '',
    nic: '',
    city:'',
    province:'',
    image: ''
  });

  const MAX_VISIBLE_CHARACTERS = 4;
  const [email, domain] = formData.email.split('@');
  const truncatedEmail = email.slice(0, MAX_VISIBLE_CHARACTERS) + '*****';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file instanceof Blob) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result
        });
      };
      reader.readAsDataURL(file);
    } else {
      console.error("Selected file is not a Blob object");
    }
  };

  const handleDeleteImage = () => {
    setFormData({
      ...formData,
      image: ''
    });

    // Clear file input value
    const fileInput = document.getElementById('contained-button-file');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', formData);
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
                  {formData.image ? (
                    <img src={formData.image} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '50%' }} />
                  ) : (
                    <Avatar alt="Avatar" style={{ width: '100%', height: '100%' }}><AccountIcon style={{ width: '100%', height: '100%', color: '#f0f0f0' }}/></Avatar>
                  )}
                  {formData.image && (
                    <Button onClick={handleDeleteImage} variant="contained" color="secondary" style={{ position: 'absolute', top: 288, left:525 }}><DeleteIcon/></Button>
                  )}
                </div>
                <input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
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
                    value={truncatedEmail + '@' + domain}
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
                  ...(formData.dob && { inputProps: { placeholder: '' },sx: { bgcolor: 'rgba(232, 240, 254,1)'}})
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth sx={{ bgcolor: formData.gender ? 'rgba(232, 240, 254,1)' : 'transparent' }}>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      value={formData.gender}
                      onChange={handleChange}
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
