import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

function Map({ setMapObject }) {
  const googlemap = useRef(null);
  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
      version: "weekly",
    });

    let map;

    if (navigator.geolocation) {
      loader.load().then(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          const initialView = {
            center: {
              lat: pos.lat,
              lng: pos.lng,
            },
            zoom: 14,
          };
          const buttonsDisabled = {
            fullscreenControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            zoomControl: false,
          };

          // Embedding Google Maps
          const google = window.google;

          const marker = new google.maps.Marker({
            position: pos,
            map: map,
          });

          map = new google.maps.Map(googlemap.current, {
            ...initialView,
            ...buttonsDisabled,
          });

          marker.setMap(map);

          //----- Add accuracyCircle on map --------
          const errorRange = position.coords.accuracy;
          if (errorRange) {
            const accuracyCircle = new google.maps.Circle({
              center: pos,
              fillColor: "red",
              fillOpacity: 0.4,
              radius: errorRange,
              strokeColor: "red",
              strokeOpacity: 0.4,
              strokeWeight: 1,
              zIndex: 1,
            });
            // accuracyCircle.setMap(map);
          }
          //----- accuracyCircle on map --------

          setMapObject(map); // NOTE
        });
      });
    } else {
      console.log("None navigator");
    }
  }, []);

  return (
    <React.Fragment>
      <div className="map-container" style={{ height: "100%", width: "80%" }}>
        <div id="map" ref={googlemap} />
      </div>
    </React.Fragment>
  );
}
export default Map;

/*
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
#__next {
  height: 100%;
}
#map {
  height: 100%;
}
*/
