import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Headerfile from '../../Components/Page-Header/CardHeader';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


function AddService() {
  const [category, setCategory] = React.useState('');
  const [status, setStatus] = React.useState('');
  // const [selectedDate, setSelectedDate] = React.useState(null);

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };

  return (
    <div>
      <Headerfile title="Add Service" />
      <Card style={{ height: '80vh' }}>
        <CardContent>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '45ch' },
              marginTop: 7
            }}
            noValidate
            autoComplete="off"
          >
            <FormControl  >
              <FormControl sx={{ marginBottom: '20px' }}>
                <InputLabel>Category</InputLabel>
                <Select value={category} onChange={handleChangeCategory}>
                  <MenuItem value="category1">Category 1</MenuItem>
                  <MenuItem value="category2">Category 2</MenuItem>
                  <MenuItem value="category3">Category 3</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ marginBottom: '20px' }}>
                <InputLabel>Category</InputLabel>
                <Select value={category} onChange={handleChangeCategory}>
                  <MenuItem value="category1">Category 1</MenuItem>
                  <MenuItem value="category2">Category 2</MenuItem>
                  <MenuItem value="category3">Category 3</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ marginBottom: '20px' }}>
                <InputLabel>Status</InputLabel>
                <Select value={status} onChange={handleChangeStatus}>
                  <MenuItem value="status1">Status 1</MenuItem>
                  <MenuItem value="status2">Status 2</MenuItem>
                  <MenuItem value="status3">Status 3</MenuItem>
                </Select>
              </FormControl>
            </FormControl>


            <TextField id="standard-basic" label="Text Field 2" variant="standard" />
            <TextField id="standard-basic" label="Text Field 3" variant="standard" />

          </Box>
        </CardContent>
      </Card>

    </div>
  );
}

export default AddService
