import React, { useState } from 'react';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField,Paper} from '@mui/material';
import Headerfile from '../../Components/Page-Header/CardHeader';
import { Link } from 'react-router-dom';
import ChangePassword from './ChangePassword';

const CenterForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    name: '',
    phone: '',
    center: '',
    street1: '',
    street2: '',
    city: '',
    province: ''
    
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Submitted:', formData);
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
            value={truncatedEmail + '@' + domain}
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
                <FormControl fullWidth sx={{ bgcolor: formData.center? 'rgba(232, 240, 254,1)' : 'transparent' }}>
                <InputLabel>Center Type</InputLabel>
                <Select
                value={formData.center}
                onChange={handleChange}
                name="center"
                required
                >
                <MenuItem value="Service">Service</MenuItem>
                <MenuItem value="Repairs">Repairs</MenuItem>
                <MenuItem value="Service & Repairs">Service & Repairs</MenuItem>
                </Select>

            </FormControl>

            </Grid>


            <Grid item xs={0} sm={6}>
            <TextField
                fullWidth
                label="Street 1"
                name="street1"
                value={formData.street1}
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
            name="street2"
            value={formData.street2}
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
 