import React, { useRef, useEffect, useState } from "react";

export const MapComponent = ({ center, zoom }) => {
  const [clickLatLng, setClickLatLng] = useState(center);
  const [map, setMap] = useState();

  const ref = useRef();

  /* useEffect(() => {
    const map = new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });
    new google.maps.Marker({
      position: center,
      map,
      title: "You are there",
    });

    map.addListener("click", (mapsMouseEvent) => {
      // console.log(JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2));
      setClickLatLng(mapsMouseEvent.latLng.toJSON());
      console.log(clickLatLng);
    });
  }); */

  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          center,
          zoom,
        })
      );
    }
  }, [ref, map]);

  return <div ref={ref} id="map" />;
};
