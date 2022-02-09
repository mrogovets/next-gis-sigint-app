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
  const URL = "/svgSymbolsBase.json";

  const [data, setData] = useState([]);

  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const [SBMenuOpen, setSBMenuOpen] = useState(false);
  const [symbolMenuOpen, setSymbolMenuOpen] = useState(false);

  const center = { lat, lng };
  const zoom = 10;

  const [clickLatLng, setClickLatLng] = useState(center);

  const [unitId, setUnitId] = useState("");

  const markerObjTmp = {
    coords: center,
    unitId,
  };
  const [markerArr, setMarkerArr] = useState([markerObjTmp]);

  const [isStripSigint, setIsStripSigint] = useState(false); // regime strip of SigInt in function getUnitId(id)
  const [colorOfSigIntStrip, setColorOfSigintStrip] = useState("");

  const [polylinePathArr, setPolylinePathArr] = useState([]); // this is path of polyline
  const [collectionSigIntStripPath, setCollectionSigintStripPath] = useState(
    []
  ); // this is finished path

  // const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const apiKey = null; // for devProc only

  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  // GET data from db.json
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(URL);
        if (res.ok) {
          const resData = await res.json(); // this is result of fetching
          setData(resData);
        } else {
          throw new Error(`Failed to get address data ${URL}`);
        }
      } catch (e) {
        console.error(e);
      }
    };
    getData();
  }, []);
  // -------\GET data from db.json------------------

  const getUnitId = (id) => {
    // ------- for drawing of StripSigint ------------
    if (id === "friendStripSigInt" || id === "hostileStripSigInt") {
      setIsStripSigint(true);
      setColorOfSigintStrip(id);
      setUnitId(id);
      if (polylinePathArr.length) {
        setCollectionSigintStripPath([
          ...collectionSigIntStripPath,
          [polylinePathArr],
        ]);
        setPolylinePathArr([]);
      }
    }
    // ------- \ for drawing of StripSigint ------------
    // ------- for drawing of LineDevide ------------
    else if (id === "friendLineDivide" || id === "hostileLineDivide") {
      setIsStripSigint(true);
      setColorOfSigintStrip(id);
      setUnitId(id);
      if (polylinePathArr.length) {
        setCollectionSigintStripPath([
          ...collectionSigIntStripPath,
          [polylinePathArr],
        ]);
        setPolylinePathArr([]);
      }
    }
    // ------- \ for drawing of LineDevide ------------
    else {
      setIsStripSigint(false);
      setUnitId(id);
    }
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
        setClickLatLng(userLocation); // define start marker position
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
    if (!isStripSigint) {
      setMarkerArr([...markerArr, { coords: clickLatLngTmp, unitId }]);
    } else {
      setPolylinePathArr([
        ...polylinePathArr,
        { lat: clickLatLngTmp.lat, lng: clickLatLngTmp.lng, id: unitId },
      ]);
    }
  };

  const createIcon = (id) => {
    return (
      "data:image/svg+xml;base64," +
      Buffer.from(getSvgImgSymbol(id)).toString("base64")
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
            data={data}
          />
          <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={clickLatLng}
              zoom={zoom}
              onClick={onMapClick}>
              <Marker onLoad={onLoad} position={center} title="You are here" />
              {markerArr.map((elem, i) => (
                <MarkerElement
                  key={i}
                  position={elem.coords}
                  icon={createIcon(elem.unitId)}
                />
              ))}
              <SigintLineElement
                path={polylinePathArr}
                colorOfStripSigInt={colorOfSigIntStrip}
              />
              {collectionSigIntStripPath.map(
                (elem, i) =>
                  elem.map((el, i) => (
                    <SigintLineElement
                      key={i}
                      path={el}
                      colorOfStripSigInt={el[i].id}
                    />
                  ))

                // console.log("in SigintLineElement: ", elem[0])
              )}
            </GoogleMap>
          </LoadScript>
        </Layout>
      </ContextUnitId.Provider>
    </ContextSBMenu.Provider>
  );
}
export default HomePage;
