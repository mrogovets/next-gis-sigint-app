import { Polyline } from "@react-google-maps/api";

export const LineDevideElement = ({ path = [], colorOfLineDivide }) => {
  const onLoad = (polyline) => {
    // console.log("polyline: ", polyline);
  };

  const curveLine = {
    path: "M0,10 C1,0 9,0 10,10 ",
    strokeOpacity: 1,
    strokeWeight: 3,
    scale: 2,
    rotation: 90,
  };

  const lineSymbol = {
    path: "M -2,0 -2,-2 ",
    strokeOpacity: 1,
    scale: 4,
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
        offset: "0",
        repeat: "20px",
      },
      //   {
      //     icon: lineSymbol,
      //     offset: "0",
      //     repeat: "1px",
      //   },
    ],
    zIndex: 1,
  };

  return <Polyline onLoad={onLoad} path={path} options={options} />;
};
