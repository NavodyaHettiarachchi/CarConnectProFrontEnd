import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AddButtonCard = ({ onAdd }) => {
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
      onClick={onAdd}
    >
      <CardContent>
        <AddIcon sx={{ fontSize: "80px", color: "#007BFF" }} />
        <Typography variant="h6" align="center" sx={{ mt: 2 }}>
          Add New
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AddButtonCard;