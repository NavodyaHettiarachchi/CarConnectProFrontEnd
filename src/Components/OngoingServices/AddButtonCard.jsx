import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import IconButton from '@mui/material/IconButton';

const AddButtonCard = ({ onAdd, editRole }) => {

  const handleAdd = () => { 
    if (editRole) { 
      onAdd();
    }
  }


  return (
    <Card
      sx={{
        width: "360px",
        height: "200px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid #ccc",
        cursor: "pointer",
      }}
      onClick={handleAdd}
    >
      <CardContent>
        <IconButton aira-label="add" disabeld={!editRole} >
          <AddIcon sx={{ fontSize: "80px", color: "#007BFF" }} />
        </IconButton>
        <Typography variant="h6" align="center" sx={{ mt: 2 }}>
          Add New
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AddButtonCard;