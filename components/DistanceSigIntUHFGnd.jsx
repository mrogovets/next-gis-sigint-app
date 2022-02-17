import { Polyline } from "@react-google-maps/api";

export const DistanceSigIntUHFGnd = ({
  path = [],
  colorOfDistanceSigIntUHFGnd,
}) => {
  const onLoad = (polyline) => {
    // console.log("polyline: ", polyline);
  };

  // https://danmarshall.github.io/google-font-to-svg-path/

  const textIconUHF = {
    path: "M 11.807 0 L 11.807 7.109 L 11.543 7.109 L 11.543 3.584 L 7.002 3.584 L 7.002 7.109 L 6.738 7.109 L 6.738 0 L 7.002 0 L 7.002 3.32 L 11.543 3.32 L 11.543 0 L 11.807 0 Z M 4.595 0 L 4.858 0 L 4.858 4.814 A 3.133 3.133 0 0 1 4.781 5.531 A 2.074 2.074 0 0 1 4.204 6.575 A 2.183 2.183 0 0 1 3.146 7.132 A 3.226 3.226 0 0 1 2.432 7.207 A 3.199 3.199 0 0 1 1.688 7.125 A 2.175 2.175 0 0 1 0.659 6.575 A 2.099 2.099 0 0 1 0.068 5.488 A 3.109 3.109 0 0 1 0 4.834 L 0 0 L 0.264 0 L 0.264 4.805 A 2.648 2.648 0 0 0 0.344 5.474 A 1.88 1.88 0 0 0 0.857 6.367 A 1.997 1.997 0 0 0 1.91 6.898 A 2.853 2.853 0 0 0 2.432 6.943 Q 3.413 6.943 4.004 6.367 A 1.909 1.909 0 0 0 4.543 5.352 A 2.785 2.785 0 0 0 4.595 4.8 L 4.595 0 Z M 17.666 3.34 L 17.666 3.613 L 14.023 3.613 L 14.023 7.109 L 13.76 7.109 L 13.76 0 L 18.164 0 L 18.164 0.264 L 14.023 0.264 L 14.023 3.34 L 17.666 3.34 Z",
    strokeColor: `${
      colorOfDistanceSigIntUHFGnd === "hostileDistanceSigIntUHFGnd"
        ? "tomato"
        : "blue"
    }`,
    fillColor: `${
      colorOfDistanceSigIntUHFGnd === "hostileDistanceSigIntUHFGnd"
        ? "tomato"
        : "blue"
    }`,
    fillOpacity: 1,
    scale: 2,
    rotation: 180,
  };

  const textIconGND = {
    path: "M 12.144 0.098 L 12.144 7.207 L 11.88 7.207 L 7.29 0.547 L 7.29 7.207 L 7.022 7.207 L 7.022 0.098 L 7.29 0.098 L 11.88 6.743 L 11.88 0.098 L 12.144 0.098 Z M 5.166 3.984 L 5.166 6.445 A 1.286 1.286 0 0 1 4.894 6.716 Q 4.756 6.82 4.576 6.911 A 3.252 3.252 0 0 1 4.224 7.061 A 4.095 4.095 0 0 1 3.209 7.283 A 5.006 5.006 0 0 1 2.739 7.305 Q 1.948 7.305 1.328 6.919 A 2.587 2.587 0 0 1 0.427 5.959 A 3.121 3.121 0 0 1 0.359 5.83 A 3.432 3.432 0 0 1 0.032 4.724 A 4.262 4.262 0 0 1 0 4.238 L 0 3.018 A 3.891 3.891 0 0 1 0.101 2.116 A 3.222 3.222 0 0 1 0.337 1.45 A 2.646 2.646 0 0 1 0.865 0.707 A 2.427 2.427 0 0 1 1.284 0.379 A 2.539 2.539 0 0 1 2.603 0.001 A 3.036 3.036 0 0 1 2.656 0 A 3.384 3.384 0 0 1 3.41 0.08 A 2.343 2.343 0 0 1 4.382 0.542 A 2.085 2.085 0 0 1 5.121 1.793 A 2.784 2.784 0 0 1 5.156 2.022 L 4.893 2.022 A 2.415 2.415 0 0 0 4.722 1.418 A 1.795 1.795 0 0 0 4.185 0.718 Q 3.608 0.264 2.656 0.264 A 2.436 2.436 0 0 0 1.81 0.405 A 2.125 2.125 0 0 0 0.923 1.03 A 2.645 2.645 0 0 0 0.353 2.194 A 3.871 3.871 0 0 0 0.264 3.047 L 0.264 4.18 A 3.845 3.845 0 0 0 0.349 5.004 A 3.093 3.093 0 0 0 0.574 5.669 A 2.513 2.513 0 0 0 1.031 6.342 A 2.258 2.258 0 0 0 1.448 6.682 A 2.308 2.308 0 0 0 2.56 7.035 A 2.832 2.832 0 0 0 2.739 7.041 Q 3.452 7.041 4.063 6.831 A 3.223 3.223 0 0 0 4.376 6.706 Q 4.69 6.559 4.856 6.378 A 0.848 0.848 0 0 0 4.902 6.323 L 4.902 4.253 L 2.73 4.253 L 2.73 3.984 L 5.166 3.984 Z M 16.089 7.207 L 14.097 7.207 L 14.097 0.098 L 16.065 0.098 A 2.999 2.999 0 0 1 17.137 0.287 A 2.813 2.813 0 0 1 17.559 0.488 A 2.758 2.758 0 0 1 18.608 1.585 A 3.276 3.276 0 0 1 18.987 2.895 A 3.927 3.927 0 0 1 18.999 3.164 L 18.999 4.087 A 3.635 3.635 0 0 1 18.867 5.08 A 3.159 3.159 0 0 1 18.626 5.689 Q 18.252 6.401 17.583 6.802 A 2.877 2.877 0 0 1 16.14 7.206 A 3.408 3.408 0 0 1 16.089 7.207 Z M 16.104 0.361 L 14.36 0.361 L 14.36 6.943 L 16.065 6.943 Q 16.812 6.943 17.424 6.58 A 2.543 2.543 0 0 0 18.384 5.564 A 3.031 3.031 0 0 0 18.73 4.289 A 3.593 3.593 0 0 0 18.735 4.116 L 18.735 3.203 A 3.227 3.227 0 0 0 18.596 2.244 A 2.896 2.896 0 0 0 18.396 1.758 Q 18.057 1.108 17.449 0.74 A 2.613 2.613 0 0 0 16.104 0.361 Z",
    strokeColor: `${
      colorOfDistanceSigIntUHFGnd === "hostileDistanceSigIntUHFGnd"
        ? "tomato"
        : "blue"
    }`,
    fillColor: `${
      colorOfDistanceSigIntUHFGnd === "hostileDistanceSigIntUHFGnd"
        ? "tomato"
        : "blue"
    }`,
    fillOpacity: 1,
    scale: 2,
    rotation: 180,
  };

  const options = {
    strokeColor: `${
      colorOfDistanceSigIntUHFGnd === "hostileDistanceSigIntUHFGnd"
        ? "tomato"
        : "blue"
    }`,
    strokeOpacity: 1,
    strokeWeight: 4,
    fillColor: `${
      colorOfDistanceSigIntUHFGnd === "hostileDistanceSigIntUHFGnd"
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
        icon: textIconUHF,
        offset: "45%",
      },
      {
        icon: textIconGND,
        offset: "55%",
      },
    ],
    zIndex: 1,
  };

  return <Polyline onLoad={onLoad} path={path} options={options} />;
};
