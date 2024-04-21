import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  Grid,
  DialogTitle,
  Typography,
  Autocomplete,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Icon,
} from "@mui/material";
import VehicleCard from "./VehicleCard";

import AddButtonCard from "./AddButtonCard.jsx";
import CancelPresentationOutlinedIcon from "@mui/icons-material/CancelPresentationOutlined";
import PdfInvoice from "../PDFInvoice/PdfInvoice";
import IconButton from '@mui/material/IconButton';

const columns = [
  { id: "type", label: "Type", minWidth: 170 },
  { id: "item", label: "Item", minWidth: 170 },
  { id: "price", label: "Price", minWidth: 170 },
  { id: "quantity", label: "Quantity", minWidth: 170 },
  { id: "total", label: "Total", minWidth: 170 },
];

const allowedRoles = new Set(["os:ad", "s:ad"]);

const ServicePage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [vehiData, setVehiData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [data, setData] = useState([]);
  const [serviceItems, setServiceItems] = useState([]);
  const [editRole, setEditRole] = useState(false);

  const [inputFields, setInputFields] = useState([
    { type: "", item: "", price: "", quantity: "1", total: "" },
  ]);
  const [fullAmount, setFullAmount] = useState(0);
  const [fulllWidth, setFulllWidth] = React.useState(true);
  const [maxxWidth, setMaxxWidth] = React.useState("xl");
  const [allOngoingServices, setAllOngoinngServices] = useState([]);
  const [milage, setMilage] = useState(
    selectedVehicle ? selectedVehicle.milage : ""
  );
  const [invoiceData, setInvoiceData] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);
  const handleMaxxWidthChange = (event) => {
    setMaxxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value
    );
  };

  const handleFulllWidthChange = (event) => {
    setFulllWidth(event.target.checked);
  };

  const VehicleAutocomplete = ({ filterData, vehiData }) => {
    const options = vehiData.map((vehicle) => ({
      client_id: vehicle.id,
      vehicle_id: vehicle.vehicle_id,
      number: vehicle.number_plate,
      model: vehicle.model,
      fuel: vehicle.fuel_type,
      milage: vehicle.mileage_on_reg,
      // image: vehicle.image,
    }));

    return !selectedVehicle ? (
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={options}
        sx={{ width: 300 }}
        value={selectedVehicle}
        onChange={(event, value) => filterData(value)}
        getOptionLabel={(option) => option.number || ""}
        disabled={!editRole}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            label="Search Vehicles"
            InputProps={{ ...params.InputProps, type: "search" }}
          />
        )}
      />
    ) : null;
  };
  const filterData = (selectedVehicle) => {
    if (selectedVehicle) {
      setSelectedVehicle(selectedVehicle);
    }
  };

  const getAllOngoingServices = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/center/onGoingServices",
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

      const data = await response.json();
      setAllOngoinngServices(data.data.ogs);

      // Handle successful response here
    } catch (error) {
      console.log(error);

      // Handle error here
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
    getAllServices();
    getAllVehicles();
    setSelectedVehicle(null);
    getAllEmployees();
    setInputFields([
      { type: "", item: "", price: "", quantity: "1", total: "" },
    ]);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveClick = async () => {
    if (selectedVehicle) {
      const newCard = (
        <Grid item key={selectedVehicle.vehicle_id}>
          <VehicleCard
            vehicle_id={selectedVehicle.vehicle_id}
            number={selectedVehicle.number}
            // image={selectedVehicle.image}
            model={selectedVehicle.model}
            fuel={selectedVehicle.fuel}
            milage={milage}
            clientId={selectedVehicle.client_id}
          />
        </Grid>
      );
      try {
        const response = await fetch(
          "http://localhost:5000/center/addOnGoingServices",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              schema: JSON.parse(window.sessionStorage.getItem('schema')),
              client_id: selectedVehicle.client_id,
              service_date: new Date().toISOString().split("T")[0],
              description: "Full Service",
              mileage: milage,
              cost: calculateTotalCost(inputFields),
              details: JSON.stringify(inputFields),
              technician_ids: [selectedEmployee ? selectedEmployee.id : ""],
              isOngoing: true,
            }),
          }
        );

        const data = await response.json();
        console.log("added ongoing Service", data);

        // Handle successful response here
      } catch (error) {
        console.log(error);

        // Handle error here
      }
      setVehicles((prevVehicles) => [...prevVehicles, newCard]);
      handleClose();
      setMilage("");
      setSelectedEmployee(null);
    }
  };
  useEffect(() => {
    // Calculate the full amount
    const totalAmount = inputFields.reduce((acc, curr) => {
      const total = parseFloat(curr.total.replace("Rs. ", ""));
      return isNaN(total) ? acc : acc + total;
    }, 0);

    setFullAmount(totalAmount);
  }, [inputFields]);

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

  const InventoryItems = [
    { id: 1, name: "Inventory 1" },
    { id: 2, name: "Inventory 2" },
    { id: 3, name: "Inventory 3" },
  ];
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
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    if (event.target.name === "item" && values[index].type === "Service") {
      const selectedService = serviceItems.find(
        (service) => service.name === event.target.value
      );
      if (selectedService) {
        values[index].price = "Rs. " + selectedService.cost;
      }
    }
    if (values[index].price && values[index].quantity) {
      const price = parseFloat(values[index].price.replace("Rs. ", ""));
      const quantity = parseFloat(values[index].quantity);
      if (!isNaN(price) && !isNaN(quantity)) {
        values[index].total = "Rs. " + (price * quantity).toFixed(2);
      } else {
        values[index].total = "";
      }
    } else {
      values[index].total = "";
    }
    setInputFields(values);

    // Update tableData when input fields change
    setTableData(inputFields);
  };

  // A helper function to calculate the total cost of tableData
  const calculateTotalCost = (inputFields) => {
    return inputFields.reduce((acc, curr) => {
      const price = parseFloat(curr.price.replace("Rs. ", ""));
      const quantity = parseFloat(curr.quantity);
      return isNaN(price) || isNaN(quantity) ? acc : acc + price * quantity;
    }, 0);
  };

  const setEditParams = () => { 
    const roles = (JSON.parse(window.sessionStorage.getItem('roles'))).split(", ");
    setEditRole(allowedRoles.has(roles.find(role => role === 'os:ad' || role === 's:ad')));
  }

  useEffect(() => {
    setEditParams();
    getAllOngoingServices();
  }, []);

  //pdfInvoice genaration
  //collect final values

  const generateInvoiceData = () => {
    const vehicle_id = vehicle_id;
    const fuel_type = selectedVehicle.fuel;
    const model = model;
    const mileage = milage;
    const selectedItems = inputFields.map((item) => ({
      Type: item.type,
      Item: item.item,
      Price: parseFloat(item.price),
      Quantity: parseFloat(item.quantity),
      Total: parseFloat(item.total),
    }));
    const full_Amount = fullAmount;

    setInvoiceData({
      vehicle_id,
      fuel_type,
      model,
      mileage,
      selectedItems,
      full_Amount,
    });
  };

  const handleGenerateInvoice = () => {
    generateInvoiceData();
    console.log("in handle genarate invoiceData", invoiceData);
  };
  const getAllEmployees = async () => {
    try {
      const response = await fetch("http://localhost:5000/center/getemployee", {
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
      setEmployees(data.data.empData);
      console.log("emp", data.data.empData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const EmployeeAutocomplete = ({ filterData, employees }) => {
    const options = employees.map((employee) => ({
      id: employee.id,
      name: employee.name,
    }));
    return (
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={options}
        sx={{ width: 300 }}
        value={selectedEmployee}
        onChange={(event, value) => filterData(value)}
        getOptionLabel={(option) => option.name || ""}
        disabled={!editRole}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            label="Search Employees"
            InputProps={{ ...params.InputProps, type: "search" }}
          />
        )}
      />
    );
  };

  const filterEmployeeData = (selectedEmployee) => {
    if (selectedEmployee) {
      setSelectedEmployee(selectedEmployee);
    }
  };
  return (
    <>
      <Grid>
        <TextField
          type="search"
          size="small"
          label="Search Vehicles"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ ml: 2 }}
        />
      </Grid>

      <Grid container spacing={1} direction="row" style={{ margin: "8px" }}>
        <Grid item style={{ display: "flex" }}>
          <AddButtonCard onAdd={handleClickOpen} editRole={editRole} />
          {allOngoingServices.map((item) => (
            <Grid item key={item.client_id}>
              <VehicleCard
                clientId={item.client_id}
                selected
                editRole={editRole}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={fulllWidth}
        maxWidth={maxxWidth}
      >
        <DialogTitle>
          <h3>
            <center> Service Details</center>
          </h3>

          <Grid container>
            <Grid item container>
              <Grid item xs={1}>
                <Typography variant="h6">
                  Vehicle No: {selectedVehicle ? selectedVehicle.number : ""}
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <VehicleAutocomplete
                  filterData={filterData}
                  vehiData={vehiData}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">
                  Model: {selectedVehicle ? selectedVehicle.model : ""}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item xs={6}>
                <Typography variant="h6">
                  Fuel Type: {selectedVehicle ? selectedVehicle.fuel : ""}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                Mileage:{" "}
                <TextField
                  value={milage}
                  name="Mileage"
                  disabled={!editRole}
                  onChange={(event) => setMilage(event.target.value)}
                  sx={{ width: "200px", mr: "10px" }}
                  type="number"
                />
              </Grid>
              <Grid item xs={1}>
                <Typography variant="h6">Employee:</Typography>
              </Grid>
              <Grid item>
                <EmployeeAutocomplete
                  filterData={filterEmployeeData}
                  employees={employees}
                />
              </Grid>
            </Grid>
          </Grid>
        </DialogTitle>

        <DialogContent>
          <div>
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
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
                        <IconButton aira-label="remove" onClick={() => handleRemoveClick(index)} disabled={!editRole}>
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
          <Button variant="contained" color="primary" onClick={handleSaveClick} disabled={!editRole}>
            Save
          </Button>
          {/* <Button
            // onClick={handleFinishServiceClick}
            variant="contained"
            color="primary"
          >
            Finish Service
          </Button> */}
          {/* <Button
            variant="contained"
            color="secondary"
            onClick={handleGenerateInvoice}
          >
            Genarate Invoice
          </Button> */}

          <Button onClick={handleClose} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
        {invoiceData && <PdfInvoice invoiceData={invoiceData} />}
      </Dialog>
    </>
  );
};

export default ServicePage;
