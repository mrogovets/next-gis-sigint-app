import React, { useState } from "react";
import { Polyline } from "@react-google-maps/api";
import { Menu, MenuItem } from "@mui/material";

export const SectorSigInt = ({
  path = [],
  colorOfSectorSigInt,
  idSectorSigIntContextMenuMap,
  getIdSectorSigIntContextMenuMap,
  getContextMenuCommandSectorSigInt,
}) => {
  const onLoad = (polyline) => {
    // console.log("polyline: ", polyline);
  };

  // https://danmarshall.github.io/google-font-to-svg-path/

  const sectorArrow = {
    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
    strokeColor: `${
      colorOfSectorSigInt === "hostileSectorSigInt" ? "tomato" : "blue"
    }`,
    fillColor: `${
      colorOfSectorSigInt === "hostileSectorSigInt" ? "tomato" : "blue"
    }`,
    fillOpacity: 1,
    scale: 3,
    rotation: 0,
  };

  const [contextMenu, setContextMenu] = useState(null);
  const [editableProperty, setEditableProperty] = useState(false);

  const options = {
    strokeColor: `${
      colorOfSectorSigInt === "hostileSectorSigInt" ? "tomato" : "blue"
    }`,
    strokeOpacity: 1,
    strokeWeight: 4,
    fillColor: `${
      colorOfSectorSigInt === "hostileSectorSigInt" ? "tomato" : "blue"
    }`,
    fillOpacity: 1,
    clickable: true,
    draggable: false,
    editable: editableProperty,
    visible: true,
    radius: 3,
    icons: [
      {
        icon: sectorArrow,
        offset: "100%",
      },
    ],
    zIndex: 1,
  };

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
    getIdSectorSigIntContextMenuMap(idSectorSigIntContextMenuMap);
  };
  const handleClose = () => {
    setContextMenu(null);
    document.oncontextmenu = () => {
      return true;
    };
  };

  return (
    <React.Fragment>
      <Polyline
        onRightClick={(e) => handleContextMenu(e)}
        onLoad={onLoad}
        path={path}
        options={options}
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
            // getItemMarkerContextMenu("READ");
            getContextMenuCommandSectorSigInt("INFO");
            handleClose();
          }}>
          Інформація про сектор розвідки
        </MenuItem>
        <MenuItem
          onClick={() => {
            setEditableProperty(true);
            getContextMenuCommandSectorSigInt("EDIT");
            handleClose();
          }}>
          Редагувати сектор розвідки
        </MenuItem>
        <MenuItem
          onClick={() => {
            getContextMenuCommandSectorSigInt("DELETE");
            handleClose();
          }}>
          Видалити сектор розвідки
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};
