import React from 'react'
import Footer from '../../Components/Footer-Component/footerComponent';
import Header from '../../Components/Header-Component/headerComponent';
import Sidenav from '../../Components/Side Nav/sideNav';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function OnGoingServices(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/service/')
            .then(response => {
                setData(response.data);
                console.log(response.data)

            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    return (
        <div>
            {/* <Header position="sticky"></Header> */}
         <Box>
           Services
         </Box>
        </div>
    )
}

export default OnGoingServices
