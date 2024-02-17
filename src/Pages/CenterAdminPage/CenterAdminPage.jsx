import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
// import AddRole from '../../Components/CenterAdmin/AddRole'
// import { useScrollTrigger } from '@mui/material';
import AddEditRole from '../../Components/CenterAdmin/AddRole';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { TableVirtuoso } from 'react-virtuoso';


//table data
const sample = [],
      STATUES = ["Active", "Inactive"];
      for (let i = 0; i < 14; i++) {
        sample[i] = {
          Name: `Employee${i + 1}`,
          Supervisor: `Supervisor${i + 1}`,
          Designation: `Designation${i + 1} `,
          Role: `Role${i + 1}`,
          status: STATUES[Math.floor(Math.random() * STATUES.length)],
        };
      }

function createData(Name, Supervisor, Designation, Role, Status) {
  return {Name, Supervisor, Designation, Role, Status };
}

const columns = [
  {
    width: 100,
    label: 'Name',
    dataKey: 'Name',
  },
  {
    width: 380,
    label: 'Supervisor',
    dataKey: 'Supervisor',
    numeric: true,
  },
  {
    width: 245,
    label: 'Designation',
    dataKey: 'Designation',
    numeric: true,
  },
  {
    width: 230,
    label: 'Role',
    dataKey: 'Role',
    numeric: true,
  },
  {
    width: 280,
    label: 'Status',
    dataKey: 'Status',
    numeric: true,
  },
];

const rows = Array.from({ length: 200 }, (_, index) => {
  const randomSelection = sample[Math.floor(Math.random() * sample.length)];
  return createData(randomSelection.Name, randomSelection.Supervisor, randomSelection.Designation, randomSelection.Role, randomSelection.status);

});

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};








function CenterAdminPage() {

  const [openPopup, setOpenPopup] = useState(false);

  const handleOpenPopup = () => {
    setOpenPopup(true);
  };

  const handleCloseAddRolePopup = () => {
    setOpenPopup(false);
  };


  //filers methods
  const [searchName, setSearchName] = useState("")
  const [searchRole, setSearchRole] = useState("")

  const filteredRows = rows.filter(row => {
    return (
      row.Name.toLowerCase().includes(searchName.toLowerCase()) &&
      row.Role.toLowerCase().includes(searchRole.toLowerCase())
    );
  });

  return (
    <div style={{display: 'flex', justifyContent: 'space-around'}}>
      <div>
        <Card sx={{ minWidth: 370, marginRight: '20px' }}>
        <CardContent>
          <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
            <b>Roles</b>
          </Typography>
          <Grid container spacing={2}>
            <Grid sx={{ fontSize: 15 }} item xs={9}>
              Role 1
            </Grid>
            <Grid item xs={1} >
              <IconButton aria-label="edit">
                <EditOutlinedIcon></EditOutlinedIcon>
              </IconButton>
            </Grid>
            <Grid item xs={1} sx={{ marginLeft: 2 }}>
              <IconButton aria-label="delete">
                <DeleteOutlinedIcon></DeleteOutlinedIcon>
              </IconButton>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid sx={{ fontSize: 15 }} item xs={9}>
              Role 2
            </Grid>
            <Grid item xs={1} >
              <IconButton aria-label="edit">
                <EditOutlinedIcon></EditOutlinedIcon>
              </IconButton>
            </Grid>
            <Grid item xs={1} sx={{ marginLeft: 2 }}>
              <IconButton aria-label="delete">
                <DeleteOutlinedIcon></DeleteOutlinedIcon>
              </IconButton>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={1} sx={{ marginLeft: 2 }}>
                <Fab  size="small" color="palette: {primary: {
                                            main: '#29b6f6',
                                           },}" aria-label="add" 
                                           onClick={handleOpenPopup} >
                  <AddIcon />
                </Fab>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      </div>
      

      {/* employee list */}
      <Card sx={{ width: '65vw' }}>
        <CardContent>
          <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
            <b>Employees</b>
            <b>
              <TextField sx={{marginLeft:10}}
                          className="TextField"
                          id="standard-basic"
                          variant="standard"
                          label="Search by Name"
                          value={searchName}
                          onChange={(e) => setSearchName(e.target.value)}            
               />
              <TextField sx={{marginLeft:5}}
                          className="TextField"
                          id="standard-basic"
                          variant="standard"
                          label="Search by Role"
                          value={searchRole}
                          onChange={(e) => setSearchRole(e.target.value)}
              />
          </b>
          </Typography>
          <Grid container spacing={2}>
            {/* employee table */}
            <TableHead style={{width: '65vw', marginTop: '3%', marginLeft: '1%', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.dataKey}
                    variant="head"
                    align={column.numeric || false ? 'right' : 'center'}
                    style={{ width: column.width }}
                    sx={{
                      backgroundColor: '#4685E1',fontWeight: 'bold',
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>  
              <Paper style={{ height: 620, width: '100%', marginLeft: '1%'  }}>
                  <TableVirtuoso
                    data={filteredRows}
                    components={VirtuosoTableComponents}
                    CenterAdminPage={CenterAdminPage}
                    itemContent={rowContent}
                  />
                </Paper>
          </Grid>
        </CardContent>
      </Card>  


      <AddEditRole open={openPopup} handleClose={handleCloseAddRolePopup} />
    </div>
  )
}

function rowContent(_index, row) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric || false ? 'right' : 'left'}
        >
          {row[column.dataKey]}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

export default CenterAdminPage;