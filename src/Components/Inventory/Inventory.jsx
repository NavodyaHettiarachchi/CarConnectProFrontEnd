import React, { useEffect } from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Headerfile from "../../Components/Page-Header/CardHeader";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
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
} from "@mui/material";

const columns = [
  { id: "name", label: "Item Name", minWidth: 170 },

  { id: "price", label: "Price", minWidth: 170 },
  { id: "quantity", label: "Quantity", minWidth: 170 },
  { id: "actions", label: "Actions", minWidth: 170 },
];
function Inventory() {
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [inventory, setInventory] = useState([]);
  const [name, setName] = useState();
  const [country, setCountry] = useState("");
  const [sum, setSum] = useState();
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [row, setRow] = useState("");
  const [id, setId] = useState(0);
  const [countries, setCountries] = useState([]);
  const [editRole, setEditRole] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(response.data.map((country) => country.name.common));
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

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
    const roles = JSON.parse(window.sessionStorage.getItem("roles")).split(
      ", "
    );
    setEditRole(
      allowedRoles.has(
        roles.find((role) => role === "ip:ad" || role === "s:ad")
      )
    );
  };

  useEffect(() => {
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
      .then((data) => setInventory(data.data.inventory))
      .catch((error) => console.error("Error fetching inventory data:", error));
  }, [isUpdated]);

  const calculateTotal = (price, quantity) => {
    const newTotal = price * quantity;
    return newTotal.toLocaleString({
      style: "currency",
    });
  };

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
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
      await fetch("http://localhost:5000/center/addInventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      setIsUpdated(!isUpdated);
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
        setIsUpdated(!isUpdated);
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
      await fetch(`http://localhost:5000/center/inventory/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      setIsUpdated(!isUpdated);
    } catch (error) {
      console.log(error);
    }
    handleCloseDialog();
  };

  return (
    <div class="bg-2 text-center">
      <Headerfile title="Inventory" />
      <Card style={{ height: "80vh", boxShadow: "none" }}>
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
                  >
                    Add Item
                  </Button>
                </Grid>
              </Grid>
            </div>
            <div style={{ overflowX: "auto", position: "relative" }}>
              <TableContainer
                component={Paper}
                sx={{ height: "72vh", minWidth: "1600px", marginTop: "1%" }}
                style={{ overflowX: "auto" }}
              >
                <Table stickyHeader size="small">
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
                    {filteredInventory.map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                        >
                          {columns.map((col) => {
                            const value = row[col.id];
                            return col.id === "price" ? (
                              <TableCell>
                                Rs.{" "}
                                {calculateTotal(
                                  parseFloat(row.price.replace("Rs. ", "")),
                                  row.quantity
                                )}
                              </TableCell>
                            ) : col.id === "actions" ? (
                              <TableCell>
                                <IconButton
                                  aria-label="edit"
                                  onClick={() => handleEdit(row)}
                                >
                                  <EditIcon />
                                </IconButton>
                                <IconButton
                                  aria-label="delete"
                                  onClick={() => handleRemove(row)}
                                  disabled={!editRole}
                                >
                                  <DeleteForeverIcon />
                                </IconButton>
                              </TableCell>
                            ) : (
                              <TableCell>{value}</TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
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
                id="combo-box-demo"
                value={country}
                onChange={(event, newValue) => {
                  setCountry(newValue);
                }}
                options={countries}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Manufacture Country"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                  />
                )}
                // onSelect={(event) => setCountry(event.target.value)}
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
                id="name"
                label="Item Name"
                type="text"
                fullWidth
                value={name}
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
