import React from 'react';
import CloseIcon from "@mui/icons-material/Close";
// import { useState } from "react";
import { Dialog, DialogTitle, IconButton, } from "@mui/material";

function AddEditRole(props) {
  // const [openAddRole, openAddRoleChange] = useState(false);
  // const openPopup = () => {
  //   openAddRoleChange(true);
  // };
  // const closeAddRolePopup = () => {
  //   openAddRoleChange(false);
  // };

  let openAddRoleChange = props.show;
  const closePopup = () => { 
    props.show = false;
    openAddRoleChange = false;
  }
  return (
    <div>
      <Dialog
        // fullScreen
        open={openAddRoleChange}
        onClose={closePopup}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          ADD ROLE {" "}
          <IconButton onClick={closePopup} style={{ float: "right" }}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>{" "}
        </DialogTitle>
      </Dialog>
    </div>
  )
}

export default AddEditRole;