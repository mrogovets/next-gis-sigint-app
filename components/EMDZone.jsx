import { Circle, Polyline } from "@react-google-maps/api";
import React, { useEffect, useState, useCallback } from "react";
import { geoToRectCoord } from "../modules/geoToRectCoord";
import { sk42ToWGS84 } from "../modules/sk42ToWGS84";

export const EMDZone = ({ centerEMDZone, openEMDZone }) => {
  // centerEMDZone = {lat: 50.346759021087436, lng: 29.93380567309637, elevation: 173.8163604736328}

  const options = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.35,
    strokeWeight: 1,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: openEMDZone,
    zIndex: 1,
  };

  const [elevationPath, setElevationPath] = useState([]);

  const center = {
    lat: parseFloat(
      `${typeof centerEMDZone.lat != "undefined" ? centerEMDZone.lat : 0}`
    ),
    lng: parseFloat(
      `${typeof centerEMDZone.lng != "undefined" ? centerEMDZone.lng : 0}`
    ),
  };

  const r = 30000;

  const centerPoint = geoToRectCoord(center.lng, center.lat);

  let pathCirc = [];
  const getCirclePath = () => {
    for (let i = 0; i < 360; i++) {
      const x =
        1.6 * r * Math.cos(2 * Math.PI * (i / 360)) + centerPoint.X_lngSk42;
      const y =
        0.85 * r * Math.sin(2 * Math.PI * (i / 360)) + centerPoint.Y_latSk42;
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

  const [resultsArr, setResultsArr] = useState([]);

  return (
    <React.Fragment>
      <Polyline path={pathCirc} options={options} />
      {pathCirc.map((element, idx) => {
        const elevator = new google.maps.ElevationService();
        const path = [center, element];
        // elevator.getElevationAlongPath(
        //   { path: path, samples: 10 }, //{ path: path, samples: 256 }
        //   (results, status) => {
        //     if (status === "OK" && results.length > 0) {
        //       results.map((el, i) => {
        //         // console.log("element: ", {
        //         //   lat: el.location.lat(),
        //         //   lng: el.location.lng(),
        //         // });
        //       });
        //       console.log("results: ", results);
        //     }
        //   }
        // );
        return (
          <Polyline key={idx} path={[center, element]} options={options} />
        );
      })}
    </React.Fragment>
  );
};

/*
const path = [
        { lat: 50.346759021087436, lng: 29.93380567309637 },
        { lat: 50.34490667534976, lng: 30.36729076110646 },
      ];
*/
