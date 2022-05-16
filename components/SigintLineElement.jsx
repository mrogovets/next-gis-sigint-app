import React, { useState } from "react";
import { Polyline } from "@react-google-maps/api";
import { Menu, MenuItem } from "@mui/material";

export const SigintLineElement = ({
  path = [],
  colorOfStripSigInt,
  idSigintLineElementContextMenuMap,
  getIdSigintLineElementContextMenuMap,
  getContextMenuCommandSigintLine,
}) => {
  const onLoad = (polyline) => {
    // console.log("polyline: ", polyline);
  };

  // console.log("Color: ", colorOfStripSigInt);

  const lineSymbolDashed = {
    path: "M 0,-1 0,1 ",
    strokeOpacity: 1,
    scale: 4,
  };

  const lineSymbol = {
    path: "M -2,0 -2,-2 ",
    strokeOpacity: 1,
    scale: 4,
  };

  const [contextMenu, setContextMenu] = useState(null);

  const [editableProperty, setEditableProperty] = useState(false);

  const options = {
    strokeColor: `${
      colorOfStripSigInt === "hostileStripSigInt" ? "tomato" : "blue"
    }`,
    strokeOpacity: 0,
    strokeWeight: 3,
    fillColor: `${
      colorOfStripSigInt === "hostileStripSigInt" ? "tomato" : "blue"
    }`,
    fillOpacity: 0.35,
    clickable: true,
    draggable: false,
    editable: editableProperty,
    visible: true,
    radius: 3,
    icons: [
      {
        icon: lineSymbolDashed,
        offset: "0",
        repeat: "20px",
      },
      {
        icon: lineSymbol,
        offset: "0",
        repeat: "1px",
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

    getIdSigintLineElementContextMenuMap(idSigintLineElementContextMenuMap);
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
            getContextMenuCommandSigintLine("INFO");
            handleClose();
          }}>
          Інформація про смугу розвідки
        </MenuItem>
        <MenuItem
          onClick={() => {
            // getItemMarkerContextMenu("DELETE");
            setEditableProperty(true);
            getContextMenuCommandSigintLine("EDIT");
            handleClose();
          }}>
          Редагувати смугу розвідки
        </MenuItem>
        <MenuItem
          onClick={() => {
            // getItemMarkerContextMenu("DELETE");
            getContextMenuCommandSigintLine("DELETE");
            handleClose();
          }}>
          Видалити смугу розвідки
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};
