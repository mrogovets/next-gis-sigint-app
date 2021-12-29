import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
const LocatorButton = ({ mapObject }) => {
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        mapObject.setCenter(userLocation);
      });
    } else {
      // code for legacy browsers
    }
  };

  return (
    <button type="button" onClick={getUserLocation}>
      <FontAwesomeIcon icon={faLocationArrow} />
    </button>
  );
};
LocatorButton.propTypes = {
  mapObject: PropTypes.object,
};
export default LocatorButton;
