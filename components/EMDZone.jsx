import { Polyline } from "@react-google-maps/api";
import React from "react";

export const EMDZone = ({ elevationPath }) => {
  const path = elevationPath.map((elem) => {
    return {
      lat: elem.location.lat(),
      lng: elem.location.lng(),
    };
  });

  const options = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    paths: path,
    zIndex: 1,
  };
  return (
    <React.Fragment>
      <Polyline path={path} options={options} />
    </React.Fragment>
  );
};
