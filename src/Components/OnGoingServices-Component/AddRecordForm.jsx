import React from 'react';
import { TextField, Box, Button, DialogActions, DialogContent, DialogTitle, Dialog } from '@mui/material';

function AddRecordForm({ open, onClose, onAddRecord, newRecord, handleInputChange}) {

  const handleAddRecord = () => {
    onAddRecord(newRecord);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Record</DialogTitle>
      <DialogContent>
        <Box
          component='form'
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete='off'
        >
            <TextField
            
            label='Date of Service'
            name='dateofservice'
            value={newRecord.dateofservice}
            onChange={handleInputChange}
            fullWidth
            />
            <TextField
            label='Mileage at Service'
            name='mileageatservice'
            value={newRecord.mileageatservice}
            onChange={handleInputChange}
            fullWidth
            />
            <TextField
            label='Work Performed'
            name='workperformed'
            value={newRecord.workperformed}
            onChange={handleInputChange}
            fullWidth
            />
            <TextField
            label='Performed by'
            name='performedby'
            value={newRecord.performedby}
            onChange={handleInputChange}
            fullWidth
            />
            <TextField
            label='Cost'
            name='cost'
            value={newRecord.cost}
            onChange={handleInputChange}
            fullWidth
            />
            <TextField
            label='Invoice/Receipt#'
            name='receipt'
            value={newRecord.receipt}
            onChange={handleInputChange}
            fullWidth
            />
            <TextField
            label='Notes'
            name='note'
            value={newRecord.note}
            onChange={handleInputChange}
            fullWidth
            />
       </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button variant='contained' color='primary' onClick={handleAddRecord}>
          Add Record
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddRecordForm;