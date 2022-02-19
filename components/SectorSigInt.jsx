import { Polyline } from "@react-google-maps/api";

export const SectorSigInt = ({ path = [], colorOfSectorSigInt }) => {
  const onLoad = (polyline) => {
    // console.log("polyline: ", polyline);
  };

  // https://danmarshall.github.io/google-font-to-svg-path/

  const sectorArrow = {
    path: "M 13.989 7.109 L 12.1 4.067 L 9.634 4.067 L 9.634 7.109 L 9.37 7.109 L 9.37 0 L 11.636 0 A 3.356 3.356 0 0 1 12.344 0.071 Q 12.931 0.197 13.337 0.552 A 1.813 1.813 0 0 1 13.953 1.751 A 2.57 2.57 0 0 1 13.97 2.051 A 1.932 1.932 0 0 1 13.518 3.323 A 1.911 1.911 0 0 1 12.368 3.999 L 14.268 7.041 L 14.268 7.109 L 13.989 7.109 Z M 5.356 7.109 L 4.561 4.985 L 1.079 4.985 L 0.288 7.109 L 0 7.109 L 2.661 0 L 2.983 0 L 5.645 7.109 L 5.356 7.109 Z M 7.246 0 L 7.246 7.109 L 6.982 7.109 L 6.982 0 L 7.246 0 Z M 9.634 0.264 L 9.634 3.804 L 11.875 3.804 A 2.2 2.2 0 0 0 12.468 3.728 A 1.663 1.663 0 0 0 13.201 3.306 Q 13.706 2.808 13.706 2.051 A 1.986 1.986 0 0 0 13.627 1.478 A 1.528 1.528 0 0 0 13.147 0.742 A 1.884 1.884 0 0 0 12.414 0.362 Q 12.135 0.285 11.805 0.268 A 3.705 3.705 0 0 0 11.616 0.264 L 9.634 0.264 Z M 2.822 0.317 L 1.177 4.722 L 4.463 4.722 L 2.822 0.317 Z",
    strokeColor: `${
      colorOfSectorSigInt === "hostileSectorSigInt" ? "tomato" : "blue"
    }`,
    fillColor: `${
      colorOfSectorSigInt === "hostileSectorSigInt" ? "tomato" : "blue"
    }`,
    fillOpacity: 1,
    scale: 2,
    rotation: 180,
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
