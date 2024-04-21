import React, { useState, useEffect } from "react";
import DashAccordion from "../../Components/ServiceHome/DashAccordion";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import "../../Components/ServiceHome/Dashboard.css";
import StorefrontIcon from "@mui/icons-material/Storefront";
import VBarChart from "../../Components/ServiceHome/VBarChart";
import Headerfile from "../../Components/Page-Header/CardHeader";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonIcon from '@mui/icons-material/Person';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import CarRepairIcon from '@mui/icons-material/CarRepair';

function ServiceHome() {
  const [finishedServices, setFinishedServices] = useState([]);
  const [ongoingServices, setOngoingServices] = useState([]);
  const [clients, setClients] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/center/finishedServices", {
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
          throw new Error("Error fetching Finished Service data");
        }
        return response.json();
      })
      .then((data) => {
        setFinishedServices(data.data.fs);
      })

      .catch((error) =>
        console.error("Error fetching Finished Service data:", error)
      );
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/center/onGoingServices", {
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
          throw new Error("Error fetching Finished Service data");
        }
        return response.json();
      })
      .then((data) => {
        setOngoingServices(data.data.ogs);
      })

      .catch((error) =>
        console.error("Error fetching Finished Service data:", error)
      );
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/center/getclients", {
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
          throw new Error("Error fetching Finished Service data");
        }
        return response.json();
      })
      .then((data) => {
        setClients(data.data.clients);
      })

      .catch((error) =>
        console.error("Error fetching Finished Service data:", error)
      );
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/center/getemployee", {
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
          throw new Error("Error fetching Finished Service data");
        }
        return response.json();
      })
      .then((data) => {
        setEmployees(data.data.empData);
      })

      .catch((error) =>
        console.error("Error fetching Finished Service data:", error)
      );
  }, []);

  let filterServices = finishedServices.filter((service) => {
    let serviceDate = new Date(service.service_date); // assuming the date is stored in the 'date' property
    let currentDate = new Date();
    let diffInTime = currentDate.getTime() - serviceDate.getTime();
    let diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
    return diffInDays <= 30;
  });

  let filterServicesTotalCosts = 0;

  if (Array.isArray(filterServices) && filterServices.length > 0) {
    filterServicesTotalCosts = filterServices.reduce((acc, service) => {
      // Assuming that the cost of a service is stored in the 'cost' property
      const cost = Number(service.cost);
      return isNaN(cost) ? acc : acc + cost;
    }, 0);
  }

  return (
    <div>
      <Headerfile />
      <Box sx={{ display: "flex" }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Stack direction="row" spacing={2}>
                <Card
                  className="gradient"
                  sx={{ width: "50%", height: "100%" }}
                >
                  <div className="iconstylewhite">
                    <AttachMoneyIcon />
                  </div>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ color: "#f0fcfc" }}
                    >
                      {/* Rs. <CountUp delay={0.2} end={500} duration={0.3} /> */}
                      Rs. {filterServicesTotalCosts.toLocaleString()}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ color: "#ccd1d1" }}
                    >
                      Total Earning This Month
                    </Typography>
                  </CardContent>
                </Card>
                <Grid item xs={12} md={6}>
                  <Stack spacing={2}>
                    <Card className="gradientlight" sx={{ width: "100%" }}>
                      <Stack spacing={2} direction="row">
                        <div className="iconstylewhite">
                          <PersonIcon />
                        </div>
                        <div className="paddingall">
                          <span className="pricetitle fontwhite">
                            {clients.length}
                          </span>
                          <br />
                          <span className="pricesubtitle fontlightgrey">
                            No. of Clients
                          </span>
                        </div>
                      </Stack>
                    </Card>

                    <Card className="gradientlight" sx={{ width: "100%" }}>
                      <Stack spacing={2} direction="row">
                        <div className="iconstylewhite">
                          <StorefrontIcon />
                        </div>
                        <div className="paddingall">
                          <span className="pricetitle fontwhite">
                            {employees.length}
                          </span>
                          <br />
                          <span className="pricesubtitle fontlightgrey">
                            No. of Employees
                          </span>
                        </div>
                      </Stack>
                    </Card>
                  </Stack>
                </Grid>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack spacing={2}>
                <Card className="gradientlight" sx={{ width: "100%" }}>
                  <Stack spacing={2} direction="row">
                    <div className="iconstylewhite">
                      <WarehouseIcon />
                    </div>
                    <div className="paddingall">
                      <span className="pricetitle fontwhite">
                        {finishedServices.length}
                      </span>
                      <br />
                      <span className="pricesubtitle fontlightgrey">
                        Total Services Done
                      </span>
                    </div>
                  </Stack>
                </Card>
                <Card className="gradientlight" sx={{ width: "100%" }}>
                  <Stack spacing={2} direction="row">
                    <div className="iconstylewhite">
                      <CarRepairIcon />
                    </div>
                    <div className="paddingall">
                      <span className="pricetitle fontwhite">
                        {ongoingServices.length}
                      </span>
                      <br />
                      <span className="pricesubtitle fontlightgrey">
                        Ongoing Services
                      </span>
                    </div>
                  </Stack>
                </Card>
              </Stack>
            </Grid>
          </Grid>

          <Box height={20} />

          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Card sx={{ height: "60vh", width: "100%" }}>
                <CardContent>
                  <VBarChart />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card sx={{ height: "60vh", width: "100%" }}>
                <CardContent>
                  <div className="paddingall">
                    <span className="pricetitle">Latest Services Details</span>
                  </div>
                  <Box height={10} />
                  <DashAccordion />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}
export default ServiceHome;
