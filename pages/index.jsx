import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { MarkerElement } from "../components/MarkerElement";
import { getSvgImgSymbol } from "../components/svgImgBase.js";

function HomePage() {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const [markerArr, setMarkerArr] = useState([]);

  const center = { lat, lng };
  const zoom = 10;

  const [clickLatLng, setClickLatLng] = useState(center);

  // const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const apiKey = null; // for devProc only

  const containerStyle = {
    width: "1200px",
    height: "800px",
  };

  const svgSybmol =
    "data:image/svg+xml;base64," +
    Buffer.from(getSvgImgSymbol("hostileArmourCoy", 2, 5)).toString("base64");

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
    // console.log("marker: ", marker);
  };

  const onMapClick = (mapsMouseEvent) => {
    const clickLatLngTmp = mapsMouseEvent.latLng.toJSON();
    setClickLatLng(clickLatLngTmp);
    setMarkerArr([...markerArr, clickLatLngTmp]);
  };

  // console.log("markerArr", markerArr);

  return (
    <React.Fragment>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          onClick={onMapClick}>
          <Marker
            onLoad={onLoad}
            position={center}
            title="You are here"
            icon={
              "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMiIgYmFzZVByb2ZpbGU9InRpbnkiIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMjQgLTE2IDE1MiAxOTIiPjxwYXRoIGQ9Ik0xMDAgMjhsNzIgNzItNzIgNzItNzItNzIgNzItNzJ6IiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZT0iIzAwMCIgZmlsbD0iI0ZGODA4MCIvPjxwYXRoIGQ9Ik03MCAxNDBjMC0yNSA2MC0yNSA2MCAwIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZT0iIzAwMCIgZmlsbD0ibm9uZSIvPjx0ZXh0IHg9IjEwMCIgeT0iMTEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjM1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtd2VpZ2h0PSJib2xkIiBzdHJva2Utd2lkdGg9IjQiPlNSRDwvdGV4dD48cGF0aCBkPSJNODcuNSAxOGwyNS0yNW0wIDI1bC0yNS0yNSIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2U9IiMwMDAiIGZpbGw9Im5vbmUiLz48L3N2Zz4="
            }
          />
          {markerArr.map((elem, i) => (
            <MarkerElement key={i} position={elem} icon={svgSybmol} />
          ))}
          {/* <MarkerElement position={clickLatLng} />; */}
        </GoogleMap>
      </LoadScript>
    </React.Fragment>
  );
}
export default HomePage;
