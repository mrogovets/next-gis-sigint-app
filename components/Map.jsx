import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import PropTypes from "prop-types";
function Map({ setMapObject }) {
  const googlemap = useRef(null);
  const [lat, setLat] = useState(34.9988127);
  const [lng, setLng] = useState(135.7674863);
  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
      version: "weekly",
    });
    let map;
    const userLocation = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      });
      console.log(lat, lng);
    };

    loader.load().then(() => {
      // Setting parameters for embedding Google Maps
      const initialView = {
        center: {
          lat: lat,
          lng: lng,
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
      map = new google.maps.Map(googlemap.current, {
        ...initialView,
        ...buttonsDisabled,
      });
      userLocation();
      setMapObject(map); // NOTE
    });
  }, [setMapObject]);

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
