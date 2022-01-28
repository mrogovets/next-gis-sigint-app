import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { MarkerElement } from "../components/MarkerElement";
import { getSvgImgSymbol } from "../components/svgImgBase.js";
import { SigintLineElement } from "../components/SigintLineElement";
import Layout from "../components/Layout";
import { SideBarMenu } from "../components/SideBarMenu";
import { ContextSBMenu } from "../Context/ContextSBMenu";
import { SBSymbolMenu } from "../components/SBSymbolMenu";
import { ContextUnitId } from "../Context/ContextUnitId";

function HomePage() {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const [SBMenuOpen, setSBMenuOpen] = useState(false);
  const [symbolMenuOpen, setSymbolMenuOpen] = useState(false);

  const [markerArr, setMarkerArr] = useState([]);

  const center = { lat, lng };
  const zoom = 10;

  const [clickLatLng, setClickLatLng] = useState(center);

  const [unitId, setUnitId] = useState("");
  const [svgSybmol, setSvgSymbol] = useState("");

  // const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const apiKey = null; // for devProc only

  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  const getUnitId = (id) => {
    setUnitId(id);
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
    // console.log("marker: ", marker);
  };

  const onMapClick = (mapsMouseEvent) => {
    const clickLatLngTmp = mapsMouseEvent.latLng.toJSON();
    setClickLatLng(clickLatLngTmp);
    setMarkerArr([...markerArr, clickLatLngTmp]);
    console.log(unitId);
    setSvgSymbol(
      "data:image/svg+xml;base64," +
        Buffer.from(getSvgImgSymbol(unitId, "2", "5")).toString("base64")
    );
  };

  const isSBMenuOpen = () => {
    if (SBMenuOpen) {
      setSBMenuOpen(false);
    } else setSBMenuOpen(true);
  };

  const getMenuNumber = (number) => {
    switch (number) {
      case "One":
        setSymbolMenuOpen(true);
        break;
      case "Two":
        // setSymbolMenuOpen(true);
        setSymbolMenuOpen(false);
        break;
      case "Three":
        // setSymbolMenuOpen(true);
        setSymbolMenuOpen(false);
        break;
      case "Four":
        // setSymbolMenuOpen(true);
        setSymbolMenuOpen(false);
        break;
      case "Five":
        // setSymbolMenuOpen(true);
        setSymbolMenuOpen(false);
        break;
      case "Six":
        // setSymbolMenuOpen(true);
        setSymbolMenuOpen(false);
        break;
      case "Seven":
        // setSymbolMenuOpen(true);
        setSymbolMenuOpen(false);
        break;
      case "Eight":
        // setSymbolMenuOpen(true);
        setSymbolMenuOpen(false);
        break;
      default:
        break;
    }
  };

  const closeSymbolMenuOpen = () => {
    setSymbolMenuOpen(false);
  };

  return (
    <ContextSBMenu.Provider value={{ isSBMenuOpen }}>
      <ContextUnitId.Provider value={{ getUnitId }}>
        <Layout isSBMenuOpen={() => isSBMenuOpen()}>
          <SideBarMenu
            SBMenuOpen={SBMenuOpen}
            getMenuNumber={(number) => getMenuNumber(number)}
          />
          <SBSymbolMenu
            SymbolMenuOpen={symbolMenuOpen}
            closeSymbolMenuOpen={() => closeSymbolMenuOpen()}
          />
          <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={zoom}
              onClick={onMapClick}>
              <Marker onLoad={onLoad} position={center} title="You are here" />
              {markerArr.map((elem, i) => (
                <MarkerElement key={i} position={elem} icon={svgSybmol} />
              ))}
              <SigintLineElement />
            </GoogleMap>
          </LoadScript>
        </Layout>
      </ContextUnitId.Provider>
    </ContextSBMenu.Provider>
  );
}
export default HomePage;
