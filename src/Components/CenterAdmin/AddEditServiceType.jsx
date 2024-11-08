import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


function AddEditServiceType({ open, serviceData, isEdit, closeEditServiceType, isUpdatedService, editRole }) { 
  const [serviceD, setServiceD] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const handleAlertClose = () => {
    setAlertMessage("");
    setAlertType("");
    setOpenAlert(false);
  }

  useEffect(() => {
    updateFields();
  }, [open]);

  const updateFields = () => {
    if (isEdit) {
      setServiceD(serviceData);
    } else {
      setServiceD({
        name: '',
        description: '',
        cost: 0.00
      });
    }
  };

  const handleClose = () => {
    setServiceD({});
    closeEditServiceType();
    isUpdatedService();
  };

  const handleChange = (event, property) => { 
    setServiceD(prevService => ({
      ...prevService,
      [property]: event.target.value
    }));
  };

  const isValidServiceType = () => { 
    return serviceD.name.trim() !== '' && serviceD.description.trim() !== '' & serviceD.cost >= 0
  };

  const submitServiceType = async () => { 
    console.log("service submit")
    if (isValidServiceType) { 
      try {
        const url = serviceData ? `http://localhost:5000/center/settings/serviceTypes/${serviceData.id}` : `http://localhost:5000/center/settings/addServiceType`;
        const method = serviceData ? `PATCH` : `POST`;
        console.log(url, method)
        const response = await fetch(url, {
          method: method,
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            schema: JSON.parse(window.sessionStorage.getItem('schema')),
            name: serviceD.name,
            description: serviceD.description,
            cost: serviceD
          })
        });

        await response.json();
        setAlertMessage(`Successfully ${serviceData ? 'edited' : 'added'}  service type`);
        setAlertType("success");
        setOpenAlert(true);
        handleClose();
      } catch (error) { 
        setAlertMessage("Edit service type Failed");
        setAlertType("error");
        setOpenAlert(true);
        console.error('Failed to add/edit service type:', error);
      }
    } else {
      setAlertMessage('Invalid service data');
      setAlertType("error");
      setOpenAlert(true);
      console.log('Invalid service data');
    }
  };

  return (
    <div>
      {
        openAlert &&
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={openAlert}
          autoHideDuration={3000}
          onClose={handleAlertClose}
        >
          <Alert severity={alertType}>
            {alertMessage}
          </Alert>
        </Snackbar>
      }
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {isEdit ? `EDIT SERVICE TYPE: ${serviceD.name}` : 'ADD NEW SERVICE TYPE'}
          <IconButton onClick={handleClose} style={{ float: "right" }}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={4}>
              <TextField id="standard-basic" label="Service Type" fullWidth variant="standard"
                name="name"
                value={serviceD.name}
                onChange={(event) => handleChange(event, 'name')}
                disabled={!editRole}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField id="standard-basic" label="Description" fullWidth variant="standard"
                name="description"
                value={serviceD.description}
                onChange={(event) => handleChange(event, 'description')}
                disabled={!editRole}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="salary"
                label="Cost"
                type="number"
                value={Number(serviceD.cost)} // Format the value to always show two decimal places
                onChange={(event) => handleChange(event, 'cost')}
                variant="standard"
                fullWidth
                disabled={!editRole}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button fullWidth color="primary" disabled={!editRole} variant="contained" onClick={submitServiceType}>Submit</Button>
            </Grid>
            <Grid item xs={12} sm={4}>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  )

}

export default AddEditServiceType