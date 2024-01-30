import React, { useState } from 'react';
import Fab from '@mui/material/Fab';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import AddRecordForm from './AddRecordForm';
import './SearchResult.css';

function SearchResult({ searchResult, onBackClick }) {
  const [isAddRecordFormOpen, setAddRecordFormOpen] = useState(false);
  const [newRecord, setNewRecord] = useState({
    dateofservice: '',
    mileageatservice: '',
    workperformed: '',
    performedby: '',
    cost: '',
    receipt: '',
    note: '',
  });

  const [serviceRecords, setServiceRecords] = useState(searchResult.serviceRecords || []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewRecord((prevRecord) => ({
      ...prevRecord,
      [name]: value,
    }));
  };

  const handleAddRecord = (record) => {
    setServiceRecords((prevRecords) => [...prevRecords, record]);
    setAddRecordFormOpen(false);
  };

  if (!searchResult) {
    return null;
  }


  return (
    <div className='searchResult'>
        <div className='section-1'>
            <div className='fab'>
                <Fab  size="small" color="secondary" aria-label="add" onClick={onBackClick}>
                    <ArrowBackRoundedIcon />
                </Fab>
            </div>
            <div>
                    <TextField
                        id="outlined-read-only-input"
                        label="Vehicle ID:"
                        defaultValue={searchResult.vehicleID}
                        InputProps={{
                            readOnly: true,
                        }}
                    />

            </div>       
        </div>
        <div className='section-2'>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField
                        id="outlined-read-only-input"
                        label="Model:"
                        defaultValue={searchResult.model}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        id="outlined-read-only-input"
                        label="Make:"
                        defaultValue={searchResult.make}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        id="outlined-read-only-input"
                        label="Year of manufacture:"
                        defaultValue={searchResult.yearofmanufacture}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        id="outlined-read-only-input"
                        label="License No:"
                        defaultValue={searchResult.licenseNo}
                        InputProps={{
                            readOnly: true,
                        }}
                    />

                </div>   
            </Box>
        </div>
        <div className='section-3'>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField
                        id="outlined-read-only-input"
                        label="Mileage:"
                        defaultValue={searchResult.mileage}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </div> 
            </Box>
        </div>
        <div className='section-4'>
             <TableContainer component={Paper} className=''>
                <Table className='' aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell className='' style={{ backgroundColor: '#2222', fontWeight: 'bold' }}>date of service</TableCell>
                        <TableCell className='' style={{ backgroundColor: '#2222', fontWeight: 'bold' }}>Mileage at service</TableCell>
                        <TableCell className='' style={{ backgroundColor: '#2222', fontWeight: 'bold' }}>Work Performed</TableCell>
                        <TableCell className='' style={{ backgroundColor: '#2222', fontWeight: 'bold' }}>Performed by</TableCell> 
                        <TableCell className='' style={{ backgroundColor: '#2222', fontWeight: 'bold' }}>Cost</TableCell>
                        <TableCell className='' style={{ backgroundColor: '#2222', fontWeight: 'bold' }}>Invoice/Receipt#</TableCell>
                        <TableCell className='' style={{ backgroundColor: '#2222', fontWeight: 'bold' }}>Notes</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {serviceRecords.map((record, index) => (
                            <TableRow key={index}>
                            <TableCell>{record.dateofservice}</TableCell>
                            <TableCell>{record.mileageatservice}</TableCell>
                            <TableCell>{Array.isArray(record.workperformed) ? record.workperformed.join(', ') : record.workperformed}</TableCell>
                            <TableCell>{record.performedby}</TableCell>
                            <TableCell>{record.cost}</TableCell>
                            <TableCell>{record.receipt}</TableCell>
                            <TableCell>{record.note}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                </Table>
            </TableContainer>

            <div className='section-5'>
                <div>
                    <Fab  size="small" color="secondary" aria-label="add" onClick={() => setAddRecordFormOpen(true)}>
                    <AddIcon />
                    </Fab>
                </div>
                <div className='section-5-1'>     
                    <div>
                    <Button variant='contained' color='primary'>
                        Service History
                    </Button>
                    </div>

                    <div className='save-btn'>
                        <div className='save-close'>
                            <Button variant='contained' color='primary' >
                            Save & Close
                            </Button>
                        </div>
                        <div>
                            <Button variant='contained' color='primary' >
                            Save & Finished
                            </Button>
                        </div>
                    </div>
                </div>     
            </div>       
        </div>    

        {/* AddRecordForm component as a modal */}
        <AddRecordForm
            open={isAddRecordFormOpen}
            onClose={() => setAddRecordFormOpen(false)}
            onAddRecord={handleAddRecord}
            newRecord={newRecord}
            handleInputChange={handleInputChange}
        />
        </div>
  );
}

export default SearchResult;