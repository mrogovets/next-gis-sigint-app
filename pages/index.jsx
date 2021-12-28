import React, { useState } from "react";
import LocatorButton from "../components/LocatorButton";
import Map from "../components/Map";

function HomePage() {
  const [mapObject, setMapObject] = useState(null);
  return (
    <React.Fragment>
      <LocatorButton mapObject={mapObject} />
      <Map setMapObject={setMapObject} />
    </React.Fragment>
  );
}
export default HomePage;
