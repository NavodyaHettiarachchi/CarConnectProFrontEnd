import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { makeStyles } from "@material-ui/core/styles";

function CardHeader(props) {
    const useStyles = makeStyles((theme) => ({
        appBar: {
            top: "auto",
            bottom: 0
        },
        typo: {
            flexGrow: 1,
            textAlign: "center"
        }
    }));
    const classes = useStyles();
    return (
        <div>
            <Box sx={{ width: '85vw' }}>
                <Typography className={classes.typo} variant="h4" gutterBottom>
                    {props.title}
                </Typography>
            </Box>
        </div>
    )
}

export default CardHeader
