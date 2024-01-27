import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import './SearchVehicleId.css';
import SearchResult from './SearchResult';
// import { Verified } from '@mui/icons-material';

//sample data set
let VEHICLE = [

    {
        model: 'Model1',
        make: 'Company1',
        yearofmanufacture: new Date().toLocaleDateString(),
        vehicleID: 'V1',
        licenseNo: 'LicenseNo-1',
        mileage: '10000',

        dateofservice: new Date().toLocaleDateString(),
        mileageatservice: '10000',
        workperformed: ['oil change', 'Repalce oil filter'],
        performedby: 'mechanic 1',
        cost: '15000',
        receipt: 'receipt 1',
        note: 'none',

      },

      {
        model: 'Model2',
        make: 'Company2',
        yearofmanufacture: new Date().toLocaleDateString(),
        vehicleID: 'V2',
        licenseNo: 'LicenseNo-2',
        mileage: '10002',

        dateofservice: new Date().toLocaleDateString(),
        mileageatservice: '10002',
        workperformed: ['oil change'],
        performedby: 'mechanic 2',
        cost: '5000',
        receipt: 'receipt 2',
        note: 'none',
      },
      
      {
        model: 'Model3',
        make: 'Company3',
        yearofmanufacture: new Date().toLocaleDateString(),
        vehicleID: 'V3',
        licenseNo: 'LicenseNo-3',
        mileage: '10003',

        dateofservice: new Date().toLocaleDateString(),
        mileageatservice: '10003',
        workperformed: ['oil change', 'Repalce oil filter', 'Breake oil change' ],
        performedby: 'mechanic 3',
        cost: '25000',
        receipt: 'receipt 3',
        note: 'covered under waranty',
      },
];


function SearchVehicleId() {

    const [vehicleId, setVehicleId] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    

    const handleSearch = () => {
        const result = VEHICLE.find((vehicle) => vehicle.vehicleID === vehicleId);
        setSearchResult(result);
    }    

    const handleBack = () => {
        //reset the search result to go back to the search box
        setSearchResult(null);
    }

  return (
    <div>
        {searchResult ? (
            <SearchResult searchResult={searchResult}  onBackClick={handleBack} />  
        ) : (
            <div className='container'>
                <div className='searchBox'>
                    <p className='text'>OnGoing Service Records</p>

                    <Box
                        sx={{
                            width: 500,
                            maxWidth: '100%',
                            padding: '0 0 20px 0',
                        }}
                        >
                        <TextField fullWidth label="Find by Vehicle ID" id="fullWidth" value={vehicleId}
                            onChange={ (e) => setVehicleId(e.target.value)}
                        />
                    </Box>
                    <Button component="label" variant="contained" startIcon={<SearchIcon />} 
                        sx={{
                            marginLeft: '180px',
                        }}
                        onClick={handleSearch}
                    >
                        Search
                    </Button>
                </div>      
            </div>
        )}
    </div>
    
  )
}

export default SearchVehicleId
