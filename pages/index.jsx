import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { MarkerElement } from "../components/MarkerElement";
function HomePage() {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const [markerArr, setMarkerArr] = useState([]);

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
    setMarkerArr([...markerArr, clickLatLngTmp]);
  };

  console.log("markerArr", markerArr);

  return (
    <React.Fragment>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          onClick={onMapClick}>
          <Marker onLoad={onLoad} position={center} />
          {markerArr.map((elem, i) => (
            <MarkerElement key={i} position={elem} />
          ))}
          {/* <MarkerElement position={clickLatLng} />; */}
        </GoogleMap>
      </LoadScript>
    </React.Fragment>
  );
}
export default HomePage;
