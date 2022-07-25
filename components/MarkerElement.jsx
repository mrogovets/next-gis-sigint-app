import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { Marker } from "@react-google-maps/api";

export const MarkerElement = ({
  idMarkerContextMenuMap,
  position,
  icon,
  getMarkerIDContextMenu,
  getItemMarkerContextMenu,
}) => {
  const coordMarker = {
    lat: parseFloat(position.lat),
    lng: parseFloat(position.lng),
  };

  const [contextMenu, setContextMenu] = useState(null);

  const handleContextMenu = (event) => {
    event.domEvent.preventDefault();
    document.oncontextmenu = () => {
      return false;
    };

    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.domEvent.x - 2,
            mouseY: event.domEvent.y - 4,
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null
    );
  };

  const handleClose = () => {
    setContextMenu(null);
    document.oncontextmenu = () => {
      return true;
    };
  };

  return (
    <React.Fragment>
      <Marker
        position={coordMarker}
        icon={icon}
        onRightClick={(e) => {
          getMarkerIDContextMenu(idMarkerContextMenuMap);
          handleContextMenu(e);
        }}
      />
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }>
        <MenuItem
          onClick={() => {
            handleClose;
            getItemMarkerContextMenu("READ");
            handleClose();
          }}>
          Формуляр об`єкту
        </MenuItem>
        <MenuItem
          onClick={() => {
            getItemMarkerContextMenu("DELETE");
            handleClose();
          }}>
          Видалити об`єкт
        </MenuItem>
        <MenuItem
          onClick={() => {
            getItemMarkerContextMenu("EMD");
            handleClose();
          }}>
          Зона ЕМД
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};
