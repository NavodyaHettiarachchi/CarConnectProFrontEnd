import * as React from "react";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";

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
    
    setCombinedData(combined.sort((a, b) => new Date(b.service_date) - new Date(a.service_date)));

    console.log(combinedData);
  }, [services, vehicles]);

  return (
    <div>
      {combinedData.map((item) => (
        <Typography>
          { item.vehicle?.number_plate + ':    ' + item.service_date.split('T')[0] + '   -   ' + item.description + '   -   ' + item.cost }
        </Typography>
      ))}
    </div>
  );
}
