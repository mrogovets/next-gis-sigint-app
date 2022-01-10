import React, { useRef, useEffect, useState } from "react";

export const MapComponent = ({ center, zoom }) => {
  const ref = useRef();

  useEffect(() => {
    new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });
  });
  return <div ref={ref} id="map" />;
};
