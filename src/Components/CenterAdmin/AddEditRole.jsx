import React, { useEffect, useState } from 'react'
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  TextField,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function AddEditRole({ open, openedit, roleData, isEdit, closeAddRole, CloseEditRole, isUpdatedRole, editRole }) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [privileges, setPrivileges] = useState('');
  const [addRoleBodyCols, setRows] = useState([
    { name: 'ongoing', label: 'On Going Services', view: false, edit: false, viewVal: 'os:v', editVal: 'os:ad' },
    { name: 'employees', label: 'Employees', view: false, edit: false, viewVal: 'ep:v', editVal: 'ep:ad' },
    { name: 'clientele', label: 'Clientele', view: false, edit: false, viewVal: 'cp:v', editVal: 'cp:ad' },
    { name: 'inventory', label: 'Inventory', view: false, edit: false, viewVal: 'ip:v', editVal: 'ip:ad' },
    { name: 'settings', label: 'Settings', view: false, edit: false, viewVal: 'sp:v', editVal: 'sp:ad' },
    { name: 'profile', label: 'Profile', view: false, edit: false, viewVal: 'pp:v', editVal: 'pp:ad' },
  ]);
  const addRoleCols = [
    { id: 'name', label: 'Page', },
    { id: 'privileges', label: 'Privileges', minWidth: 150, maxWidth: 150 }
  ]

  useEffect(() => {
    updateFields();
  }, [open]);


  // UPDATE ROLE DATA TO FIELDS 
  const updateFields = () => {
    if (isEdit) {
      const priv = roleData.privileges.split(', ');
      const updatedRows = addRoleBodyCols.map(row => {
        if (priv.includes(row.editVal)) {
          return { ...row, view: true, edit: true };
        } else if (priv.includes(row.viewVal)) {
          return { ...row, view: true, edit: false };
        } else {
          return row; // Keep the row unchanged
        }
      });
      setName(roleData.name);
      setDescription(roleData.description);
      setPrivileges(roleData.privileges);
      setRows(updatedRows);
    } else { 
      setName('');
      setDescription('');
      setPrivileges('');
    }
  }

  const handleClose = () => {
    setPrivileges('');
    setName('');
    setDescription('');
    setRows([
      { name: 'ongoing', label: 'On Going Services', view: false, edit: false, viewVal: 'os:v', editVal: 'os:ad' },
      { name: 'employees', label: 'Employees', view: false, edit: false, viewVal: 'ep:v', editVal: 'ep:ad' },
      { name: 'clientele', label: 'Clientele', view: false, edit: false, viewVal: 'cp:v', editVal: 'cp:ad' },
      { name: 'inventory', label: 'Inventory', view: false, edit: false, viewVal: 'ip:v', editVal: 'ip:ad' },
      { name: 'settings', label: 'Settings', view: false, edit: false, viewVal: 'sp:v', editVal: 'sp:ad' },
      { name: 'profile', label: 'Profile', view: false, edit: false, viewVal: 'pp:v', editVal: 'pp:ad' },
    ]);
    closeAddRole();
    CloseEditRole();
    isUpdatedRole();
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };


  const handleCheckboxChange = (event, row, type) => {
    const isChecked = event.target.checked;
    if (type === 'view') {
      if (isChecked) {
        // If checkbox is checked, update privileges and row state
        setPrivileges(prevPrivileges => prevPrivileges ? `${prevPrivileges}, ${row.viewVal}` : row.viewVal);
        setRows(prevRows => prevRows.map(prevRow => prevRow.name === row.name ? { ...prevRow, view: true } : prevRow));
      } else {
        // If checkbox is unchecked, update privileges and row state
        if (!row.edit) {
          setPrivileges(prevPrivileges => prevPrivileges.split(', ').filter(privilege => privilege !== row.viewVal).join(', '));
          setRows(prevRows => prevRows.map(prevRow => prevRow.name === row.name ? { ...prevRow, view: false } : prevRow));
        }
      }
    } else if (type === 'edit') {
      if (isChecked) {
        // If checkbox is checked, update privileges and row state
        setPrivileges(prevPrivileges => prevPrivileges ? row.view ? `${prevPrivileges}, ${row.editVal}` : `${prevPrivileges}, ${row.viewVal}, ${row.editVal}` : `${row.viewVal}, ${row.editVal}`);
        setRows(prevRows => prevRows.map(prevRow => prevRow.name === row.name ? { ...prevRow, edit: true, view: true } : prevRow));
      } else {
        // If checkbox is unchecked, update privileges and row state
        setPrivileges(prevPrivileges => prevPrivileges.split(', ').filter(privilege => privilege !== row.editVal).join(', '));
        setRows(prevRows => prevRows.map(prevRow => prevRow.name === row.name ? { ...prevRow, edit: false } : prevRow));
      }
    }
    console.log('Rows: ', addRoleBodyCols);

  };

  const isValidRole = () => {
    return name.trim() !== '' && description.trim() !== '' && privileges.trim() !== '';
  };

  const submitRole = async () => {
    if (isValidRole()) {
      console.log('privileges: ', privileges)
      try {
        const roleId = roleData ? roleData.id : null;
        const url = roleId ? `http://localhost:5000/center/settings/roles/${roleId}` : 'http://localhost:5000/center/settings/addroles';
        const method = roleId ? 'PATCH' : 'POST';

        const response = await fetch(url, {
          method: method,
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            schema: JSON.parse(window.sessionStorage.getItem('schema')),
            name: name,
            description: description,
            privileges: privileges,
          }),
        });
        const data = await response.json();

        if (response.ok) {
          roleData ? CloseEditRole(data.data.role) : closeAddRole(data.data.role);
        }
        handleClose();
      } catch (error) {
        console.error('Failed to add/edit role:', error);
      }
    } else {
      console.error('Invalid role data.');
    }
  };

  return (
    <div >
      <Dialog
        // fullScreen
        open={openedit || open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        style={{}}
      >
        <DialogTitle>
          {isEdit ? `EDIT ROLE: ${name}`: 'ADD NEW ROLE'}
          <IconButton onClick={handleClose} style={{ float: "right" }}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={5}>
              <TextField id="standard-basic" label="Role Name" fullWidth variant="standard"
                name="name"
                value={name}
                onChange={handleNameChange}
                disabled={!editRole}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField id="standard-basic" label="Description" fullWidth variant="standard"
                name="description"
                value={description}
                onChange={handleDescriptionChange}
                disabled={!editRole}
              />
            </Grid>
          </Grid>
          <div style={{ overflowX: 'auto', marginTop: '40px' }}>
            <TableContainer component={Paper} sx={{ height: '100%', width: '100%', overflowX: 'auto' }} >
              <Table stickyHeader size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    {addRoleCols.map((col) => (
                      <TableCell
                        key={col.id}
                        align={col.id === 'name' ? 'left' : 'center'}
                        style={{ minWidth: col.minWidth, maxWidth: col.maxWidth }}
                      >
                        {col.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {addRoleBodyCols.map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                        {addRoleCols.map((col) => (
                          col.id === 'name' ?
                            <TableCell key={col.id} align='left'>
                              {row['label']}
                            </TableCell> :
                            <TableCell key={col.id} align='center'>
                              <FormControlLabel size="small" disabled={!editRole} control={<Checkbox checked={row.view} onChange={(event) => handleCheckboxChange(event, row, 'view')} />} label="View" />
                              <FormControlLabel size="small" disabled={!editRole} control={<Checkbox checked={row.edit} onChange={(event) => handleCheckboxChange(event, row, 'edit')} />} label="Edit" />
                            </TableCell>
                        ))}
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <div style={{ justifyContent: 'center' }}>
            <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
              <Button fullWidth color="primary" variant="contained" onClick={submitRole}>
                {roleData ? 'Save Changes' : 'Submit'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddEditRole