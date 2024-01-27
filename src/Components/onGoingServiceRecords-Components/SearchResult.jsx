import React, { useState } from 'react'
import Fab from '@mui/material/Fab';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
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
import { makeStyles } from '@material-ui/core/styles';
import './SearchResult.css'


const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
    },
    TableContainer: {
        borderRadius: 15,
        margin: '20px 30px 10px 30px',
        maxWidth: 1200
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark),
    },

}));


function SearchResult({ searchResult, onBackClick }) {
    const classes = useStyles();

    const [newRecord, setNewRecord] = useState({
        dateofservice: '',
        mileageatservice: '',
        workperformed: '',
        performedby: '',
        cost: '',
        receipt: '',
        note: '',
      });


// array of service records named 'serviceRecords'
const [serviceRecords, setServiceRecords] = useState(
    searchResult.serviceRecords || [
    {
        dateofservice: new Date().toLocaleDateString(),
        mileageatservice: '10000',
        workperformed: ['oil change', 'Repalce oil filter'],
        performedby: 'mechanic 1',
        cost: '15000',
        receipt: 'receipt 1',
        note: 'none',
    },

    {
        dateofservice: new Date().toLocaleDateString(),
        mileageatservice: '10002',
        workperformed: ['oil change'],
        performedby: 'mechanic 2',
        cost: '5000',
        receipt: 'receipt 2',
        note: 'none',
    },

    {
        dateofservice: new Date().toLocaleDateString(),
        mileageatservice: '10003',
        workperformed: ['oil change', 'Repalce oil filter', 'Breake oil change' ],
        performedby: 'mechanic 3',
        cost: '25000',
        receipt: 'receipt 3',
        note: 'covered under waranty',
    },
]);

const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewRecord((prevRecord) => ({
      ...prevRecord,
      [name]: value,
    }));
  };

  const handleAddRecord = () => {
    setServiceRecords((prevRecords) => [...prevRecords, newRecord]);
    setNewRecord({
      dateofservice: '',
      mileageatservice: '',
      workperformed: '',
      performedby: '',
      cost: '',
      receipt: '',
      note: '',
    });
  };



  if (!searchResult){
    return null;
}



  return (
    <div className='searchResult'>
        <div className='section-1'>
            <Fab size="small" color="secondary" aria-label="add" onClick={onBackClick}>
                <ArrowBackRoundedIcon />
            </Fab>
            
            <TextField
                        id="outlined-read-only-input"
                        label="Vehicle ID:"
                        defaultValue={searchResult.vehicleID}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
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
             <TableContainer component={Paper} className={classes.TableContainer}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableHeaderCell}>date of service</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Mileage at service</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Work Performed</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Performed by</TableCell> 
                        <TableCell className={classes.tableHeaderCell}>Cost</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Invoice/Receipt#</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Notes</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {serviceRecords.map((record, index) => (
                        <TableRow
                        key={index}
                        >
                        <TableCell >{record.dateofservice}</TableCell>    
                        <TableCell component="th" scope="row">
                            {record.dateofservice}
                        </TableCell>
                        <TableCell >{record.mileageatservice}</TableCell>
                        <TableCell >{record.workperformed.join(', ')}</TableCell>
                        <TableCell >{record.performedby}</TableCell>
                        <TableCell >{record.cost}</TableCell>
                        <TableCell >{record.receipt}</TableCell>
                        <TableCell >{record.note}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
                <Box
                    component='form'
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete='off'
                    >
                    <div>
                        <TextField
                        id='dateofservice'
                        label='Date of Service'
                        variant='outlined'
                        name='dateofservice'
                        value={newRecord.dateofservice}
                        onChange={handleInputChange}
                        />
                        <TextField
                        id='mileageatservice'
                        label='Mileage at Service'
                        variant='outlined'
                        name='mileageatservice'
                        value={newRecord.mileageatservice}
                        onChange={handleInputChange}
                        />
                        <TextField
                        id='workperformed'
                        label='Work Performed'
                        variant='outlined'
                        name='workperformed'
                        value={newRecord.workperformed}
                        onChange={handleInputChange}
                        />
                        <TextField
                        id='performedby'
                        label='Performed by'
                        variant='outlined'
                        name='performedby'
                        value={newRecord.performedby}
                        onChange={handleInputChange}
                        />
                        <TextField
                        id='cost'
                        label='Cost'
                        variant='outlined'
                        name='cost'
                        value={newRecord.cost}
                        onChange={handleInputChange}
                        />
                        <TextField
                        id='receipt'
                        label='Invoice/Receipt#'
                        variant='outlined'
                        name='receipt'
                        value={newRecord.receipt}
                        onChange={handleInputChange}
                        />
                        <TextField
                        id='note'
                        label='Notes'
                        variant='outlined'
                        name='note'
                        value={newRecord.note}
                        onChange={handleInputChange}
                        />
                        <Button variant='contained' color='primary' onClick={handleAddRecord}>
                        Add New Record
                        </Button>
                    </div>
                </Box>     
        </div>      
    </div>
  )
}

export default SearchResult
