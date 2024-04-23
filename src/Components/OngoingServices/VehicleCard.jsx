import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
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
  Snackbar,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import axios from "axios";
import CancelPresentationOutlinedIcon from "@mui/icons-material/CancelPresentationOutlined";
import PdfInvoice from "../PDFInvoice/PdfInvoice";
import Alert from "@mui/material/Alert";

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
  isUpdated
}) => {
  const [open, setOpen] = useState(false);

  const [data, setData] = useState([]);
  const [inputFields, setInputFields] = useState([]);
  const [previousData, setPreviousData] = useState([]);
  const [isDisable, setIsDisable] = useState(false);
  const [fullAmount, setFullAmount] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [serviceItems, setServiceItems] = useState([]);
  const [ongoingServices, setOngoingServices] = useState([]);
  const [vehiData, setVehiData] = useState([]);
  const [invoiceData, setInvoiceData] = useState(null);
  const [parts, setParts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [centerData, setCenterData] = useState({
    username: "",
    email: "",
    name: "",
    phone: "",
    center_type: "",
    street_1: "",
    street_2: "",
    city: "",
    province: "",
  });
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

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
  const handleAlertClose = () => {
    setAlertMessage("");
    setAlertType("");
    setOpenAlert(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
    getOngoingServices();
    getAllServices();
    getAllInventory();
    setInputFields([
      { type: "", item: "", price: "", quantity: "1", total: "" },
    ]);
    // setSelectedItems(inputFields.map((item) => item.item));
  };

  const handleClose = () => {
    setOpen(false);
    // setSelectedItems([]);
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
            schema: JSON.parse(window.sessionStorage.getItem("schema")),
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
      setPreviousData(clientData.details);
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
          schema: JSON.parse(window.sessionStorage.getItem("schema")),
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
    try {
      const response = await fetch(
        `http://localhost:5000/center/onGoingServices/${ongoingServices.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            schema: JSON.parse(window.sessionStorage.getItem("schema")),
            details: JSON.stringify(updatedClientData.details),
          }),
        }
      );

      await response.json();

      let inventoryArr = updatedClientData.details.filter((item) => {
        return (
          !previousData.some((obj) => obj.id === item.id) && item.type === 'Inventory'
        );
      });

      for (let i = 0; i < inventoryArr.length; i++) {
        let q = (parts.filter((part) => part.part_id === inventoryArr[i].id))[0].quantity;
        await fetch(`http://localhost:5000/center/inventory/${inventoryArr[i].id}`, {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            schema: JSON.parse(window.sessionStorage.getItem("schema")),
            quantity: q - inventoryArr[i].quantity,
          }),
        });
      }

      // Handle successful response here
      document.dispatchEvent(new Event('customUpdateEvent'));
    } catch (error) {
      console.log(error);

      // Handle error here
    }
    setAlertMessage(
      `Successfully Saved Service Dedtails For ${getVehicleNumber()}!`
    );
    setAlertType("success");
    setOpenAlert(true);
  };

  useEffect(() => {
    // Calculate the full amount
    const totalAmount = inputFields.reduce((acc, curr) => {
      const total = curr.total ? parseFloat(curr.total.replace("Rs. ", "")) : 0;
      return isNaN(total) ? acc : acc + total;
    }, 0);

    setFullAmount(totalAmount);
  }, [inputFields]);

  const checkMatched = (index) => {
    const values = [...inputFields];
    // Compare with previousData
    const isMatched = previousData.some(
      (prevItem) =>
        prevItem.type === values[index].type &&
        prevItem.item === values[index].item &&
        prevItem.price === values[index].price &&
        prevItem.quantity === values[index].quantity
    );

    // If matched, disable the input fields
    if (isMatched) {
      return true;
    } else {
      return false;
    }
  };


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
        values[index].id = selectedService.id;
      }
    }
    if (event.target.name === "item" && values[index].type === "Inventory") {
      const selectedService = parts.find(
        (service) => service.name === event.target.value
      );
      if (selectedService) {
        values[index].price = "Rs. " + selectedService.price;
        values[index].id = selectedService.part_id;
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

    setInputFields(values);

    // Update tableData when input fields change
    setTableData(inputFields);
    // Remove the item from the selectedItems state if it is removed from the input fields
    if (!values[index].item) {
      setSelectedItems(
        selectedItems.filter((item) => item !== inputFields[index].item)
      );
    }
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
            schema: JSON.parse(window.sessionStorage.getItem("schema")),
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
  useEffect(() => {
    if (open) {
      setSelectedItems(inputFields.map((item) => item.item));
    }
  }, [open, inputFields]);

  const handleRemoveClick = (index) => {
    const values = [...inputFields];
    if (!checkMatched(index)) {
      values.splice(index, 1);
      setInputFields(values);
      const updatedDetails = ongoingServices.details.filter(
        (detail, i) => i !== index
      );
      const updatedClientData = { ...ongoingServices, details: updatedDetails };
      setOngoingServices(updatedClientData);
    }
  };

  const getAllInventory = async () => {
    try {
      const response = await fetch("http://localhost:5000/center/inventory", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          schema: JSON.parse(window.sessionStorage.getItem("schema")),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      setParts(data.data.inventory.filter((item) => item.quantity !== 0));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
            schema: JSON.parse(window.sessionStorage.getItem("schema")),
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
  const initialUserID =
    JSON.parse(window.sessionStorage.getItem("userId")) || null;
  const [UserID] = useState(initialUserID);

  useEffect(() => {
    axios
      .get("http://localhost:5000/center/profile/" + UserID)
      .then((response) => {
        const {
          username,
          email,
          phone,
          name,
          center_type,
          street_1,
          street_2,
          city,
          province,
        } = response.data.data.userData;
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

      .catch((error) => {
        console.error("Error fetching user data:", error);
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
    setAlertMessage(
      `Successfully Generated Invoice For ${getVehicleNumber()} !`
    );
    setAlertType("success");
    setOpenAlert(true);
  };

  const handleFinish = () => {
    handleSaveClick();
    handleClose();
    disableOngoingService();
    isUpdated();
    setAlertMessage(
      `Successfully Finished Service for ${getVehicleNumber()} !`
    );
    setAlertType("success");
    setOpenAlert(true);
  };

  useEffect(() => {
    getAllVehicles();
  }, []);

  return (
    <div>
      {openAlert && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={openAlert}
          autoHideDuration={3000}
          onClose={handleAlertClose}
        >
          <Alert severity={alertType}>{alertMessage}</Alert>
        </Snackbar>
      )}
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
                            onChange={(event) =>
                              handleInputChange(index, event)
                            }
                            sx={{ width: "200px", mr: "10px" }}
                            disabled={checkMatched(index)}
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
                            onChange={(event) =>
                              handleInputChange(index, event)
                            }
                            sx={{ width: "200px", mr: "10px" }}
                            disabled={checkMatched(index)}
                          >
                            {inputField.type === "Service" &&
                              serviceItems.map((item) => (
                                <MenuItem
                                  value={item.name}
                                  key={item.id}
                                  disabled={selectedItems.includes(item.name)}
                                >
                                  {item.name}
                                </MenuItem>
                              ))}

                            {inputField.type === "Inventory" &&
                              parts.map((item) => (
                                <MenuItem
                                  value={item.name}
                                  key={item.id}
                                  disabled={selectedItems.includes(item.name)}
                                >
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
                          onChange={(event) => handleInputChange(index, event)}
                          sx={{ width: "200px", mr: "10px" }}
                          disabled={checkMatched(index)}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          label="Quantity"
                          value={inputField.quantity}
                          name="quantity"
                          onChange={(event) => handleInputChange(index, event)}
                          sx={{ width: "200px", mr: "10px" }}
                          disabled={checkMatched(index)}
                        />
                      </TableCell>
                      <TableCell>{inputField.total}</TableCell>
                      <TableCell>
                        <CancelPresentationOutlinedIcon
                          variant="contained"
                          color="primary"
                          onClick={() => handleRemoveClick(index)}
                          fontSize="large"
                          sx={{ cursor: "pointer" }}
                          disabled={checkMatched(index)}
                        />
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
          <Button variant="contained" color="primary" onClick={handleSaveClick}>
            Save
          </Button>
          <Button variant="contained" color="primary" onClick={handleFinish}>
            Finish
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={generateInvoiceData}
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
