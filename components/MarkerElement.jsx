import { Marker } from "@react-google-maps/api";

export const MarkerElement = ({ position, icon, onClick }) => {
  const coordMarker = {
    lat: parseFloat(position.lat),
    lng: parseFloat(position.lng),
  };

  return <Marker position={coordMarker} icon={icon} onClick={onClick} />;
};
