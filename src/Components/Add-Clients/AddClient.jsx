import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Stack,
  TextField,
  RadioGroup,
  Radio,
  FormLabel,
  FormControl,
} from "@mui/material";
import FormControlContext from "@mui/material/FormControl/FormControlContext";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const AddClient = () => {
  const [open, openchange] = useState(false);
  const functionopenpopup = () => {
    openchange(true);
  };
  const closepopup = () => {
    openchange(false);
  };
  return (
    <div style={{ textAlign: "center" }}>
      <h1>ADD CLIENT</h1>
      <Button onClick={functionopenpopup} color="primary" variant="contained">
        Open Popup
      </Button>
      <Dialog
        // fullScreen
        open={open}
        onClose={closepopup}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          ADD CLIENT{" "}
          <IconButton onClick={closepopup} style={{ float: "right" }}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>{" "}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>Do you want remove this user?</DialogContentText> */}
          <Stack spacing={2} margin={2}>
            <TextField variant="outlined" label="ID Number"></TextField>
            <TextField variant="outlined" label="Nick Name"></TextField>
            <TextField variant="outlined" label="Full Name"></TextField>
            <TextField variant="outlined" label="Address"></TextField>
            <TextField variant="outlined" label="Email"></TextField>
            <TextField variant="outlined" label="Phone"></TextField>

            <FormControl>
              <FormLabel id="gender">Gender</FormLabel>
              <RadioGroup
                row
                aria-labelledby="gender"
                defaultValue="male"
                name="gender"
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>

            <FormControlLabel
              control={<Checkbox defaultChecked color="primary"></Checkbox>}
              label="Agree terms & conditions"
            ></FormControlLabel>
            <Button color="primary" variant="contained">
              Submit
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          {/* <Button color="success" variant="contained">Yes</Button>
                    <Button onClick={closepopup} color="error" variant="contained">Close</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddClient;
