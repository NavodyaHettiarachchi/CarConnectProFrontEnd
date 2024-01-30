// import React, { useState } from 'react';
// import SearchVehicleId from './SearchVehicleId';
// import Button from '@mui/material/Button';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import { Dialog, DialogContent, Card, CardActionArea, CardContent, Typography } from '@mui/material';


// function OnGoingServiceCard() {
//   const [isSearchDialogOpen, setSearchDialogOpen] = useState(false);

//   const handleOpenSearchDialog = () => {
//     setSearchDialogOpen(true);
//   };

//   const handleCloseSearchDialog = () => {
//     setSearchDialogOpen(false);
//   };

//   return (
//     <div>
//       <Card sx={{ maxWidth: 345 }}>
//         <CardActionArea>
//           <CardContent>
//             <Typography gutterBottom variant="h5" component="div">
//               Ongoing Service
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               <Button
//                 variant="contained"
//                 color="primary"
//                 startIcon={<AddCircleOutlineIcon />}
//                 onClick={handleOpenSearchDialog}
//               >
//                 Add Service
//               </Button>
//             </Typography>
//           </CardContent>
//         </CardActionArea>
//       </Card>

//       <Dialog open={isSearchDialogOpen} onClose={handleCloseSearchDialog} maxWidth="lg" fullWidth>
//         <DialogContent>
//           <SearchVehicleId onClose={handleCloseSearchDialog} />
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// export default OnGoingServiceCard;