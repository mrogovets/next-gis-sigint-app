import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
function HomePage() {
  const googlemap = useRef(null);
  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
      version: "weekly",
    });
    let map;
    loader.load().then(() => {
      const google = window.google;
      map = new google.maps.Map(googlemap.current, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
      //  map = new google.maps.Map(googlemap.current, {
      //   center: {lat: -34.397, lng: 150.644},
      //   zoom: 8,
      //   fullscreenControl: false, // remove the top-right button
      //   mapTypeControl: false, // remove the top-left buttons
      //   streetViewControl: false, // remove the pegman
      //   zoomControl: false, // remove the bottom-right buttons
      // });
    });
  });
  return (
    <React.Fragment>
      <div className="map-container" style={{ height: "80%" }}>
        <div id="map" ref={googlemap} />
      </div>
    </React.Fragment>
  );
}
export default HomePage;

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
