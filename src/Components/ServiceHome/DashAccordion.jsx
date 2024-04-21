import * as React from "react";
import { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function DashAccordion() {
  const [services, setServices] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [combinedData, setCombinedData] = useState([]);

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
        setServices(data.data.fs);
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
        setVehicles(data.data.clients);
      })

      .catch((error) =>
        console.error("Error fetching Finished Service data:", error)
      );
  }, []);
  useEffect(() => {
    const combined = services.map((service) => {
      const vehicle = vehicles.find((v) => v.id === service.client_id);
      return { ...service, vehicle };
    });
    setCombinedData(combined);
  }, [services, vehicles]);

  return (
    <div>
      {combinedData.map((item, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{item.vehicle?.number_plate}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Service Date: {item.service_date}</Typography>
            <Typography>Description: {item.description}</Typography>
            <Typography>Cost: {item.cost}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
