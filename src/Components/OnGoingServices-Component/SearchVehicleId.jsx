import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import SearchResult from './SearchResult';
import sampleData from '../DateFile/sampleData';
import './SearchVehicleId.css';

function SearchVehicleId({ onClose }) {
  const [vehicleId, setVehicleId] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = () => {
    const result = sampleData.find((vehicle) => vehicle.vehicleID === vehicleId);
    setSearchResult(result);
  };

  const handleBack = () => {
    // Reset the search result to go back to the search box
    setSearchResult(null);
  };

  return (
    <div className='SearchVehicleId'>
      {searchResult ? (
        <SearchResult searchResult={searchResult} onBackClick={handleBack} />
      ) : (
        <div className='container'>
          <div className='searchBox'>
            <p className='text'>Ongoing Service Records</p>

            <Box
              sx={{
                width: 800,
                maxWidth: '100%',
                padding: '20px 0 50px 330px',
              }}
            >
              <TextField
                fullWidth
                label="Find by Vehicle ID"
                id="fullWidth"
                value={vehicleId}
                onChange={(e) => setVehicleId(e.target.value)}
              />
            </Box>
            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              sx={{
                marginLeft: '480px',
              }}
              onClick={handleSearch}
            >
              Search
            </Button>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchVehicleId;
