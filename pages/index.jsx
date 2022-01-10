import React, { useState, useRef, useEffect } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import LocatorButton from "../components/LocatorButton";
import { MapComponent } from "../components/MapComponent";

function HomePage() {
  const [mapObject, setMapObject] = useState(null); // this is fro LocatorButton component

  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const center = { lat, lng };
  const zoom = 10;

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLat(userLocation.lat);
        setLng(userLocation.lng);
      });
    } else {
      // code for legacy browsers
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <React.Fragment>
      <LocatorButton mapObject={mapObject} />
      {/* <Map setMapObject={setMapObject} /> */}
      <Wrapper apiKey={apiKey}>
        <MapComponent center={center} zoom={zoom} />
      </Wrapper>
    </React.Fragment>
  );
}
export default HomePage;
