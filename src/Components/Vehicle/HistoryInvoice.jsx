import React from 'react';
import {
    Dialog,
    DialogContent,
    useMediaQuery,
    useTheme,
    IconButton,
    Grid,
    Typography,
    Button
  } from '@mui/material';
  import { makeStyles } from '@material-ui/core/styles';
  import CloseIcon from "@mui/icons-material/Close";
  import PdfInvoice from "../PDFInvoice/PdfInvoice";
  import Card from '@mui/material/Card';
  import CardContent from '@mui/material/CardContent';

  const useStyles = makeStyles({
    dialogContent: {
      padding: 0, // Remove padding
    },
  });

function HistoryInvoice({ openInvoice, closeInvoice, InvoiceData}) {

    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


    const handleClose = () => { 
        closeInvoice();
      }

  return (
    <Dialog
    fullScreen={fullScreen}
    open={openInvoice}
    onClose={handleClose}
    maxWidth={false}
    PaperProps={{
      style: {
        width: '36%',
        height: '100%',
        right: 0,
        top: 0,
        bottom: 0,
        position: 'fixed',
        padding: 'none',
        overflowX: 'hidden'
      },
    }}
  >
    <DialogContent classes={{ root: classes.dialogContent }} style={{ padding: '0px', overflowX: 'hidden' }} >
      <div style={{ backgroundColor: '#00BFFF', height: '20%', paddingLeft: '20px', position: 'relative' }}>
        <IconButton onClick={handleClose} style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <CloseIcon color="black"></CloseIcon>
        </IconButton>
        <div style={{ position: 'absolute', bottom: '10px', width: '100%' }}>
          <Typography variant="h4" gutterBottom>
            {`Genarated Invoice`}
          </Typography>
          <Typography variant="subtitle" gutterBottom>
            {`
If the invoice details aren't being generated correctly, let's give it another shot.`}
          </Typography>
        </div>
      </div>
{InvoiceData && 
      <div style={{ padding: '30px' }}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={5}>
            <Card sx={{ minWidth: 150, minHeight: 265 }}>
                <CardContent>
                    <Typography variant="h6" component="div" sx={{ marginBottom: 1 }}>
                    Owner
                    </Typography>
                    <Typography sx={{ mb: 0}} color="text.secondary">
                    Name : {InvoiceData.owner_name}
                    </Typography>
                    <Typography sx={{ mb: 0.5 }} color="text.secondary">
                    Phone : {InvoiceData.owner_phoneNo}
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ marginBottom: 1 }}>
                    Vehicle
                    </Typography>
                    <Typography sx={{ mb: 0 }} color="text.secondary">
                    Number Plate : {InvoiceData.vehicle_id}
                    </Typography>
                    <Typography sx={{ mb: 0 }} color="text.secondary">
                    Model : {InvoiceData.model}
                    </Typography>
                    <Typography sx={{ mb: 0 }} color="text.secondary">
                    Fuel Type : {InvoiceData.fuel_type}
                    </Typography>
                    <Typography sx={{ mb: 0 }} color="text.secondary">
                    Mileage : {InvoiceData.mileage}
                    </Typography>
                </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={7}>
          <Card sx={{ minWidth: 250, minHeight: 265 }}>
                <CardContent>
                    <Typography variant="h6" component="div" sx={{ marginBottom: 1 }}>
                    Center
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Name :  {InvoiceData.CompanyName}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Address :  {InvoiceData.street_1},{InvoiceData.street_2},{InvoiceData.city},{InvoiceData.province}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Email :  {InvoiceData.email}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Phone :  {InvoiceData.phone}
                    </Typography>
                </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12}>
          <Card sx={{ minWidth: 520 }}>
          {InvoiceData.selectedItems.map((item, index) => (
                <CardContent key={index}>
                    <Typography variant="h6" component="div" sx={{ marginBottom: 1 }}>
                    Service Informations
                    </Typography>
                    <Typography sx={{ mb: 0.2}} color="text.secondary">
                    Type : {item.Type}
                    </Typography>
                    <Typography sx={{ mb: 0.2 }} color="text.secondary">
                    Item description : {item.Item}
                    </Typography>
                    <Typography sx={{ mb: 0.2 }} color="text.secondary">
                    Unit Price : {item.Price}
                    </Typography>
                    <Typography sx={{ mb: 0.2 }} color="text.secondary">
                    Quantity : {item.Quantity}
                    </Typography>
                    <Typography sx={{ mb: 0 }} color="text.secondary">
                    Total Price : {item.Total}
                    </Typography>
                    {/* <Typography variant="body2">
                    Fuel Type:
                    </Typography> */}
                </CardContent>
               ))} 
            </Card>
    
          </Grid>
          <Grid item xs={12} sm={12}>
          
          </Grid>
        </Grid>
      </div>
    }  

    </DialogContent>
    
    
    <Button sx={{ mb: 1.5 }}  >{InvoiceData &&<PdfInvoice invoiceData={InvoiceData} />}</Button>
  </Dialog>

  );
};

export default HistoryInvoice;
