import React, { useState, useEffect, useContext } from "react";
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
import { ReadFromCloudFirestore } from "../firebase/readFirestore";
import ModalWindowObjectForm from "../components/ModalWindowObjectForm";
import { geoToRectCoord } from "../modules/geoToRectCoord";

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

  const apiKey = null; // for devProc only
  // const apiKey = process.env.NEXT_PUBLIC_API_KEY;

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
        console.log("Clear the map");
        setMarkerArr([]);
        setCollectionSigintStripPath([]);
        setCollectionLineDividePath([]);
        setCollectionDistanceSigIntHFPath([]);
        setCollectionDistanceSigIntUHFGndPath([]);
        setCollectionDistanceSigIntVHFAirPath([]);
        setCollectionDistanceSigIntRdrAirPath([]);
        setCollectionSectorSigIntPath([]);
        break;
      case "Three":
        // setSymbolMenuOpen(true);
        setSymbolMenuOpen(false);
        break;
      case "Four":
        // setSymbolMenuOpen(true);
        setSymbolMenuOpen(false);
        //-------- Writing situation in DB --------------------
        WriteToCloudFirestore(
          markerArr,
          collectionSigIntStripPath,
          collectionLineDividePath,
          collectionDistanceSigIntHFPath,
          collectionDistanceSigIntUHFGndPath,
          collectionDistanceSigIntVHFAirPath,
          collectionDistanceSigIntRdrAirPath,
          collectionSectorSigIntPath
        );
        //-------- \Writing situation in DB --------------------
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

  //-------- Read situation from DB --------------------
  const fromFirestoreData = ReadFromCloudFirestore();
  useEffect(() => {
    if (fromFirestoreData) {
      setMarkerArr(fromFirestoreData.markerArr_data);
      setCollectionSigintStripPath(
        JSON.parse(fromFirestoreData.collectionSigIntStripPath_data)
      );
      setCollectionLineDividePath(
        JSON.parse(fromFirestoreData.collectionLineDividePath_data)
      );
      setCollectionDistanceSigIntHFPath(
        JSON.parse(fromFirestoreData.collectionDistanceSigIntHFPath_data)
      );
      setCollectionDistanceSigIntUHFGndPath(
        JSON.parse(fromFirestoreData.collectionDistanceSigIntUHFGndPath_data)
      );
      setCollectionDistanceSigIntVHFAirPath(
        JSON.parse(fromFirestoreData.collectionDistanceSigIntVHFAirPath_data)
      );
      setCollectionDistanceSigIntRdrAirPath(
        JSON.parse(fromFirestoreData.collectionDistanceSigIntRdrAirPath_data)
      );
      setCollectionSectorSigIntPath(
        JSON.parse(fromFirestoreData.collectionSectorSigIntPath_data)
      );
    }
  }, [fromFirestoreData]);
  //-------- \Read situation from DB --------------------
  //---------Get ID Marker & Comand from ContextMenu on Map------
  let idMarkerContextMenuMap = null;
  let comandFromContextMenuMap = null;
  const [openModalWindowObject, setModalWindowObject] = useState(false); // open ModalWindowObjectForm
  const closeModalWindowObject = () => {
    setModalWindowObject(false);
  };
  const getMarkerIDContextMenu = (idMarkerContextMenu) => {
    idMarkerContextMenuMap = idMarkerContextMenu;
  };
  const getItemMarkerContextMenu = (itemMarkerContextMenu) => {
    comandFromContextMenuMap = itemMarkerContextMenu;
    switch (comandFromContextMenuMap) {
      case "READ":
        console.log("Read Object Form Map: ", idMarkerContextMenuMap);
        //-----------Transform coords from Geographic to Decart

        console.log(
          "Coords of Object: ",
          markerArr[idMarkerContextMenuMap].coords
        );

        console.log(geoToRectCoord(2, 3));

        /*
        Наймену-вання об’єкта
        Місце знаход-ження: ш - д -	
        Належність	
        В яких джерелах проявля-ється	
        Особливості функціону-вання	
        Дата остан-нього підтвер-дження
        */
        //-----------\Transform coords from Geographic to Decart
        setModalWindowObject(true);
        break;
      case "DELETE":
        deleteMarkerFromMap(idMarkerContextMenuMap, comandFromContextMenuMap);
        break;
    }
  };
  const deleteMarkerFromMap = (idMarker) => {
    console.log("deleteMarkerFromMap", idMarker);
    const idxInMarkerArr = markerArr.findIndex((el, i) => i === idMarker);
    const before = markerArr.slice(0, idxInMarkerArr);
    const after = markerArr.slice(idxInMarkerArr + 1);
    setMarkerArr([...before, ...after]);
  };
  //---------\Get ID Marker & Comand from ContextMenu on Map------
  //---------Get ID SigintLineElement & Comand from ContextMenu on Map------
  let idSigintLineElementContextMenuMap = null;
  let comandSigintLineElementContextMenuMap = null;
  const getIdSigintLineElementContextMenuMap = (idSigintLineContextMenu) => {
    idSigintLineElementContextMenuMap = idSigintLineContextMenu;
  };
  const getContextMenuCommandSigintLine = (commandConextMenuSigintLine) => {
    comandSigintLineElementContextMenuMap = commandConextMenuSigintLine;
    switch (comandSigintLineElementContextMenuMap) {
      case "INFO":
        console.log(
          "Info about SigIntLine Form Map: ",
          idSigintLineElementContextMenuMap
        );
        break;
      case "EDIT":
        console.log(
          "Editing SigIntLine Form Map: ",
          idSigintLineElementContextMenuMap
        );
        break;
      case "DELETE":
        deleteSigintLineFromMap(idSigintLineElementContextMenuMap);
        break;
    }
  };
  const deleteSigintLineFromMap = (idSigintLine) => {
    console.log("deleteSigintLineFromMap", idSigintLine);
    const idxInCollectionSigIntStripPath = collectionSigIntStripPath.findIndex(
      (el, i) => i === idSigintLine
    );
    const before = collectionSigIntStripPath.slice(
      0,
      idxInCollectionSigIntStripPath
    );
    const after = collectionSigIntStripPath.slice(
      idxInCollectionSigIntStripPath + 1
    );
    setCollectionSigintStripPath([...before, ...after]);
  };
  //---------\Get ID SigintLineElement & Comand from ContextMenu on Map------
  //---------Get ID LineDevideElement & Comand from ContextMenu on Map------
  let idLineDevideElementContextMenuMap = null;
  let comandLineDevideElementContextMenuMap = null;
  const getIdLineDevideElementContextMenuMap = (idLineDevideContextMenu) => {
    idLineDevideElementContextMenuMap = idLineDevideContextMenu;
  };
  const getContextMenuCommandLineDevide = (commandConextMenuLineDevide) => {
    comandLineDevideElementContextMenuMap = commandConextMenuLineDevide;
    switch (comandLineDevideElementContextMenuMap) {
      case "INFO":
        console.log(
          "Info about LineDevide Form Map: ",
          idLineDevideElementContextMenuMap
        );
        break;
      case "EDIT":
        console.log(
          "Editing LineDevide Form Map: ",
          idLineDevideElementContextMenuMap
        );
        break;
      case "DELETE":
        deleteLineDevideFromMap(idLineDevideElementContextMenuMap);
        break;
    }
  };
  const deleteLineDevideFromMap = (idLineDevide) => {
    console.log("deleteLineDevideFromMap", idLineDevide);
    const idxInCollectionLineDividePath = collectionLineDividePath.findIndex(
      (el, i) => i === idLineDevide
    );
    const before = collectionLineDividePath.slice(
      0,
      idxInCollectionLineDividePath
    );
    const after = collectionLineDividePath.slice(
      idxInCollectionLineDividePath + 1
    );
    setCollectionLineDividePath([...before, ...after]);
  };
  //---------\Get ID LineDevideElement & Comand from ContextMenu on Map------
  //---------Get ID DistanceSigIntHF & Comand from ContextMenu on Map------
  let idDistanceSigIntHFContextMenuMap = null;
  let comandDistanceSigIntHFContextMenuMap = null;
  const getIdDistanceSigIntHFContextMenuMap = (
    idDistanceSigIntHFContextMenu
  ) => {
    idDistanceSigIntHFContextMenuMap = idDistanceSigIntHFContextMenu;
  };
  const getContextMenuCommandDistanceSigIntHF = (
    commandConextMenuDistanceSigIntHF
  ) => {
    comandDistanceSigIntHFContextMenuMap = commandConextMenuDistanceSigIntHF;
    switch (comandDistanceSigIntHFContextMenuMap) {
      case "INFO":
        console.log(
          "Info about DistanceSigIntHF Form Map: ",
          idDistanceSigIntHFContextMenuMap
        );
        break;
      case "EDIT":
        console.log(
          "Editing DistanceSigIntHF Form Map: ",
          idDistanceSigIntHFContextMenuMap
        );
        break;
      case "DELETE":
        deleteDistanceSigIntHFFromMap(idDistanceSigIntHFContextMenuMap);
        break;
    }
  };
  const deleteDistanceSigIntHFFromMap = (idDistanceSigIntHF) => {
    console.log("deleteDistanceSigIntHFFromMap", idDistanceSigIntHF);
    const idxInCollectionDistanceSigIntHFPath =
      collectionDistanceSigIntHFPath.findIndex(
        (el, i) => i === idDistanceSigIntHF
      );
    const before = collectionDistanceSigIntHFPath.slice(
      0,
      idxInCollectionDistanceSigIntHFPath
    );
    const after = collectionDistanceSigIntHFPath.slice(
      idxInCollectionDistanceSigIntHFPath + 1
    );
    setCollectionDistanceSigIntHFPath([...before, ...after]);
  };
  //---------\Get ID DistanceSigIntHF & Comand from ContextMenu on Map------
  //---------Get ID DistanceSigIntRdrAir & Comand from ContextMenu on Map------
  let idDistanceSigIntRdrAirContextMenuMap = null;
  let comandDistanceSigIntRdrAirContextMenuMap = null;
  const getIdDistanceSigIntRdrAirContextMenuMap = (
    idDistanceSigIntRdrAirContextMenu
  ) => {
    idDistanceSigIntRdrAirContextMenuMap = idDistanceSigIntRdrAirContextMenu;
  };
  const getContextMenuCommandDistanceSigIntRdrAir = (
    commandConextMenuDistanceSigIntRdrAir
  ) => {
    comandDistanceSigIntRdrAirContextMenuMap =
      commandConextMenuDistanceSigIntRdrAir;
    switch (comandDistanceSigIntRdrAirContextMenuMap) {
      case "INFO":
        console.log(
          "Info about DistanceSigIntRdrAir Form Map: ",
          idDistanceSigIntRdrAirContextMenuMap
        );
        break;
      case "EDIT":
        console.log(
          "Editing DistanceSigIntRdrAir Form Map: ",
          idDistanceSigIntRdrAirContextMenuMap
        );
        break;
      case "DELETE":
        deleteDistanceSigIntRdrAirFromMap(idDistanceSigIntRdrAirContextMenuMap);
        break;
    }
  };
  const deleteDistanceSigIntRdrAirFromMap = (idDistanceSigIntRdrAir) => {
    console.log("deleteDistanceSigIntRdrAirFromMap", idDistanceSigIntRdrAir);
    const idxInCollectionDistanceSigIntRdrAirPath =
      collectionDistanceSigIntRdrAirPath.findIndex(
        (el, i) => i === idDistanceSigIntRdrAir
      );
    const before = collectionDistanceSigIntRdrAirPath.slice(
      0,
      idxInCollectionDistanceSigIntRdrAirPath
    );
    const after = collectionDistanceSigIntRdrAirPath.slice(
      idxInCollectionDistanceSigIntRdrAirPath + 1
    );
    setCollectionDistanceSigIntRdrAirPath([...before, ...after]);
  };
  //---------\Get ID DistanceSigIntRdrAir & Comand from ContextMenu on Map------
  //---------Get ID DistanceSigIntUHFGnd & Comand from ContextMenu on Map------
  let idDistanceSigIntUHFGndContextMenuMap = null;
  let comandDistanceSigIntUHFGndContextMenuMap = null;
  const getIdDistanceSigIntUHFGndContextMenuMap = (
    idDistanceSigIntUHFGndContextMenu
  ) => {
    idDistanceSigIntUHFGndContextMenuMap = idDistanceSigIntUHFGndContextMenu;
  };
  const getContextMenuCommandDistanceSigIntUHFGnd = (
    commandConextMenuDistanceSigIntUHFGnd
  ) => {
    comandDistanceSigIntUHFGndContextMenuMap =
      commandConextMenuDistanceSigIntUHFGnd;
    switch (comandDistanceSigIntUHFGndContextMenuMap) {
      case "INFO":
        console.log(
          "Info about DistanceSigIntUHFGnd Form Map: ",
          idDistanceSigIntUHFGndContextMenuMap
        );
        break;
      case "EDIT":
        console.log(
          "Editing DistanceSigIntUHFGnd Form Map: ",
          idDistanceSigIntUHFGndContextMenuMap
        );
        break;
      case "DELETE":
        deleteDistanceSigIntUHFGndFromMap(idDistanceSigIntUHFGndContextMenuMap);
        break;
    }
  };
  const deleteDistanceSigIntUHFGndFromMap = (idDistanceSigIntUHFGnd) => {
    console.log("deleteDistanceSigIntUHFGndFromMap", idDistanceSigIntUHFGnd);
    const idxInCollectionDistanceSigIntUHFGndPath =
      collectionDistanceSigIntUHFGndPath.findIndex(
        (el, i) => i === idDistanceSigIntUHFGnd
      );
    const before = collectionDistanceSigIntUHFGndPath.slice(
      0,
      idxInCollectionDistanceSigIntUHFGndPath
    );
    const after = collectionDistanceSigIntUHFGndPath.slice(
      idxInCollectionDistanceSigIntUHFGndPath + 1
    );
    setCollectionDistanceSigIntUHFGndPath([...before, ...after]);
  };
  //---------\Get ID DistanceSigIntUHFGnd & Comand from ContextMenu on Map------
  //---------Get ID DistanceSigIntVHFAir & Comand from ContextMenu on Map------
  let idDistanceSigIntVHFAirContextMenuMap = null;
  let comandDistanceSigIntVHFAirContextMenuMap = null;
  const getIdDistanceSigIntVHFAirContextMenuMap = (
    idDistanceSigIntVHFAirContextMenu
  ) => {
    idDistanceSigIntVHFAirContextMenuMap = idDistanceSigIntVHFAirContextMenu;
  };
  const getContextMenuCommandDistanceSigIntVHFAir = (
    commandConextMenuDistanceSigIntVHFAir
  ) => {
    comandDistanceSigIntVHFAirContextMenuMap =
      commandConextMenuDistanceSigIntVHFAir;
    switch (comandDistanceSigIntVHFAirContextMenuMap) {
      case "INFO":
        console.log(
          "Info about DistanceSigIntVHFAir Form Map: ",
          idDistanceSigIntVHFAirContextMenuMap
        );
        break;
      case "EDIT":
        console.log(
          "Editing DistanceSigIntVHFAir Form Map: ",
          idDistanceSigIntVHFAirContextMenuMap
        );
        break;
      case "DELETE":
        deleteDistanceSigIntVHFAirFromMap(idDistanceSigIntVHFAirContextMenuMap);
        break;
    }
  };
  const deleteDistanceSigIntVHFAirFromMap = (idDistanceSigIntVHFAir) => {
    console.log("deleteDistanceSigIntVHFAirFromMap", idDistanceSigIntVHFAir);
    const idxInCollectionDistanceSigIntVHFAirPath =
      collectionDistanceSigIntVHFAirPath.findIndex(
        (el, i) => i === idDistanceSigIntVHFAir
      );
    const before = collectionDistanceSigIntVHFAirPath.slice(
      0,
      idxInCollectionDistanceSigIntVHFAirPath
    );
    const after = collectionDistanceSigIntVHFAirPath.slice(
      idxInCollectionDistanceSigIntVHFAirPath + 1
    );
    setCollectionDistanceSigIntVHFAirPath([...before, ...after]);
  };
  //---------\Get ID DistanceSigIntVHFAir & Comand from ContextMenu on Map------
  //---------Get ID SectorSigInt & Comand from ContextMenu on Map------
  let idSectorSigIntContextMenuMap = null;
  let comandSectorSigIntContextMenuMap = null;
  const getIdSectorSigIntContextMenuMap = (idSectorSigIntContextMenu) => {
    idSectorSigIntContextMenuMap = idSectorSigIntContextMenu;
  };
  const getContextMenuCommandSectorSigInt = (commandConextMenuSectorSigInt) => {
    comandSectorSigIntContextMenuMap = commandConextMenuSectorSigInt;
    switch (comandSectorSigIntContextMenuMap) {
      case "INFO":
        console.log(
          "Info about SectorSigInt Form Map: ",
          idSectorSigIntContextMenuMap
        );
        break;
      case "EDIT":
        console.log(
          "Editing SectorSigInt Form Map: ",
          idSectorSigIntContextMenuMap
        );
        break;
      case "DELETE":
        deleteSectorSigIntFromMap(idSectorSigIntContextMenuMap);
        break;
    }
  };
  const deleteSectorSigIntFromMap = (idSectorSigInt) => {
    console.log("deleteSectorSigIntFromMap", idSectorSigInt);
    const idxSectorSigIntPath = collectionSectorSigIntPath.findIndex(
      (el, i) => i === idSectorSigInt
    );
    const before = collectionSectorSigIntPath.slice(0, idxSectorSigIntPath);
    const after = collectionSectorSigIntPath.slice(idxSectorSigIntPath + 1);
    setCollectionSectorSigIntPath([...before, ...after]);
  };
  //---------\Get ID SectorSigInt & Comand from ContextMenu on Map------

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
                  idMarkerContextMenuMap={i}
                  position={elem.coords}
                  icon={createIcon(elem.unitId)}
                  getMarkerIDContextMenu={(idMarkerContextMenuMap) =>
                    getMarkerIDContextMenu(idMarkerContextMenuMap)
                  }
                  getItemMarkerContextMenu={(itemMarkerContextMenuMap) =>
                    getItemMarkerContextMenu(itemMarkerContextMenuMap)
                  }
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
                (elem, idx) =>
                  elem.map((el, i) => (
                    <SigintLineElement
                      key={i}
                      idSigintLineElementContextMenuMap={idx}
                      path={el}
                      colorOfStripSigInt={el[i].id}
                      getIdSigintLineElementContextMenuMap={
                        getIdSigintLineElementContextMenuMap
                      }
                      getContextMenuCommandSigintLine={
                        getContextMenuCommandSigintLine
                      }
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
              {collectionLineDividePath.map((elem, idx) =>
                elem.map((el, i) => (
                  <LineDevideElement
                    key={i}
                    idLineDevideElementContextMenuMap={idx}
                    path={el}
                    colorOfLineDivide={el[i].id}
                    getIdLineDevideElementContextMenuMap={
                      getIdLineDevideElementContextMenuMap
                    }
                    getContextMenuCommandLineDevide={
                      getContextMenuCommandLineDevide
                    }
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
              {collectionDistanceSigIntHFPath.map((elem, idx) =>
                elem.map((el, i) => (
                  <DistanceSigIntHF
                    key={i}
                    idDistanceSigIntHFContextMenuMap={idx}
                    path={el}
                    colorOfDistanceSigIntHF={el[i].id}
                    getIdDistanceSigIntHFContextMenuMap={
                      getIdDistanceSigIntHFContextMenuMap
                    }
                    getContextMenuCommandDistanceSigIntHF={
                      getContextMenuCommandDistanceSigIntHF
                    }
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
              {collectionDistanceSigIntUHFGndPath.map((elem, idx) =>
                elem.map((el, i) => (
                  <DistanceSigIntUHFGnd
                    key={i}
                    idDistanceSigIntUHFGndContextMenuMap={idx}
                    path={el}
                    colorOfDistanceSigIntUHFGnd={el[i].id}
                    getIdDistanceSigIntUHFGndContextMenuMap={
                      getIdDistanceSigIntUHFGndContextMenuMap
                    }
                    getContextMenuCommandDistanceSigIntUHFGnd={
                      getContextMenuCommandDistanceSigIntUHFGnd
                    }
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
              {collectionDistanceSigIntVHFAirPath.map((elem, idx) =>
                elem.map((el, i) => (
                  <DistanceSigIntVHFAir
                    key={i}
                    idDistanceSigIntVHFAirContextMenuMap={idx}
                    path={el}
                    colorOfDistanceSigIntVHFAir={el[i].id}
                    getIdDistanceSigIntVHFAirContextMenuMap={
                      getIdDistanceSigIntVHFAirContextMenuMap
                    }
                    getContextMenuCommandDistanceSigIntVHFAir={
                      getContextMenuCommandDistanceSigIntVHFAir
                    }
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
              {collectionDistanceSigIntRdrAirPath.map((elem, idx) =>
                elem.map((el, i) => (
                  <DistanceSigIntRdrAir
                    key={i}
                    idDistanceSigIntRdrAirContextMenuMap={idx}
                    path={el}
                    colorOfDistanceSigIntRdrAir={el[i].id}
                    getIdDistanceSigIntRdrAirContextMenuMap={
                      getIdDistanceSigIntRdrAirContextMenuMap
                    }
                    getContextMenuCommandDistanceSigIntRdrAir={
                      getContextMenuCommandDistanceSigIntRdrAir
                    }
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
              {collectionSectorSigIntPath.map((elem, idx) =>
                elem.map((el, i) => (
                  <SectorSigInt
                    key={i}
                    idSectorSigIntContextMenuMap={idx}
                    path={el}
                    colorOfSectorSigInt={el[i].id}
                    getIdSectorSigIntContextMenuMap={
                      getIdSectorSigIntContextMenuMap
                    }
                    getContextMenuCommandSectorSigInt={
                      getContextMenuCommandSectorSigInt
                    }
                  />
                ))
              )}
              {/* ----- end of collection of Polylines ------- */}
            </GoogleMap>
          </LoadScript>
          <ModalWindowObjectForm
            openModalWindowObject={openModalWindowObject}
            closeModalWindowObject={closeModalWindowObject}
          />
        </Layout>
      </ContextUnitId.Provider>
    </ContextSBMenu.Provider>
  );
}
export default HomePage;
