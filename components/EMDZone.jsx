import { Circle, Polyline } from "@react-google-maps/api";
import React from "react";
import { geoToRectCoord } from "../modules/geoToRectCoord";
import { sk42ToWGS84 } from "../modules/sk42ToWGS84";

export const EMDZone = ({ elevationPath, centerEMDZone }) => {
  const path = elevationPath.map((elem) => {
    return {
      lat: elem.location.lat(),
      lng: elem.location.lng(),
      elevation: elem.elevation,
    };
  });

  const center = {
    lat: parseFloat(
      `${typeof centerEMDZone.lat != "undefined" ? centerEMDZone.lat : 0}`
    ),
    lng: parseFloat(
      `${typeof centerEMDZone.lng != "undefined" ? centerEMDZone.lng : 0}`
    ),
  };

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

  const r = options.radius;

  const centerPoint = geoToRectCoord(center.lng, center.lat);

  let pathCirc = [];
  const getCirclePath = () => {
    for (let i = 0; i < 360; i++) {
      const x = r * Math.cos(2 * Math.PI * (i / 360)) + centerPoint.X_lngSk42;
      const y = r * Math.sin(2 * Math.PI * (i / 360)) + centerPoint.Y_latSk42;
      pathCirc[i] = { lat: y, lng: x };
    }
    // console.log(pathCirc);
    const pathCircGeo = pathCirc.map((elem) => {
      return sk42ToWGS84(elem.lng, elem.lat);
    });
    pathCirc = pathCircGeo.map((elem) => {
      return { lat: elem.L, lng: elem.B };
    });
  };

  getCirclePath();

  return (
    <React.Fragment>
      <Polyline path={pathCirc} options={options} />
      <Circle center={center} options={options} />
    </React.Fragment>
  );
};
