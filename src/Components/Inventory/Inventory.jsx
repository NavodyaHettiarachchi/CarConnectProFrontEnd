import React, { useEffect } from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Headerfile from "../../Components/Page-Header/CardHeader";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  Autocomplete,
  InputAdornment,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
} from "@mui/material";

const columns = [
  { id: "itemID", label: "Item ID", minWidth: 170 },
  { id: "itemName", label: "Item Name", minWidth: 170 },

  { id: "price", label: "Price", minWidth: 170 },
  { id: "quantity", label: "Quantity", minWidth: 170 },
  { id: "total", label: "Total", minWidth: 170 },
  { id: "actions", label: "Actions", minWidth: 170 },
];

const allowedRoles = new Set(["s:ad", "ip:ad"]);

function Inventory() {
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [name, setName] = useState();
  const [country, setCountry] = useState("");
  const [sum, setSum] = useState();
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [row, setRow] = useState("");
  const [id, setId] = useState(0);
  const [editRole, setEditRole] = useState(false);

  const countries = [
    "India",
    "United States",
    "China",
    "Japan",
    "Germany",
    "United Kingdom",
    "France",
    "South Korea",
    "Italy",
    "Canada",
    "Spain",
    "Australia",
    "Brazil",
    "Russia",
    "Mexico",
    "Indonesia",
    "Turkey",
    "Netherlands",
    "Saudi Arabia",
    "Switzerland",
    "Sweden",
    "Belgium",
    "Argentina",
    "Norway",
    "Austria",
    "United Arab Emirates",
    "Iran",
    "Thailand",
    "Poland",
    "South Africa",
    "Nigeria",
    "Colombia",
    "Israel",
    "Ireland",
    "Hong Kong",
    "Singapore",
    "Malaysia",
    "Egypt",
    "Denmark",
    "Finland",
    "Chile",
    "Pakistan",
    "Philippines",
    "Greece",
    "Portugal",
    "Iraq",
    "Kazakhstan",
    "Algeria",
    "Qatar",
    "Peru",
    "Hungary",
    "Romania",
    "New Zealand",
    "Vietnam",
    "Czech Republic",
    "Ghana",
    "Ukraine",
    "Bangladesh",
    "Kuwait",
    "Angola",
    "Ecuador",
    "Sri Lanka",
    "Croatia",
    "Belarus",
    "Oman",
    "Morocco",
    "Azerbaijan",
    "Slovakia",
    "Bulgaria",
    "Ethiopia",
    "Kenya",
    "Puerto Rico",
    "Costa Rica",
    "Uruguay",
    "Luxembourg",
    "Panama",
    "Venezuela",
    "Lebanon",
    "Tunisia",
    "Iceland",
    "Bolivia",
    "Lithuania",
    "Latvia",
    "Slovenia",
    "Estonia",
    "Serbia",
    "Libya",
    "Jordan",
    "Paraguay",
    "Cameroon",
    "Bahrain",
    "Cyprus",
    "Afghanistan",
    "Honduras",
    "Uzbekistan",
    "Ivory Coast",
    "Bosnia and Herzegovina",
    "Macedonia",
    "Albania",
    "Moldova",
    "Mauritius",
    "Georgia",
    "Nepal",
    "Armenia",
    "Mongolia",
    "Yemen",
    "Cambodia",
    "Senegal",
    "Zambia",
    "Botswana",
    "Gabon",
    "Malta",
    "Mozambique",
    "Rwanda",
    "Tanzania",
    "Benin",
    "Burkina Faso",
    "Togo",
    "Mali",
    "Zimbabwe",
    "Madagascar",
    "Mauritania",
    "Haiti",
    "Chad",
    "Niger",
    "Burundi",
    "Sierra Leone",
    "Liberia",
    "Malawi",
    "Somalia",
    "Congo",
    "Guinea",
    "Eritrea",
    "Lesotho",
    "Central African Republic",
    "South Sudan",
    "Equatorial Guinea",
    "Guinea-Bissau",
    "Swaziland",
    "Djibouti",
    "Comoros",
    "Cabo Verde",
    "Sao Tome and Principe",
    "Seychelles",
  ];

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCountry("");
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const setEditParams = () => { 
    const roles = (JSON.parse(window.sessionStorage.getItem('roles'))).split(", ");
    setEditRole(allowedRoles.has(roles.find(role => role === 'ip:ad' || role === 's:ad')));
  };

  useEffect(() => {
    setEditParams();
    fetch("http://localhost:5000/center/inventory", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        schema: JSON.parse(window.sessionStorage.getItem("schema")),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching inventory data");
        }
        return response.json();
      })
      .then((data) => setUsers(data.data.inventory))
      .catch((error) => console.error("Error fetching inventory data:", error));
  }, []);

  const calculateTotal = (price, quantity) => {
    const newTotal = price * quantity;
    return newTotal.toLocaleString({
      style: "currency",
    });
  };

  const filterUsers = () => {
    if (searchTerm === "") {
      return users;
    } else {
      return users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  };
  // Event handler for search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddClick = async () => {
    try {
      // Create a new object that contains only the properties that we want to send to the server
      const dataToSend = {
        schema: JSON.parse(window.sessionStorage.getItem("schema")),
        name: name,
        price: price,
        quantity: quantity,
        manufacture_country: country,
        description: description,
      };

      // Send the data to the server using the fetch API
      const response = await fetch(
        "http://localhost:5000/center/addInventory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      // Get the response data and update the users state
      const data = await response.json();
      setUsers([...users, { name, price, quantity, country }]);
      console.log("Data added", data);
    } catch (error) {
      console.log(error);
    }
    handleClose();
  };

  const handleRemove = (row) => {
    const partId = row.part_id;
    fetch(`http://localhost:5000/center/inventory/${partId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        schema: JSON.parse(window.sessionStorage.getItem("schema")),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error deleting data");
        }
        return response.json();
      })
      .then((data) => {
        // Update the users state to remove the deleted row

        setUsers(users.filter((user) => user.part_id !== partId));
      })

      .catch((error) => console.error("Error deleting data:", error));
  };
  const handleEdit = (row) => {
    setId(row.part_id);
    setName(row.name);
    setPrice(row.price);
    setQuantity(row.quantity);

    setDescription(row.description);
    setOpenDialog(true);
    setRow(row);
  };

  const handleEditSaveClick = async () => {
    try {
      // Create a new object that contains only the properties that we want to send to the server
      const dataToSend = {
        schema: JSON.parse(window.sessionStorage.getItem("schema")),
        name: name,
        price: price,
        quantity: quantity,

        description: description,
      };

      // Send the data to the server using the fetch API
      const response = await fetch(
        `http://localhost:5000/center/inventory/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      // Get the response data and update the users state
      const data = await response.json();
      setUsers(
        users.map((user) =>
          user.part_id === id ? { ...user, ...dataToSend } : user
        )
      );
      console.log("Data updated", data);
    } catch (error) {
      console.log(error);
    }
    handleCloseDialog();
  };

  return (
    <div class="bg-2 text-center">
      <Headerfile title="Inventory" />
      <Card style={{ height: "80vh" }}>
        <CardContent>
          <div>
            <div class="col-sm-8">
              <Grid container spacing={5}>
                <Grid item xs={5}>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search by item name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={5}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClickOpen}
                    disabled={!editRole}
                  >
                    Add Item
                  </Button>
                </Grid>
                <Grid item>
                  <TableContainer component={Paper} style={{ width: "250%" }}>
                    <Table stickyHeader size="small" aria-label="a dense table">
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (
                            <TableCell key={column.id} align={column.align}>
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filterUsers().map((row, index) => (
                          <TableRow key={index}>
                            <TableCell>{row.part_id}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>Rs. {row.price}</TableCell>

                            <TableCell>{row.quantity}</TableCell>
                            <TableCell>
                              Rs.{" "}
                              {calculateTotal(
                                parseFloat(row.price.replace("Rs. ", "")),
                                row.quantity
                              )}
                            </TableCell>
                            <TableCell>
                              <IconButton aria-label="edit" onClick={() => handleEdit(row)}>
                                <EditIcon/>
                              </IconButton>
                              <IconButton aria-label="delete" onClick={() => handleRemove(row)} disabled={!editRole}>
                                <DeleteForeverIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </div>
          </div>
        </CardContent>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <h3>
            <center>Add Item</center>
          </h3>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Item Name"
                type="text"
                fullWidth
                onChange={(event) => setName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                id="price"
                label="Price"
                type="number"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">LKR</InputAdornment>
                  ),
                }}
                onChange={(event) => setPrice(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                id="quantity"
                label="Quantity"
                type="number"
                fullWidth
                onChange={(event) => setQuantity(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                value={country}
                onChange={(event, newValue) => {
                  setCountry(newValue);
                }}
                options={countries}
                renderInput={(params) => (
                  <TextField {...params} label="Manufacture Country" />
                )}
                onSelect={(event) => setCountry(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                margin="dense"
                id="description"
                label="Description"
                type="text"
                fullWidth
                onChange={(event) => setDescription(event.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClick} color="primary" variant="contained">
            Add
          </Button>
          <Button onClick={handleClose} color="primary" variant="contained">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <h3>
            <center>Update Item</center>
          </h3>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                margin="dense"
                id="Item ID"
                label="Item ID"
                type="text"
                fullWidth
                value={id}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Item Name"
                type="text"
                fullWidth
                value={name}
                disabled={!editRole}
                onChange={(event) => setName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                id="price"
                label="Price"
                type="number"
                fullWidth
                disabled={!editRole}
                value={price}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">LKR</InputAdornment>
                  ),
                }}
                onChange={(event) => setPrice(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                id="quantity"
                label="Quantity"
                type="number"
                value={quantity}
                fullWidth
                disabled={!editRole}
                onChange={(event) => setQuantity(event.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                margin="dense"
                id="description"
                label="Description"
                type="text"
                value={description}
                fullWidth
                disabled={!editRole}
                onChange={(event) => setDescription(event.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleEditSaveClick}
            color="primary"
            variant="contained"
            disabled={!editRole}
          >
            Save
          </Button>
          <Button
            onClick={handleCloseDialog}
            color="primary"
            variant="contained"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Inventory;
