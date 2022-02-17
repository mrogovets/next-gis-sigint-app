import { Polyline } from "@react-google-maps/api";

export const DistanceSigIntVHFAir = ({
  path = [],
  colorOfDistanceSigIntVHFAir,
}) => {
  const onLoad = (polyline) => {
    // console.log("polyline: ", polyline);
  };

  // https://danmarshall.github.io/google-font-to-svg-path/

  const textIconVHF = {
    path: "M 11.846 0 L 11.846 7.109 L 11.582 7.109 L 11.582 3.584 L 7.041 3.584 L 7.041 7.109 L 6.777 7.109 L 6.777 0 L 7.041 0 L 7.041 3.32 L 11.582 3.32 L 11.582 0 L 11.846 0 Z M 0.288 0 L 2.676 6.416 L 2.817 6.846 L 2.959 6.416 L 5.347 0 L 5.635 0 L 2.979 7.109 L 2.656 7.109 L 0 0 L 0.288 0 Z M 17.705 3.34 L 17.705 3.613 L 14.063 3.613 L 14.063 7.109 L 13.799 7.109 L 13.799 0 L 18.203 0 L 18.203 0.264 L 14.063 0.264 L 14.063 3.34 L 17.705 3.34 Z",
    strokeColor: `${
      colorOfDistanceSigIntVHFAir === "hostileDistanceSigIntVHFAir"
        ? "tomato"
        : "blue"
    }`,
    fillColor: `${
      colorOfDistanceSigIntVHFAir === "hostileDistanceSigIntVHFAir"
        ? "tomato"
        : "blue"
    }`,
    fillOpacity: 1,
    scale: 2,
    rotation: 180,
  };

  const textIconAIR = {
    path: "M 13.989 7.109 L 12.1 4.067 L 9.634 4.067 L 9.634 7.109 L 9.37 7.109 L 9.37 0 L 11.636 0 A 3.356 3.356 0 0 1 12.344 0.071 Q 12.931 0.197 13.337 0.552 A 1.813 1.813 0 0 1 13.953 1.751 A 2.57 2.57 0 0 1 13.97 2.051 A 1.932 1.932 0 0 1 13.518 3.323 A 1.911 1.911 0 0 1 12.368 3.999 L 14.268 7.041 L 14.268 7.109 L 13.989 7.109 Z M 5.356 7.109 L 4.561 4.985 L 1.079 4.985 L 0.288 7.109 L 0 7.109 L 2.661 0 L 2.983 0 L 5.645 7.109 L 5.356 7.109 Z M 7.246 0 L 7.246 7.109 L 6.982 7.109 L 6.982 0 L 7.246 0 Z M 9.634 0.264 L 9.634 3.804 L 11.875 3.804 A 2.2 2.2 0 0 0 12.468 3.728 A 1.663 1.663 0 0 0 13.201 3.306 Q 13.706 2.808 13.706 2.051 A 1.986 1.986 0 0 0 13.627 1.478 A 1.528 1.528 0 0 0 13.147 0.742 A 1.884 1.884 0 0 0 12.414 0.362 Q 12.135 0.285 11.805 0.268 A 3.705 3.705 0 0 0 11.616 0.264 L 9.634 0.264 Z M 2.822 0.317 L 1.177 4.722 L 4.463 4.722 L 2.822 0.317 Z",
    strokeColor: `${
      colorOfDistanceSigIntVHFAir === "hostileDistanceSigIntVHFAir"
        ? "tomato"
        : "blue"
    }`,
    fillColor: `${
      colorOfDistanceSigIntVHFAir === "hostileDistanceSigIntVHFAir"
        ? "tomato"
        : "blue"
    }`,
    fillOpacity: 1,
    scale: 2,
    rotation: 180,
  };

  const options = {
    strokeColor: `${
      colorOfDistanceSigIntVHFAir === "hostileDistanceSigIntVHFAir"
        ? "tomato"
        : "blue"
    }`,
    strokeOpacity: 1,
    strokeWeight: 4,
    fillColor: `${
      colorOfDistanceSigIntVHFAir === "hostileDistanceSigIntVHFAir"
        ? "tomato"
        : "blue"
    }`,
    fillOpacity: 1,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 3,
    icons: [
      {
        icon: textIconVHF,
        offset: "45%",
      },
      {
        icon: textIconAIR,
        offset: "55%",
      },
    ],
    zIndex: 1,
  };

  return <Polyline onLoad={onLoad} path={path} options={options} />;
};
