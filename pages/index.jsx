import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
function HomePage() {
  // const [mapObject, setMapObject] = useState(null); // this is fro LocatorButton component

  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const center = { lat, lng };
  const zoom = 10;

  const [clickLatLng, setClickLatLng] = useState(center);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const containerStyle = {
    width: "1200px",
    height: "800px",
  };

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

  const onLoad = (marker) => {
    console.log("marker: ", marker);
  };

  const onMapClick = (mapsMouseEvent) => {
    const clickLatLngTmp = mapsMouseEvent.latLng.toJSON();
    setClickLatLng(clickLatLngTmp);
  };

  return (
    <React.Fragment>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          onClick={onMapClick}>
          <Marker onLoad={onLoad} position={center} />
          <Marker position={clickLatLng} />
        </GoogleMap>
      </LoadScript>
    </React.Fragment>
  );
}
export default HomePage;
