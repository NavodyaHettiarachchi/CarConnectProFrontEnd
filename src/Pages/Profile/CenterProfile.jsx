import React, { useState } from 'react';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField,Paper} from '@mui/material';
import Headerfile from '../../Components/Page-Header/CardHeader';
import { Link } from 'react-router-dom';
import ChangePassword from './ChangePassword';
import { useEffect } from 'react';
import axios from 'axios';

const CenterForm = () => {

const initialUserID = JSON.parse(window.localStorage.getItem('userID')) || null;
const [UserID] = useState(initialUserID);

  const mapCenterType = (value) => {
    switch(value) {
      case "S":
        return "Service";
      case "R":
        return "Repairs";
      case "B":
        return "Service & Repairs";
      default:
        return "";
    }
  };
  
  const mapCenterTypeReverse = (value) => {
    switch(value) {
      case "Service":
        return "S";
      case "Repairs":
        return "R";
      case "Service & Repairs":
        return "B";
      default:
        return "";
    }
  };


  const [formData, setFormData] = useState({
    username: '',
    email: '',
    name: '',
    phone: '',
    center_type: '',
    street_1: '',
    street_2: '',
    city: '',
    province: ''
    
  });


  useEffect(() => {
    axios.get('http://localhost:5000/center/profile/'+UserID) 
      .then(response => {
        const {username, email, phone, name, center_type,street_1, street_2, city, province} = response.data.data.userData;
        console.log(response.data);
        setFormData({
          username,
          email,
          phone,
          name,
          center_type,
          street_1,
          street_2,
          city,
          province,
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
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.patch('http://localhost:5000/center/profile/'+UserID, formData)
      .then(response => {
        console.log('Profile updated successfully:', response.data); 
      })
      .catch(error => {
        console.error('Error updating profile:', error);  
    });
  };

  return (
    <div>
        <Headerfile title="Center Profile"/>

        <Paper style={{ padding:15,top:5,maxWidth:1200,display:'flex'}}>

        <Grid container spacing={2}>
        <Grid item xs={12}>
        <form onSubmit={handleSubmit}>


        <Grid container rowSpacing={6} columnSpacing={2} sx={{paddingTop:2}}>

        <Grid item xs={12} sm={6}>
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

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
             value={formData.email}
            // value={truncatedEmail + '@' + domain}
                    InputProps={{
                      readOnly: true,
                    }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Center Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </Grid>


        <Grid item xs={0} sm={6}>

            <Grid container spacing={2}>

            <Grid item xs={0} sm={6}>
                <FormControl fullWidth>
                <InputLabel>Center Type</InputLabel>
                <Select
                value={mapCenterType(formData.center_type)}
                onChange={(e) => handleChange({ target: { name: "center_type", value: mapCenterTypeReverse(e.target.value) } })} 
                name="center_type"
                required
                >
                <MenuItem value="Service">Service</MenuItem>
                <MenuItem value="Repairs">Repairs</MenuItem>
                <MenuItem value="Service & Repairs">Services & Repairs</MenuItem>
                </Select>

            </FormControl>

            </Grid>


            <Grid item xs={0} sm={6}>
            <TextField
                fullWidth
                label="Street 1"
                name="street_1"
                value={formData.street_1}
                onChange={handleChange}
                required
            />
            </Grid>

            </Grid>

        </Grid>


        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Street 2"
            name="street_2"
            value={formData.street_2}
            onChange={handleChange}
            required
          />
        </Grid>


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
};

export default CenterForm;
 