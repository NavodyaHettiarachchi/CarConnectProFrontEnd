import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TextField,
  Typography,
  IconButton
} from "@mui/material";
import Paper from "@mui/material/Paper";
import axios from 'axios';
import CancelPresentationOutlinedIcon from "@mui/icons-material/CancelPresentationOutlined";
import PdfInvoice from "../PDFInvoice/PdfInvoice";

const columns = [
  { id: "type", label: "Type", minWidth: 170 },
  { id: "item", label: "Item", minWidth: 170 },
  { id: "price", label: "Price", minWidth: 170 },
  { id: "quantity", label: "Quantity", minWidth: 170 },
  { id: "total", label: "Total", minWidth: 170 },
];

const VehicleCard = ({
  // number,
  // image,
  // model,
  // fuel,
  // milage,
  clientId,
  selected,
  editRole
}) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [inputFields, setInputFields] = useState([]);
  const [fullAmount, setFullAmount] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [serviceItems, setServiceItems] = useState([]);
  const [ongoingServices, setOngoingServices] = useState([]);
  const [vehiData, setVehiData] = useState([]);
  const [invoiceData, setInvoiceData] = useState(null);
  const [centerData, setCenterData] = useState({
    username: '',
    email: '',
    name: '',
    phone: '',
    center_type: '',
    street_1: '',
    street_2: '',
    city: '',
    province: ''

  })

  const getVehicleNumber = () => {
    const vehicle = vehiData.find((vehicle) => vehicle.id === clientId);
    return vehicle ? vehicle.number_plate : null;
  };

  // const getMileage = () => {
  //   const vehicle = vehiData.find((vehicle) => vehicle.id === clientId);
  //   return vehicle ? vehicle.mileage_on_reg : null;
  // };
  const getModel = () => {
    const vehicle = vehiData.find((vehicle) => vehicle.id === clientId);
    return vehicle ? vehicle.model : null;
  };
  const getFuel = () => {
    const vehicle = vehiData.find((vehicle) => vehicle.id === clientId);
    return vehicle ? vehicle.fuel_type : null;
  };

  const getOwner = () => {
    const vehicle = vehiData.find((vehicle) => vehicle.id === clientId);
    return vehicle ? vehicle.owner_name : null;
  };

  const getOwnerPhoneNo = () => {
    const vehicle = vehiData.find((vehicle) => vehicle.id === clientId);
    return vehicle ? vehicle.owner_contact : null;
  };

  const handleClickOpen = () => {
    setOpen(true);
    getOngoingServices();
    getAllServices();

    setInputFields([
      { type: "", item: "", price: "", quantity: "1", total: "" },
    ]);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getOngoingServices = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/center/onGoingServices/${clientId}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            schema: JSON.parse(window.sessionStorage.getItem('schema')),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      let clientData = data.data.client;

      setOngoingServices(clientData);

      setInputFields(clientData.details);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const getAllVehicles = async () => {
    try {
      const response = await fetch("http://localhost:5000/center/getclients", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          schema: JSON.parse(window.sessionStorage.getItem('schema')),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setVehiData(data.data.clients);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSaveClick = async () => {
    console.log("invoice data", invoiceData);
    // Filter out inputFields with empty values
    const validInputFields = inputFields.filter(
      (inputField) =>
        inputField.type &&
        inputField.item &&
        inputField.price &&
        inputField.quantity
    );

    const updatedClientData = { ...ongoingServices, details: validInputFields };
    setOngoingServices(updatedClientData);
    handleClose();
    console.log("updated:", updatedClientData);
    try {
      const response = await fetch(
        `http://localhost:5000/center/onGoingServices/${ongoingServices.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            schema: JSON.parse(window.sessionStorage.getItem('schema')),
            details: JSON.stringify(updatedClientData.details),
          }),
        }
      );

      const data = await response.json();

      // Handle successful response here
    } catch (error) {
      console.log(error);

      // Handle error here
    }
  };

  // const calculateTotalCost = (tableData) => {
  //   return tableData.reduce((acc, curr) => {
  //     const price = parseFloat(curr.price.replace("Rs. ", ""));
  //     const quantity = parseFloat(curr.quantity);
  //     return isNaN(price) || isNaN(quantity) ? acc : acc + price * quantity;
  //   }, 0);
  // };
  useEffect(() => {
    // Calculate the full amount
    const totalAmount = inputFields.reduce((acc, curr) => {
      const total = curr.total ? parseFloat(curr.total.replace("Rs. ", "")) : 0;
      return isNaN(total) ? acc : acc + total;
    }, 0);

    setFullAmount(totalAmount);
  }, [inputFields]);

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;

    // If the item type is "Service", set the price based on the selected service
    if (event.target.name === "item" && values[index].type === "Service") {
      const selectedService = serviceItems.find(
        (service) => service.name === event.target.value
      );
      if (selectedService) {
        values[index].price = "Rs. " + selectedService.cost;
      }
    }

    // Parse price and quantity as floats
    const price = parseFloat(values[index].price.replace("Rs. ", ""));
    const quantity = parseFloat(values[index].quantity);

    // if (values[index].price && values[index].quantity) {
    //   const price = parseFloat(values[index].price.replace("Rs. ", ""));
    //   const quantity = parseFloat(values[index].quantity);

    // Calculate total if both price and quantity are valid numbers
    if (!isNaN(price) && !isNaN(quantity)) {
      values[index].total = "Rs. " + (price * quantity).toFixed(2);
    } else {
      values[index].total = "";
    }

    // else {
    //   values[index].total = "";
    // }
    // if (values[index].tax) {
    //   values[index].tax = "Rs. " + values[index].tax;
    // }
    // Calculate the total of all the total fields

    // Set the fullAmount state with the total cost

    setInputFields(values);

    // Update tableData when input fields change
    setTableData(inputFields);
  };

  const getAllServices = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/center/settings/serviceTypes",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            schema: JSON.parse(window.sessionStorage.getItem('schema')),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setServiceItems(data.data.serviceTypes);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddClick = () => {
    setData([
      ...data,
      {
        type: "",
        item: "",
        price: "",
        quantity: "1",
        total: "",
      },
    ]);

    setInputFields([
      ...inputFields,
      { type: "", item: "", price: "", quantity: "1", total: "" },
    ]);
  };

  const handleRemoveClick = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
    const updatedDetails = ongoingServices.details.filter(
      (detail, i) => i !== index
    );
    const updatedClientData = { ...ongoingServices, details: updatedDetails };
    setOngoingServices(updatedClientData);
  };

  const InventoryItems = [
    { id: 1, name: "Inventory 1" },
    { id: 2, name: "Inventory 2" },
    { id: 3, name: "Inventory 3" },
  ];
  const disableOngoingService = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/center/onGoingServices/${ongoingServices.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            schema: JSON.parse(window.sessionStorage.getItem('schema')),
            isOngoing: false,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //pdfInvoice genaration
  //collect final values
  const initialUserID = JSON.parse(window.sessionStorage.getItem('userId')) || null;
  const [UserID] = useState(initialUserID);

  useEffect(() => {
    axios.get('http://localhost:5000/center/profile/' + UserID)
      .then(response => {
        const { username, email, phone, name, center_type, street_1, street_2, city, province } = response.data.data.userData;
        console.log(response.data);
        setCenterData({
          username,
          email,
          phone,
          name,
          center_type,
          street_1,
          street_2,
          city,
          province,
        });
      })

      .catch(error => {
        console.error('Error fetching user data:', error);
      });

  }, [UserID]);

  const generateInvoiceData = () => {
    const owner_name = getOwner();
    const owner_phoneNo = getOwnerPhoneNo();
    const CompanyName = centerData.name;
    const street_1 = centerData.street_1; 
    const street_2 = centerData.street_2;
    const city = centerData.city;
    const province = centerData.province;
    const phone = centerData.phone;
    const email = centerData.email;
    const vehicle_id = getVehicleNumber();
    const fuel_type = getFuel();
    const model = getModel();
    const mileage = ongoingServices.mileage;
    const selectedItems = inputFields.map((item) => ({
      Type: item.type,
      Item: item.item,
      Price: item.price,
      Quantity: parseFloat(item.quantity),
      Total: item.total,
    }));
    const full_Amount = fullAmount;

    setInvoiceData({
      vehicle_id,
      fuel_type,
      model,
      mileage,
      selectedItems,
      full_Amount,
      CompanyName,
      street_1,
      street_2,
      city,
      province,
      phone,
      email,
      owner_name,
      owner_phoneNo,
    });

    console.log("in genarate invoiceData", invoiceData);
  };

  // const handleGenerateInvoice = () => {
  //   generateInvoiceData();
  //   console.log("in handle genarate invoiceData" , invoiceData);
  // };

  const handleFinish = () => {
    console.log("finish clicked");
    handleSaveClick();
    handleClose();
    disableOngoingService();
  };
  
  useEffect(() => {
    getAllVehicles();
  }, []);

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <Card sx={{ width: 350, height: 200, position: "relative" }}>
          {selected && <div className="selected-overlay"></div>}
          {/* <CardMedia component="img" height="140" image={image} /> */}
          <CardContent>
            <Typography variant="h5" component="div">
              <center> {getVehicleNumber()}</center>
            </Typography>
          </CardContent>
        </Card>
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="xl">
        <DialogTitle>
          <h3>
            <center> Service Details</center>
          </h3>

          <Grid container>
            <Grid item container>
              <Grid item xs={6}>
                <Typography variant="h6">
                  Vehicle No: {getVehicleNumber()}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="h6">Model: {getModel()} </Typography>
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item xs={6}>
                <Typography variant="h6">Fuel Type: {getFuel()}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">
                  Mileage: {ongoingServices.mileage}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </DialogTitle>

        <DialogContent>
          <div>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          minWidth: column.minWidth,
                          maxWidth: column.maxWidth,
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {inputFields.map((inputField, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <FormControl fullWidth>
                          <InputLabel id="type-label">Select Type</InputLabel>
                          <Select
                            labelId="type-label"
                            label="Select Type"
                            value={inputField.type}
                            name="type"
                            disabled={!editRole}
                            onChange={(event) =>
                              handleInputChange(index, event)
                            }
                            sx={{ width: "200px", mr: "10px" }}
                          >
                            <MenuItem value="Service">Service</MenuItem>
                            <MenuItem value="Inventory">Amenity</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <FormControl fullWidth>
                          <InputLabel id="type-label">Select Item</InputLabel>
                          <Select
                            label="Item"
                            value={inputField.item}
                            name="item"
                            disabled={!editRole}
                            onChange={(event) =>
                              handleInputChange(index, event)
                            }
                            sx={{ width: "200px", mr: "10px" }}
                          >
                            {inputField.type === "Service" &&
                              serviceItems.map((item) => (
                                <MenuItem value={item.name} key={item.id}>
                                  {item.name}
                                </MenuItem>
                              ))}

                            {inputField.type === "Inventory" &&
                              InventoryItems.map((item) => (
                                <MenuItem value={item.name} key={item.id}>
                                  {item.name}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <TextField
                          label="Price"
                          value={inputField.price}
                          name="price"
                          disabled={!editRole}
                          onChange={(event) => handleInputChange(index, event)}
                          sx={{ width: "200px", mr: "10px" }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          label="Quantity"
                          value={inputField.quantity}
                          name="quantity"
                          disabled={!editRole}
                          onChange={(event) => handleInputChange(index, event)}
                          sx={{ width: "200px", mr: "10px" }}
                        />
                      </TableCell>
                      <TableCell>{inputField.total}</TableCell>
                      <TableCell>
                        <IconButton aira-label="edit" disabled={!editRole} onClick={() => handleRemoveClick(index)} >
                          <CancelPresentationOutlinedIcon
                            variant="contained"
                            color="primary"
                            fontSize="large"
                          />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <br />
            <Grid container direction="row" justifyContent="space-between">
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddClick}
                  disabled={!editRole}
                >
                  Add
                </Button>
              </Grid>
              <Grid item>
                <Typography variant="h6">
                  Full Amount: Rs. {fullAmount.toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" disabled={!editRole} onClick={handleSaveClick}>
            Save
          </Button>
          <Button variant="contained" color="primary" disabled={!editRole} onClick={handleFinish}>
            Finish
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={generateInvoiceData}
            disabled={!editRole}
          >
            Genarate Invoice
          </Button>
          <Button onClick={handleClose} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
        <DialogActions>
          {invoiceData && <PdfInvoice invoiceData={invoiceData} />}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default VehicleCard;
