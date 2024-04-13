import React, { useState, useEffect } from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Autocomplete from '@mui/material/Autocomplete';
import CloseIcon from "@mui/icons-material/Close";



function EditEmployee({ open, closeEditEmployee, employeeToEdit, empData, isUpdatedEmp }) {
  const [genderData, setGenderData] = useState([]);
  const [formState, setFormState] = useState(employeeToEdit ? employeeToEdit : {
    name: "",
    manager: "",
    designation: "",
    role: "",
    status: "Active",
  });

  useEffect(() => {
    if (employeeToEdit) {
      setFormState(employeeToEdit);
      getGenders();
    }
  }, [employeeToEdit]);

  const handleEmpDataChange = (event, property) => {
    setFormState(prevEmp => ({
      ...prevEmp,
      [property]: property === 'isActive' ? (formState.isActive ? false : true) : event.target.value
    }));
  }

  const handleClose = () => {
    closeEditEmployee();
    isUpdatedEmp();
  }

  const getGenders = async () => {
    try {
      const response = await fetch("http://localhost:5000/parameter/gender", {
        method: "GET",
        headers: {
          'Content-type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setGenderData(data.data.genders);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async () => {
    if (!isValidEmployee(formState)) {

      return;
    }

    if (employeeToEdit) {
      delete formState.profile_pic;
    }
    const emp = {
      name: formState.name,
      designation: formState.designation,
      salary: formState.salary,
      isActive: formState.isActive,
      schema: window.sessionStorage.getItem('schema'),
    }
    if (formState.manager_id) { 
      emp.manager_id = formState.manager_id
    }
    try {
      const response = await fetch(`http://localhost:5000/center/employee/${employeeToEdit.id}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(emp),
      });

      if (response.ok) {
        handleClose();
      } else {
        console.error('Error updating employee:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating employee:', error.message);
    }

    handleClose();

  };

  const isValidEmployee = (formState) => {
    const { name, designation, role } = formState;

    if (name !== null && designation !== null && role !== null) {
      return true;
    }

    return false;
  };

  return (
    <div sx={{ textAlign: "center" }}>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        style={{ margin: '50px' }}
      >
        <DialogTitle>
          {`EDIT EMPLOYEE : ` + formState.name}
          <IconButton onClick={handleClose} style={{ float: "right" }}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>{" "}
        </DialogTitle>
        <DialogContent style={{ margin: '40px' }}>
          <Grid container spacing={10} justifyContent="center">
            <Grid item xs={12} sm={4}>
              <TextField id="standard-basic" onChange={(event) => handleEmpDataChange(event, 'username')} value={formState.username ?? ''} label="Username" disabled fullWidth variant="standard" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField id="standard-basic" onChange={(event) => handleEmpDataChange(event, 'name')} value={formState.name ?? ''} label="Name" fullWidth variant="standard" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField id="standard-basic" onChange={(event) => handleEmpDataChange(event, 'contact')} value={formState.contact ?? ''} label="Contact" disabled fullWidth variant="standard" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField id="standard-basic" onChange={(event) => handleEmpDataChange(event, 'email')} value={formState.email ?? ''} label="Email" disabled fullWidth variant="standard" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputLabel id="demo-simple-select-standard-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={formState.gender ?? null}
                fullWidth
                disabled
                onChange={(event) => handleEmpDataChange(event, 'gender')}
                label="Gender"
                variant="standard"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {genderData.map((item) => (
                  <MenuItem key={item.gender} value={item.gender}>
                    {item.description}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField id="standard-basic" onChange={(event) => handleEmpDataChange(event, 'nic')} value={formState.nic ?? ''} label="NIC" disabled fullWidth variant="standard" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField id="standard-basic" onChange={(event) => handleEmpDataChange(event, 'designation')} value={formState.designation ?? ''} label="Designation" fullWidth variant="standard" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                id="combo-box-demo"
                options={empData}
                getOptionLabel={(option) => option.name}
                value={empData.find((option) => option.id === formState.manager_id) || null}
                getoptionselected={(option, value) => option.manager_id === value.id}
                onChange={(event, newValue) => {
                  setFormState({ ...formState, manager_id: newValue ? newValue.id : null }); // Save the selected manager_id
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Manager"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                  />
                )}
                renderOption={(props, option) => <li {...props}>{option.name}</li>}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="salary"
                label="Salary"
                type="number"
                value={Number(formState.salary)} // Format the value to always show two decimal places
                onChange={(e) => setFormState({ ...formState, salary: e.target.value })}
                variant="standard"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormGroup>
                <FormControlLabel
                  control={<Switch checked={formState.isActive} onChange={(event) => handleEmpDataChange(event, 'isActive')} />}
                  label={formState.isActive ? 'Active' : 'Inactive'}
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={4}>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button fullWidth color="primary" variant="contained" onClick={handleSubmit}>Submit</Button>
            </Grid>
            <Grid item xs={12} sm={4}>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

    </div>

  )
}

export default EditEmployee