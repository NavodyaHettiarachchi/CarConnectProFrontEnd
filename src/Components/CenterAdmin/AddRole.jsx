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

  // let openAddRoleChanges = props.show;
  // const closePopup = () => { 
  //   props.show = false;
  //   openAddRoleChange = false;
  // }

  const { setOpenPopup, handleClose } = props;

  return (
    <div>
      <Dialog
        // fullScreen
        Open={setOpenPopup}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          ADD ROLE {" "}
          <IconButton onClick={handleClose} style={{ float: "right" }}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>{" "}
        </DialogTitle>
      </Dialog>
    </div>
  )
}

export default AddEditRole;