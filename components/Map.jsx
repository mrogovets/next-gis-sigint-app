import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { faBus } from "@fortawesome/free-solid-svg-icons";
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

          const svgMarker = {
            path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
            fillColor: "blue",
            fillOpacity: 0.6,
            strokeWeight: 0,
            rotation: 0,
            scale: 2,
            anchor: new google.maps.Point(15, 30),
          };

          const marker = new google.maps.Marker({
            position: pos,
            icon: {
              path: faBus.icon[4],
              fillColor: "#0000ff",
              fillOpacity: 1,
              anchor: new google.maps.Point(
                faBus.icon[0] / 2, // width
                faBus.icon[1] // height
              ),
              strokeWeight: 1,
              strokeColor: "#ffffff",
              scale: 0.075,
            },
            map: map,
            label: "This is your position",
            title: "You are there",
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
