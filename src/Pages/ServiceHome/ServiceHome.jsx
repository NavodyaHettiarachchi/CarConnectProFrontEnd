import React from "react";
import DashAccordion from "../../Components/ServiceHome/DashAccordion";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import "../../Components/ServiceHome/Dashboard.css";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import VBarChart from "../../Components/ServiceHome/VBarChart";
import CountUp from "react-countup";

export default function Home() {
  return (
    <div>
      
      
      <Box sx={{ display: "flex" }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Stack direction="row" spacing={2}>
                <Card
                  className="gradient"
                  sx={{ width: "100%", height: "100%" }}
                >
                  <div className="iconstylewhite">
                    <CreditCardIcon />
                  </div>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ color: "#f0fcfc" }}
                    >
                      $<CountUp delay={0.2} end={500} duration={0.3} />
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ color: "#ccd1d1" }}
                    >
                      Total Earning
                    </Typography>
                  </CardContent>
                </Card>
                <Card
                  className="gradientlight"
                  sx={{ width: "100%", height: "100%" }}
                >
                  <div className="iconstylewhite">
                    <ShoppingBagIcon />
                  </div>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ color: "#f0fcfc" }}
                    >
                      $<CountUp delay={0.2} end={900} duration={0.4} />
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ color: "#ccd1d1" }}
                    >
                      Total Order
                    </Typography>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack spacing={2}>
                <Card className="gradientlight" sx={{ width: "100%" }}>
                  <Stack spacing={2} direction="row">
                    <div className="iconstylewhite">
                      <StorefrontIcon />
                    </div>
                    <div className="paddingall">
                      <span className="pricetitle fontwhite">$203k</span>
                      <br />
                      <span className="pricesubtitle fontlightgrey">
                        Total Income
                      </span>
                    </div>
                  </Stack>
                </Card>
                <Card sx={{ width: "100%" }}>
                  <Stack spacing={2} direction="row">
                    <div className="iconstyle">
                      <StorefrontIcon />
                    </div>
                    <div className="paddingall">
                      <span className="pricetitle">$203k</span>
                      <br />
                      <span className="pricesubtitle">Total Income</span>
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
                    <span className="pricetitle">Popular Products</span>
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
