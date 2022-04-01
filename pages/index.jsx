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
import { LineDevideElement } from "../components/LineDivideElement";
import { DistanceSigIntHF } from "../components/DistanceSigIntHF";
import { DistanceSigIntUHFGnd } from "../components/DistanceSigIntUHFGnd";
import { DistanceSigIntVHFAir } from "../components/DistanceSigIntVHFAir";
import { DistanceSigIntRdrAir } from "../components/DistanceSigIntRdrAir";
import { SectorSigInt } from "../components/SectorSigInt";
import firebase from "../firebase/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { WriteToCloudFirestore } from "../firebase/writeFirestore";

function HomePage() {
  //-----------------Log-in--------------
  const [userName, setUserName] = useState("");
  const [user, loading, error] = useAuthState(firebase.auth());

  useEffect(() => {
    if (!loading) {
      try {
        setUserName(user.displayName);
      } catch (error) {
        console.log("error", error);
      }
    }
  }, [loading]);
  // if (userName) {
  //   console.log("userName", userName);
  // }

  //-----------------\Log-in--------------
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

  const [isLineDivide, setIsLineDivide] = useState(false); // regime LineDivide in function getUnitId(id)
  const [colorOfLineDivide, setColorOfLineDivide] = useState("");
  const [collectionLineDividePath, setCollectionLineDividePath] = useState([]); // this is finished path

  const [isDistanceSigIntHF, setIsDistanceSigIntHF] = useState(false); // regime DistanceSigIntHF in function getUnitId(id)
  const [colorOfDistanceSigIntHF, setColorOfDistanceSigIntHF] = useState("");
  const [collectionDistanceSigIntHFPath, setCollectionDistanceSigIntHFPath] =
    useState([]); // this is finished path

  const [isDistanceSigIntUHFGnd, setIsDistanceSigIntUHFGnd] = useState(false); // regime DistanceSigIntUHFGnd in function getUnitId(id)
  const [colorOfDistanceSigIntUHFGnd, setColorOfDistanceSigIntUHFGnd] =
    useState("");
  const [
    collectionDistanceSigIntUHFGndPath,
    setCollectionDistanceSigIntUHFGndPath,
  ] = useState([]); // this is finished path

  const [isDistanceSigIntVHFAir, setIsDistanceSigIntVHFAir] = useState(false); // regime DistanceSigIntVHFAir in function getUnitId(id)
  const [colorOfDistanceSigIntVHFAir, setColorOfDistanceSigIntVHFAir] =
    useState("");
  const [
    collectionDistanceSigIntVHFAirPath,
    setCollectionDistanceSigIntVHFAirPath,
  ] = useState([]); // this is finished path

  const [isDistanceSigIntRdrAir, setIsDistanceSigIntRdrAir] = useState(false); // regime DistanceSigIntRdrAir in function getUnitId(id)
  const [colorOfDistanceSigIntRdrAir, setColorOfDistanceSigIntRdrAir] =
    useState("");
  const [
    collectionDistanceSigIntRdrAirPath,
    setCollectionDistanceSigIntRdrAirPath,
  ] = useState([]); // this is finished path

  const [isSectorSigInt, setIsSectorSigInt] = useState(false); // regime SectorSigInt in function getUnitId(id)
  const [colorOfSectorSigInt, setColorOfSectorSigInt] = useState("");
  const [collectionSectorSigIntPath, setCollectionSectorSigIntPath] = useState(
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
      setIsLineDivide(false);
      setIsDistanceSigIntHF(false);
      setIsDistanceSigIntUHFGnd(false);
      setIsDistanceSigIntVHFAir(false);
      setIsDistanceSigIntRdrAir(false);
      setIsSectorSigInt(false);
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
      setIsLineDivide(true);
      setIsStripSigint(false);
      setIsDistanceSigIntHF(false);
      setIsDistanceSigIntUHFGnd(false);
      setIsDistanceSigIntVHFAir(false);
      setIsDistanceSigIntRdrAir(false);
      setIsSectorSigInt(false);
      setColorOfLineDivide(id);
      setUnitId(id);
      if (polylinePathArr.length) {
        setCollectionLineDividePath([
          ...collectionLineDividePath,
          [polylinePathArr],
        ]);
        setPolylinePathArr([]);
      }
    }
    // ------- \ for drawing of LineDevide ------------
    // ------- for drawing of DistanceSigIntHF ------------
    else if (
      id === "friendDistanceSigIntHF" ||
      id === "hostileDistanceSigIntHF"
    ) {
      setIsDistanceSigIntHF(true);
      setIsStripSigint(false);
      setIsLineDivide(false);
      setIsDistanceSigIntUHFGnd(false);
      setIsDistanceSigIntVHFAir(false);
      setIsDistanceSigIntRdrAir(false);
      setIsSectorSigInt(false);
      setColorOfDistanceSigIntHF(id);
      setUnitId(id);
      if (polylinePathArr.length) {
        setCollectionDistanceSigIntHFPath([
          ...collectionDistanceSigIntHFPath,
          [polylinePathArr],
        ]);
        setPolylinePathArr([]);
      }
    }
    // ------- \ for drawing of DistanceSigIntHF ------------
    // ------- for drawing of DistanceSigIntUHFGnd ------------
    else if (
      id === "hostileDistanceSigIntUHFGnd" ||
      id === "friendDistanceSigIntUHFGnd"
    ) {
      setIsDistanceSigIntUHFGnd(true);
      setIsDistanceSigIntHF(false);
      setIsStripSigint(false);
      setIsLineDivide(false);
      setIsDistanceSigIntVHFAir(false);
      setIsDistanceSigIntRdrAir(false);
      setIsSectorSigInt(false);
      setColorOfDistanceSigIntUHFGnd(id);
      setUnitId(id);
      if (polylinePathArr.length) {
        setCollectionDistanceSigIntUHFGndPath([
          ...collectionDistanceSigIntUHFGndPath,
          [polylinePathArr],
        ]);
        setPolylinePathArr([]);
      }
    }
    // ------- \ for drawing of DistanceSigIntVHFAir ------------
    // ------- for drawing of DistanceSigIntVHFAir ------------
    else if (
      id === "friendDistanceSigIntVHFAir" ||
      id === "hostileDistanceSigIntVHFAir"
    ) {
      setIsDistanceSigIntVHFAir(true);
      setIsDistanceSigIntUHFGnd(false);
      setIsDistanceSigIntHF(false);
      setIsStripSigint(false);
      setIsLineDivide(false);
      setIsDistanceSigIntRdrAir(false);
      setIsSectorSigInt(false);
      setColorOfDistanceSigIntVHFAir(id);
      setUnitId(id);
      if (polylinePathArr.length) {
        setCollectionDistanceSigIntVHFAirPath([
          ...collectionDistanceSigIntVHFAirPath,
          [polylinePathArr],
        ]);
        setPolylinePathArr([]);
      }
    }
    // ------- \ for drawing of DistanceSigIntVHFAir ------------
    // ------- for drawing of DistanceSigIntRdrAir ------------
    else if (
      id === "hostileDistanceSigIntRdrAir" ||
      id === "friendDistanceSigIntRdrAir"
    ) {
      setIsDistanceSigIntRdrAir(true);
      setIsDistanceSigIntUHFGnd(false);
      setIsDistanceSigIntHF(false);
      setIsStripSigint(false);
      setIsLineDivide(false);
      setIsDistanceSigIntVHFAir(false);
      setIsSectorSigInt(false);
      setColorOfDistanceSigIntRdrAir(id);
      setUnitId(id);
      if (polylinePathArr.length) {
        setCollectionDistanceSigIntRdrAirPath([
          ...collectionDistanceSigIntRdrAirPath,
          [polylinePathArr],
        ]);
        setPolylinePathArr([]);
      }
    }
    // ------- \ for drawing of DistanceSigIntRdrAir ------------
    // ------- for drawing of SectorSigInt ------------
    else if (id === "friendSectorSigInt" || id === "hostileSectorSigInt") {
      setIsSectorSigInt(true);
      setIsDistanceSigIntUHFGnd(false);
      setIsDistanceSigIntHF(false);
      setIsStripSigint(false);
      setIsLineDivide(false);
      setIsDistanceSigIntVHFAir(false);
      setIsDistanceSigIntRdrAir(false);
      setColorOfSectorSigInt(id);
      setUnitId(id);
      if (polylinePathArr.length) {
        setCollectionSectorSigIntPath([
          ...collectionSectorSigIntPath,
          [polylinePathArr],
        ]);
        setPolylinePathArr([]);
      }
    }
    // ------- \ for drawing of SectorSigInt ------------
    else {
      setIsStripSigint(false);
      setIsLineDivide(false);
      setIsDistanceSigIntUHFGnd(false);
      setIsDistanceSigIntHF(false);
      setIsDistanceSigIntVHFAir(false);
      setIsDistanceSigIntRdrAir(false);
      setIsSectorSigInt(false);

      setUnitId(id);
    }
    // console.log(
    //   "ColorOfDistanceSigIntHF: ",
    //   colorOfDistanceSigIntHF,
    //   collectionDistanceSigIntHFPath
    // );
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
    if (
      isStripSigint ||
      isLineDivide ||
      isDistanceSigIntHF ||
      isDistanceSigIntUHFGnd ||
      isDistanceSigIntVHFAir ||
      isDistanceSigIntRdrAir ||
      isSectorSigInt
    ) {
      setPolylinePathArr([
        ...polylinePathArr,
        { lat: clickLatLngTmp.lat, lng: clickLatLngTmp.lng, id: unitId },
      ]);
    } else {
      setMarkerArr([...markerArr, { coords: clickLatLngTmp, unitId }]);
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
        //-------- Writing of situation in DB --------------------
        WriteToCloudFirestore();
        //-------- \Writing of situation in DB --------------------
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
        <Layout isSBMenuOpen={() => isSBMenuOpen()} userName={userName}>
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
              {/* ----- start of collection of Polylines ------- */}
              {/* ------isStripSigint------- */}
              {isStripSigint ? (
                <SigintLineElement
                  path={polylinePathArr}
                  colorOfStripSigInt={colorOfSigIntStrip}
                />
              ) : null}
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
              {/*----------isLineDivide----------  */}
              {isLineDivide ? (
                <LineDevideElement
                  path={polylinePathArr}
                  colorOfLineDivide={colorOfLineDivide}
                />
              ) : null}
              {collectionLineDividePath.map((elem, i) =>
                elem.map((el, i) => (
                  <LineDevideElement
                    key={i}
                    path={el}
                    colorOfLineDivide={el[i].id}
                  />
                ))
              )}
              {/*---------isDistanceSigIntHF --------*/}
              {isDistanceSigIntHF ? (
                <DistanceSigIntHF
                  path={polylinePathArr}
                  colorOfDistanceSigIntHF={colorOfDistanceSigIntHF}
                />
              ) : null}
              {collectionDistanceSigIntHFPath.map((elem, i) =>
                elem.map((el, i) => (
                  <DistanceSigIntHF
                    key={i}
                    path={el}
                    colorOfDistanceSigIntHF={el[i].id}
                  />
                ))
              )}
              {/*---------isDistanceSigIntUHFGnd --------*/}
              {isDistanceSigIntUHFGnd ? (
                <DistanceSigIntUHFGnd
                  path={polylinePathArr}
                  colorOfDistanceSigIntUHFGnd={colorOfDistanceSigIntUHFGnd}
                />
              ) : null}
              {collectionDistanceSigIntUHFGndPath.map((elem, i) =>
                elem.map((el, i) => (
                  <DistanceSigIntUHFGnd
                    key={i}
                    path={el}
                    colorOfDistanceSigIntUHFGnd={el[i].id}
                  />
                ))
              )}
              {/*---------isDistanceSigIntVHFAir --------*/}
              {isDistanceSigIntVHFAir ? (
                <DistanceSigIntVHFAir
                  path={polylinePathArr}
                  colorOfDistanceSigIntVHFAir={colorOfDistanceSigIntVHFAir}
                />
              ) : null}
              {collectionDistanceSigIntVHFAirPath.map((elem, i) =>
                elem.map((el, i) => (
                  <DistanceSigIntVHFAir
                    key={i}
                    path={el}
                    colorOfDistanceSigIntVHFAir={el[i].id}
                  />
                ))
              )}
              {/*---------isDistanceSigIntRdrAir --------*/}
              {isDistanceSigIntRdrAir ? (
                <DistanceSigIntRdrAir
                  path={polylinePathArr}
                  colorOfDistanceSigIntRdrAir={colorOfDistanceSigIntRdrAir}
                />
              ) : null}
              {collectionDistanceSigIntRdrAirPath.map((elem, i) =>
                elem.map((el, i) => (
                  <DistanceSigIntRdrAir
                    key={i}
                    path={el}
                    colorOfDistanceSigIntRdrAir={el[i].id}
                  />
                ))
              )}
              {/*---------isSectorSigInt --------*/}
              {isSectorSigInt ? (
                <SectorSigInt
                  path={polylinePathArr}
                  colorOfSectorSigInt={colorOfSectorSigInt}
                />
              ) : null}
              {collectionSectorSigIntPath.map((elem, i) =>
                elem.map((el, i) => (
                  <SectorSigInt
                    key={i}
                    path={el}
                    colorOfSectorSigInt={el[i].id}
                  />
                ))
              )}
              {/* ----- end of collection of Polylines ------- */}
            </GoogleMap>
          </LoadScript>
        </Layout>
      </ContextUnitId.Provider>
    </ContextSBMenu.Provider>
  );
}
export default HomePage;
