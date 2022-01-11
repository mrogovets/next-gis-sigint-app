import React, { useRef, useEffect, useState } from "react";

export const MapComponent = ({ center, zoom }) => {
  const ref = useRef();

  useEffect(() => {
    const map = new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });
    const marker = new google.maps.Marker({
      position: center,
      map,
      title: "You are there",
    });

    map.addListener("click", (mapsMouseEvent) => {
      console.log(mapsMouseEvent.latLng.lat);
    });
  });

  return <div ref={ref} id="map" />;
};
