import React from "react";
import Headerfile from "../../Components/Page-Header/CardHeader";
import ServicePage from "../../Components/OngoingServices/ServicePage";

function OnGoingServicesNew() {
  return (
    <div style={{ height: 630 }}>
      <Headerfile title="On going Services" />
      <ServicePage />
    </div>
  );
}
export default OnGoingServicesNew;