import { Polyline } from "@react-google-maps/api";

export const SigintLineElement = ({ path = [], colorOfStripSigInt }) => {
  const onLoad = (polyline) => {
    // console.log("polyline: ", polyline);
  };

  // console.log("Color: ", colorOfStripSigInt);

  const lineSymbolDashed = {
    path: "M 0,-1 0,1 ",
    strokeOpacity: 1,
    scale: 4,
  };

  const lineSymbol = {
    path: "M -2,0 -2,-2 ",
    strokeOpacity: 1,
    scale: 4,
  };

  const options = {
    strokeColor: `${
      colorOfStripSigInt === "hostileStripSigInt" ? "tomato" : "blue"
    }`,
    strokeOpacity: 0,
    strokeWeight: 3,
    fillColor: `${
      colorOfStripSigInt === "hostileStripSigInt" ? "tomato" : "blue"
    }`,
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 3,
    icons: [
      {
        icon: lineSymbolDashed,
        offset: "0",
        repeat: "20px",
      },
      {
        icon: lineSymbol,
        offset: "0",
        repeat: "1px",
      },
    ],
    zIndex: 1,
  };

  return <Polyline onLoad={onLoad} path={path} options={options} />;
};
