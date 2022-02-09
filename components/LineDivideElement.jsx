import { Polyline } from "@react-google-maps/api";

export const LineDevideElement = ({ path = [], colorOfLineDivide }) => {
  const onLoad = (polyline) => {
    // console.log("polyline: ", polyline);
  };

  const curveLine = {
    // path: "M0,10 C1,0 9,0 10,10 ",
    path: "M-5,5 C-3,-8 6,-2 5,5 ",
    strokeOpacity: 1,
    strokeWeight: 3,
    scale: 2,
    rotation: 90,
  };

  const startSymbol = {
    path: "M -2,-2 2,2 M 2,-2 -2,2 ",
    strokeOpacity: 1,
    scale: 4,
  };
  const endSymbol = {
    path: "M 3,-7.7 a5 5 0 1 1-10 0 5 5 0 1 1 10 0 M 3,-8 -7,-8  z",
    strokeOpacity: 1,
    scale: 3,
  };

  const options = {
    strokeColor: `${
      colorOfLineDivide === "hostileLineDivide" ? "tomato" : "blue"
    }`,
    strokeOpacity: 0,
    strokeWeight: 3,
    fillColor: `${
      colorOfLineDivide === "hostileLineDivide" ? "tomato" : "blue"
    }`,
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 3,
    icons: [
      {
        icon: curveLine,
        repeat: "20px",
      },
      {
        icon: startSymbol,
        offset: "0%",
      },
      {
        icon: endSymbol,
        offset: "100%",
      },
    ],
    zIndex: 1,
  };

  return <Polyline onLoad={onLoad} path={path} options={options} />;
};
