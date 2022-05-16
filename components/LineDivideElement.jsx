import React, { useState } from "react";
import { Polyline } from "@react-google-maps/api";
import { Menu, MenuItem } from "@mui/material";

export const LineDevideElement = ({
  path = [],
  colorOfLineDivide,
  idLineDevideElementContextMenuMap,
  getIdLineDevideElementContextMenuMap,
  getContextMenuCommandLineDevide,
}) => {
  const onLoad = (polyline) => {
    // console.log("polyline: ", polyline);
  };

  const curveLine = {
    // path: "M0,10 C1,0 9,0 10,10 ",
    path: "M-5,5 C-3,-8 6,-2 5,5 ",
    strokeOpacity: 1,
    strokeWeight: 3,
    scale: 2,
    rotation: 90,
  };

  const startSymbol = {
    path: "M 2,6.5 a5 5 0 1 1-10 0 5 5 0 1 1 10 0 M 1.5,6 -8,7.5 M -2,11 -4,2 z",
    strokeOpacity: 1,
    scale: 2.5,
  };
  const endSymbol = {
    path: "M 1.5,-9 a5 5 0 1 1-10 0 5 5 0 1 1 10 0 M 1.5,-9 -8,-9 M -4,-4 -3,-13 z",
    strokeOpacity: 1,
    scale: 2.5,
  };

  const [contextMenu, setContextMenu] = useState(null);
  const [editableProperty, setEditableProperty] = useState(false);

  const options = {
    strokeColor: `${
      colorOfLineDivide === "hostileLineDivide" ? "tomato" : "blue"
    }`,
    strokeOpacity: 0,
    strokeWeight: 3,
    fillColor: `${
      colorOfLineDivide === "hostileLineDivide" ? "tomato" : "blue"
    }`,
    fillOpacity: 0.35,
    clickable: true,
    draggable: false,
    editable: editableProperty,
    visible: true,
    radius: 3,
    icons: [
      {
        icon: curveLine,
        repeat: "20px",
      },
      {
        icon: startSymbol,
        offset: "0%",
      },
      {
        icon: endSymbol,
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

    getIdLineDevideElementContextMenuMap(idLineDevideElementContextMenuMap);
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
            getContextMenuCommandLineDevide("INFO");
            handleClose();
          }}>
          Інформація про смугу розмежування
        </MenuItem>
        <MenuItem
          onClick={() => {
            // getItemMarkerContextMenu("DELETE");
            setEditableProperty(true);
            getContextMenuCommandLineDevide("EDIT");
            handleClose();
          }}>
          Редагувати смугу розмежування
        </MenuItem>
        <MenuItem
          onClick={() => {
            // getItemMarkerContextMenu("DELETE");
            getContextMenuCommandLineDevide("DELETE");
            handleClose();
          }}>
          Видалити смугу розмежування
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};
