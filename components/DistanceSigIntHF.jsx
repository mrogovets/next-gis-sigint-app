import React, { useState } from "react";
import { Polyline } from "@react-google-maps/api";
import { Menu, MenuItem } from "@mui/material";

export const DistanceSigIntHF = ({
  path = [],
  colorOfDistanceSigIntHF,
  idDistanceSigIntHFContextMenuMap,
  getIdDistanceSigIntHFContextMenuMap,
  getContextMenuCommandDistanceSigIntHF,
}) => {
  const onLoad = (polyline) => {
    // console.log("polyline: ", polyline);
  };

  // https://danmarshall.github.io/google-font-to-svg-path/

  const textIcon = {
    path: "M 5.068 0 L 5.068 7.109 L 4.805 7.109 L 4.805 3.584 L 0.264 3.584 L 0.264 7.109 L 0 7.109 L 0 0 L 0.264 0 L 0.264 3.32 L 4.805 3.32 L 4.805 0 L 5.068 0 Z M 10.928 3.34 L 10.928 3.613 L 7.285 3.613 L 7.285 7.109 L 7.021 7.109 L 7.021 0 L 11.426 0 L 11.426 0.264 L 7.285 0.264 L 7.285 3.34 L 10.928 3.34 Z",
    strokeColor: `${
      colorOfDistanceSigIntHF === "hostileDistanceSigIntHF" ? "tomato" : "blue"
    }`,
    fillColor: `${
      colorOfDistanceSigIntHF === "hostileDistanceSigIntHF" ? "tomato" : "blue"
    }`,
    fillOpacity: 1,
    scale: 2,
    rotation: 180,
  };

  const [contextMenu, setContextMenu] = useState(null);
  const [editableProperty, setEditableProperty] = useState(false);

  const options = {
    strokeColor: `${
      colorOfDistanceSigIntHF === "hostileDistanceSigIntHF" ? "tomato" : "blue"
    }`,
    strokeOpacity: 1,
    strokeWeight: 4,
    fillColor: `${
      colorOfDistanceSigIntHF === "hostileDistanceSigIntHF" ? "tomato" : "blue"
    }`,
    fillOpacity: 1,
    clickable: true,
    draggable: false,
    editable: editableProperty,
    visible: true,
    radius: 3,
    icons: [
      {
        icon: textIcon,
        offset: "50%",
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
    getIdDistanceSigIntHFContextMenuMap(idDistanceSigIntHFContextMenuMap);
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
            getContextMenuCommandDistanceSigIntHF("INFO");
            handleClose();
          }}>
          Інформація про лінію дальності розвідки в КХ діапазоні
        </MenuItem>
        <MenuItem
          onClick={() => {
            // getItemMarkerContextMenu("DELETE");
            setEditableProperty(true);
            getContextMenuCommandDistanceSigIntHF("EDIT");
            handleClose();
          }}>
          Редагувати лінію дальності розвідки в КХ діапазоні
        </MenuItem>
        <MenuItem
          onClick={() => {
            // getItemMarkerContextMenu("DELETE");
            getContextMenuCommandDistanceSigIntHF("DELETE");
            handleClose();
          }}>
          Видалити лінію дальності розвідки в КХ діапазоні
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};
