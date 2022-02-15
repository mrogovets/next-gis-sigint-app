import { Polyline } from "@react-google-maps/api";

export const DistanceSigIntHF = ({ path = [], colorOfDistanceSigIntHF }) => {
  const onLoad = (polyline) => {
    // console.log("polyline: ", polyline);
  };

  // https://danmarshall.github.io/google-font-to-svg-path/

  const textIcon = {
    path: "M 5.068 0 L 5.068 7.109 L 4.805 7.109 L 4.805 3.584 L 0.264 3.584 L 0.264 7.109 L 0 7.109 L 0 0 L 0.264 0 L 0.264 3.32 L 4.805 3.32 L 4.805 0 L 5.068 0 Z M 10.928 3.34 L 10.928 3.613 L 7.285 3.613 L 7.285 7.109 L 7.021 7.109 L 7.021 0 L 11.426 0 L 11.426 0.264 L 7.285 0.264 L 7.285 3.34 L 10.928 3.34 Z",
    strokeColor: `${
      colorOfDistanceSigIntHF === "hostileDistanceSigIntHF" ? "tomato" : "blue"
    }`,
    fillColor: `${
      colorOfDistanceSigIntHF === "hostileDistanceSigIntHF" ? "tomato" : "blue"
    }`,
    fillOpacity: 1,
    scale: 2,
    rotation: 180,
  };

  const options = {
    strokeColor: `${
      colorOfDistanceSigIntHF === "hostileDistanceSigIntHF" ? "tomato" : "blue"
    }`,
    strokeOpacity: 1,
    strokeWeight: 4,
    fillColor: `${
      colorOfDistanceSigIntHF === "hostileDistanceSigIntHF" ? "tomato" : "blue"
    }`,
    fillOpacity: 1,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 3,
    icons: [
      {
        icon: textIcon,
        offset: "100%",
      },
    ],
    zIndex: 1,
  };

  return <Polyline onLoad={onLoad} path={path} options={options} />;
};
