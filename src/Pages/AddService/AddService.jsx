// import React from 'react'
// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import { Padding } from '@mui/icons-material';



import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DateTimePicker from '@mui/lab/DateTimePicker';

function AddService() {
    const [type, setType] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [selectedDate, setSelectedDate] = React.useState(null);
    const handleChangeType = (event) => {
        setType(event.target.value);
    };

    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
    };

    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
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
                
                <TextField sx={{}} id="standard-basic" label="Text Field 1" variant="standard" />
                <TextField id="standard-basic" label="Text Field 2" variant="standard" />
                <TextField id="standard-basic" label="Text Field 3" variant="standard" />

            </Box>
           
        </div>
    );
}

export default AddService
