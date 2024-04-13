import React from 'react';
import { useState } from 'react';
import { TextField, Button, Grid, Paper, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import Headerfile from '../../Components/Page-Header/CardHeader';
import { Link } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import AccountIcon from '@mui/icons-material/AccountCircle';

function EmployeeForm() {

  

  const [formData, setFormData] = useState({
    username: '',
    email: 'ashenharindu@gmail.com',
    phone: '',
    name: '',
    dob: '',
    gender: '',
    nic: '993041254v',
    managerName: 'harindu',
    designation: 'labour',
    image: '' // Added image field to formData
  });

  const MAX_VISIBLE_CHARACTERS = 4;

  const [email, domain] = formData.email.split('@');

  const truncatedEmail = email.slice(0, MAX_VISIBLE_CHARACTERS) + '*****';


//   const [email, domain] = formData.email.split('@');
//   const truncatedEmail = email.slice(0, 4) + '*****';

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
          image: reader.result // set image as base64 string
        });
      };
      reader.readAsDataURL(file); // read file as data URL
    } else {
      console.error("Selected file is not a Blob object");
    }
  };

  const handleDeleteImage = () => {
    setFormData({
      ...formData,
      image: '' // Remove the image
    });

    // Clear file input value
    const fileInput = document.getElementById('contained-button-file');
    if (fileInput) {
      fileInput.value = '';
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Submitted:', formData);
  };

  return (

    <div>
      <Headerfile title="Employee Profile"/>

      <Paper style={{ padding:15,top:5,maxWidth:1200,display:'flex'}}>

        <form onSubmit={handleSubmit}>

        <Grid container spacing={2}>

        <Grid item sm={6} xs={12}>

            <Paper style={{ padding:5}}>

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
                <Avatar alt="Avatar" style={{ width: '100%', height: '100%' }}><AccountIcon style={{ width: '100%', height: '100%', color:'#f0f0f0'}}/></Avatar>
                )}
                {formData.image && (
                <Button onClick={handleDeleteImage} variant="contained" color="secondary" style={{ position: 'absolute', top:288, left:525 }}><DeleteIcon/></Button>
                )}
            </div>

            <input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                onChange={handleImageChange}  
                // style={{ display: 'none' }}             
            />

            {/* <button style={{ position:'absolute',left:400,top:280,border:'none'}}>
            <ChangePassword/>
            </button> */}
            

            {/* <label htmlFor="contained-button-file">
                <Button variant="contained" component="span" sx={{left:200}}>
                <UploadIcon/>
                </Button>
            </label> */}


                </Paper>

            </Grid>



            <Grid item xs={12} sm={6}>

            <Grid container spacing={4.8} sx={{paddingTop:2}}>


                <Grid item xs={13}>
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

    
                <Grid item xs={13}>
                    <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    // value={formData.email}
                    onChange={handleChange}
                    value={truncatedEmail + '@' + domain}
                    InputProps={{
                        readOnly: true,
                    }}
                    />
                </Grid>


                <Grid item xs={13}>
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
                ...(formData.dob && { inputProps: { placeholder: '' },sx: { bgcolor: 'rgba(232, 240, 254,1)'} })
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
                
                <TextField
                    fullWidth
                    label="Desigantion Details"
                    value={`${formData.managerName} | ${formData.designation}`}
                    required
                    InputProps={{
                    readOnly: true,
                    }}
                />

            </Grid> 


            <Grid item xs={12} sm={12} >

                <div style={{marginLeft:'39%',marginTop:'1%'}}>

                    <Grid container spacing={3}>

                    <Grid item xs={3}>
                        <Button variant="contained" color="primary"  type="submit">
                        Save   
                        </Button>
                    </Grid>

                    <Grid item xs={3}>
                        <Button variant="contained" color="secondary" type="button" component={Link} to="/">
                        Back
                        </Button>
                    </Grid>

                    </Grid>

                    </div>
    
                </Grid>


            </Grid>

        </form>

      </Paper>

    </div>

  );
}

export default EmployeeForm;
