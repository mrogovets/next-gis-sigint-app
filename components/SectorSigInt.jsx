import { Polyline } from "@react-google-maps/api";

export const SectorSigInt = ({ path = [], colorOfSectorSigInt }) => {
  const onLoad = (polyline) => {
    // console.log("polyline: ", polyline);
  };

  // https://danmarshall.github.io/google-font-to-svg-path/

  const sectorArrow = {
    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
    strokeColor: `${
      colorOfSectorSigInt === "hostileSectorSigInt" ? "tomato" : "blue"
    }`,
    fillColor: `${
      colorOfSectorSigInt === "hostileSectorSigInt" ? "tomato" : "blue"
    }`,
    fillOpacity: 1,
    scale: 3,
    rotation: 0,
  };

  const options = {
    strokeColor: `${
      colorOfSectorSigInt === "hostileSectorSigInt" ? "tomato" : "blue"
    }`,
    strokeOpacity: 1,
    strokeWeight: 4,
    fillColor: `${
      colorOfSectorSigInt === "hostileSectorSigInt" ? "tomato" : "blue"
    }`,
    fillOpacity: 1,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 3,
    icons: [
      {
        icon: sectorArrow,
        offset: "100%",
      },
    ],
    zIndex: 1,
  };

  return <Polyline onLoad={onLoad} path={path} options={options} />;
};
