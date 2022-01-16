import { useEffect, useState } from "react";
import { Marker } from "@react-google-maps/api";

export const MarkerElement = ({ position }) => {
  return <Marker position={position} />;
};
