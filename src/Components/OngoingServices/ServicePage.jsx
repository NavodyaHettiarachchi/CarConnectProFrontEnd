// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   TextField,
//   Dialog,
//   DialogContent,
//   DialogActions,
//   Grid,
//   DialogTitle,
//   Typography,
//   Autocomplete,
// } from "@mui/material";
// import VehicleCard from "./VehicleCard";
// import { vehiData } from "./vehiData";
// import AddButtonCard from "./AddButtonCard";
// import CloseIcon from "@mui/icons-material/Close";

// const VehicleAutocomplete = ({ filterData }) => {
//   const options = vehiData.map((vehicle) => ({
//     id: vehicle.id,
//     number: vehicle.number,
//     image: vehicle.image,
//   }));

//   return (
//     <Autocomplete
//       disablePortal
//       id="combo-box-demo"
//       options={options}
//       sx={{ width: 300 }}
//       onChange={(event, value) => filterData(value)}
//       getOptionLabel={(option) => option.number || ""}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           size="small"
//           label="Search Vehicles"
//           InputProps={{ ...params.InputProps, type: "search" }}
//         />
//       )}
//     />
//   );
// };

// const ServicePage = () => {
//   const [vehicles, setVehicles] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [fullWidth, setFullWidth] = React.useState(true);
//   const [maxWidth, setMaxWidth] = React.useState("sm");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [VehicleData, setVehicle] = useState([]);

//   const handleMaxWidthChange = (event) => {
//     setMaxWidth(event.target.value);
//   };

//   const handleFullWidthChange = (event) => {
//     setFullWidth(event.target.checked);
//   };

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const filterData = (selectedVehicle) => {
//     if (selectedVehicle) {
//       const newCard = (
//         <Grid item key={selectedVehicle.id}>
//           <VehicleCard
//             number={selectedVehicle.number}
//             image={selectedVehicle.image}
//           />
//         </Grid>
//       );

//       setVehicles((prevVehicles) => [...prevVehicles, newCard]);
//       handleClose();
//     }
//   };

//   return (
//     <>
//       <Grid>
//         <TextField
//           type="search"
//           size="small"
//           label="Search Vehicles"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           sx={{ ml: 2 }}
//         />
//       </Grid>
//       <Grid container spacing={1} direction="row" style={{ margin: "8px" }}>
//         <Grid item style={{ display: "flex" }}>
//           <AddButtonCard onAdd={handleClickOpen} />
//         </Grid>
//         {vehicles
//           .filter((vehicle) =>
//             (vehicle.props?.number ?? "")
//               .toLowerCase()
//               .includes(searchTerm.toLowerCase())
//           )
//           .map((vehicle) => vehicle)}
//       </Grid>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         fullWidth={fullWidth}
//         maxWidth={maxWidth}
//       >
//         <DialogTitle>Add Vehicle</DialogTitle>
//         <DialogContent>
//           <VehicleAutocomplete filterData={filterData} />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} variant="contained" color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default ServicePage;
// // import React, { useState, useEffect } from "react";

// // const VehicleTable = ({ vehicleData }) => {
// //   return (
// //     <table>
// //       <thead>
// //         <tr>
// //           <th>ID</th>
// //           <th>Vehicle ID</th>
// //           <th>Registration Date</th>
// //           <th>Mileage on Registration</th>
// //           <th>Owner</th>
// //         </tr>
// //       </thead>
// //       <tbody>
// //         {vehicleData.map((vehicle) => (
// //           <tr key={vehicle.id}>
// //             <td>{vehicle.id}</td>
// //             <td>{vehicle.vehicle_id}</td>
// //             <td>{vehicle.date_of_reg}</td>
// //             <td>{vehicle.mileage_on_reg}</td>
// //             <td>{vehicle.owner}</td>
// //           </tr>
// //         ))}
// //       </tbody>
// //     </table>
// //   );
// // };

// // const ServicePage = () => {
// //   const [vehicleData, setVehicleData] = useState([]);

// //   useEffect(() => {
// //     fetch("http://localhost:5000/center/getClients", {
// //       method: "POST",
// //       headers: {
// //         "Content-type": "application/json",
// //       },
// //       body: JSON.stringify({
// //         schema: "service_pqr_service_center",
// //         fields: ["id", "vehicle_id", "date_of_reg", "mileage_on_reg", "owner"],
// //       }),
// //     })
// //       .then((res) => {
// //         if (!res.ok) {
// //           throw new Error("Failed to fetch data");
// //         }
// //         return res.json();
// //       })
// //       .then((data) => {
// //         if (!data || !data.data || !data.data.vehicles) {
// //           throw new Error("Failed to fetch data");
// //         }
// //         const vehicleDataWithIds = data.data.vehicles.map((vehicle, index) => ({
// //           ...vehicle,
// //           id: `vehicle-${index}`,
// //         }));
// //         setVehicleData(vehicleDataWithIds);
// //       })
// //       .catch((error) => {
// //         console.error("Error fetching data:", error);
// //       });
// //   }, []);

// //   return (
// //     <div className="App">
// //       <h1>Vehicle Data</h1>
// //       {vehicleData && <VehicleTable vehicleData={vehicleData} />}
// //     </div>
// //   );
// // };

// // export default ServicePage;

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

const columns = [
  { id: "type", label: "Type", minWidth: 170 },
  { id: "item", label: "Item", minWidth: 170 },
  { id: "price", label: "Price", minWidth: 170 },
  { id: "quantity", label: "Quantity", minWidth: 170 },
  { id: "total", label: "Total", minWidth: 170 },
];

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
            schema: "service_pqr_service_center",
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
              schema: "service_pqr_service_center",

              client_id: selectedVehicle.client_id,

              service_date: new Date().toISOString().split("T")[0],
              description: "Full Service",
              mileage: milage,
              cost: calculateTotalCost(tableData),
              details: JSON.stringify(tableData),
              technician_ids: [8, 13],
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
          // schema: window.sessionStorage.getItem('schema'),
          schema: "service_pqr_service_center",
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
            // schema: window.sessionStorage.getItem('schema'),
            schema: "service_pqr_service_center",
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
  useEffect(() => {
    const intervalId = setInterval(() => {
      getAllOngoingServices();
    }, 5000); // Call getAllOngoingServices every 10 seconds

    return () => {
      clearInterval(intervalId);
    };
  }, []);

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
          <AddButtonCard onAdd={handleClickOpen} />
          {allOngoingServices.map((item) => (
            <Grid item key={item.client_id}>
              <VehicleCard
                //image={item.image}
                //  model={item.model}
                // fuel={item.fuel}
                // milage={item.milage}
                clientId={item.client_id}
                selected
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
              <Grid item xs={6}>
                <Typography variant="h6">
                  Vehicle No: {selectedVehicle ? selectedVehicle.number : ""}
                </Typography>
                <Grid item>
                  <VehicleAutocomplete
                    filterData={filterData}
                    vehiData={vehiData}
                  />
                </Grid>
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
                  onChange={(event) => setMilage(event.target.value)}
                  sx={{ width: "200px", mr: "10px" }}
                  type="number"
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
                          onChange={(event) => handleInputChange(index, event)}
                          sx={{ width: "200px", mr: "10px" }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          label="Quantity"
                          value={inputField.quantity}
                          name="quantity"
                          onChange={(event) => handleInputChange(index, event)}
                          sx={{ width: "200px", mr: "10px" }}
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
          <Button
            // onClick={handleFinishServiceClick}
            variant="contained"
            color="primary"
          >
            Finish Service
          </Button>

          <Button onClick={handleClose} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ServicePage;
