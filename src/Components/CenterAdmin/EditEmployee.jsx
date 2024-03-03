import React, { useState, useEffect } from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";



function EditEmployee({ open, closeEditEmployee, employeeToEdit }) {

  console.log(employeeToEdit);

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
    }
  }, [employeeToEdit]);

  const handleChange = (e) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };


  const handleSubmit = async () => {
    if (!isValidEmployee(formState)) {

      return;
    }

    if (employeeToEdit) { 
      delete formState.profile_pic;
    }
    
    try {
      const response = await fetch(`http://localhost:5000/center/employee/${employeeToEdit.id}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        closeEditEmployee();
      } else {
        console.error('Error updating employee:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating employee:', error.message);
    }

    closeEditEmployee();

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
        // fullScreen
        open={open}
        onClose={closeEditEmployee}
        fullWidth
        maxWidth="md"
        style={{}}
      >
        <DialogTitle>
          ADD CLIENT{" "}
          <IconButton onClick={closeEditEmployee} style={{ float: "right" }}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>{" "}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={5}>
              <TextField id="standard-basic" label="Employee Name" fullWidth variant="standard"
                name="name"
                value={formState.name}
                onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField id="standard-basic" label="Supervisor" fullWidth variant="standard"
                name="manager_name"
                value={formState.manager_name}
                onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField id="standard-basic" label="Designation" fullWidth variant="standard"
                name="designation"
                value={formState.designation}
                onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField id="standard-basic" label="Role" fullWidth variant="standard"
                name="roles"
                value={formState.roles}
                onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={5}>
              <FormControl variant="standard" fullWidth>
                <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"

                  label="isActive"
                  name="isActive"
                  value={formState.isActive || ''}
                  onChange={handleChange}
                >
                  <MenuItem value={"true"}>Active</MenuItem>
                  <MenuItem value={"false"}>Inacive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={5}>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Button fullWidth color="primary" variant="contained" onClick={handleSubmit} >Submit</Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

    </div>

  )
}

export default EditEmployee