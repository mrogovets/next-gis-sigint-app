import React, { useState } from "react";
import { Polyline } from "@react-google-maps/api";
import { Menu, MenuItem } from "@mui/material";

export const DistanceSigIntRdrAir = ({
  path = [],
  colorOfDistanceSigIntRdrAir,
  idDistanceSigIntRdrAirContextMenuMap,
  getIdDistanceSigIntRdrAirContextMenuMap,
  getContextMenuCommandDistanceSigIntRdrAir,
}) => {
  const onLoad = (polyline) => {
    // console.log("polyline: ", polyline);
  };

  // https://danmarshall.github.io/google-font-to-svg-path/

  const textIconRDR = {
    path: "M 4.619 7.109 L 2.729 4.067 L 0.264 4.067 L 0.264 7.109 L 0 7.109 L 0 0 L 2.266 0 A 3.356 3.356 0 0 1 2.974 0.071 Q 3.561 0.197 3.967 0.552 A 1.813 1.813 0 0 1 4.583 1.751 A 2.57 2.57 0 0 1 4.6 2.051 A 1.932 1.932 0 0 1 4.148 3.323 A 1.911 1.911 0 0 1 2.998 3.999 L 4.897 7.041 L 4.897 7.109 L 4.619 7.109 Z M 17.705 7.109 L 15.815 4.067 L 13.35 4.067 L 13.35 7.109 L 13.086 7.109 L 13.086 0 L 15.352 0 A 3.356 3.356 0 0 1 16.06 0.071 Q 16.647 0.197 17.053 0.552 A 1.813 1.813 0 0 1 17.669 1.751 A 2.57 2.57 0 0 1 17.686 2.051 A 1.932 1.932 0 0 1 17.234 3.323 A 1.911 1.911 0 0 1 16.084 3.999 L 17.983 7.041 L 17.983 7.109 L 17.705 7.109 Z M 8.56 7.109 L 6.567 7.109 L 6.567 0 L 8.535 0 A 2.999 2.999 0 0 1 9.607 0.189 A 2.813 2.813 0 0 1 10.029 0.391 A 2.758 2.758 0 0 1 11.079 1.487 A 3.276 3.276 0 0 1 11.458 2.797 A 3.927 3.927 0 0 1 11.47 3.067 L 11.47 3.989 A 3.635 3.635 0 0 1 11.338 4.983 A 3.159 3.159 0 0 1 11.096 5.591 Q 10.723 6.304 10.054 6.704 A 2.877 2.877 0 0 1 8.611 7.109 A 3.408 3.408 0 0 1 8.56 7.109 Z M 8.574 0.264 L 6.831 0.264 L 6.831 6.846 L 8.535 6.846 Q 9.282 6.846 9.895 6.482 A 2.543 2.543 0 0 0 10.854 5.466 A 3.031 3.031 0 0 0 11.201 4.191 A 3.593 3.593 0 0 0 11.206 4.019 L 11.206 3.106 A 3.227 3.227 0 0 0 11.067 2.146 A 2.896 2.896 0 0 0 10.867 1.66 Q 10.527 1.011 9.919 0.642 A 2.613 2.613 0 0 0 8.574 0.264 Z M 0.264 0.264 L 0.264 3.804 L 2.505 3.804 A 2.2 2.2 0 0 0 3.098 3.728 A 1.663 1.663 0 0 0 3.831 3.306 Q 4.336 2.808 4.336 2.051 A 1.986 1.986 0 0 0 4.257 1.478 A 1.528 1.528 0 0 0 3.777 0.742 A 1.884 1.884 0 0 0 3.043 0.362 Q 2.765 0.285 2.435 0.268 A 3.705 3.705 0 0 0 2.246 0.264 L 0.264 0.264 Z M 13.35 0.264 L 13.35 3.804 L 15.591 3.804 A 2.2 2.2 0 0 0 16.184 3.728 A 1.663 1.663 0 0 0 16.917 3.306 Q 17.422 2.808 17.422 2.051 A 1.986 1.986 0 0 0 17.343 1.478 A 1.528 1.528 0 0 0 16.863 0.742 A 1.884 1.884 0 0 0 16.129 0.362 Q 15.851 0.285 15.521 0.268 A 3.705 3.705 0 0 0 15.332 0.264 L 13.35 0.264 Z",
    strokeColor: `${
      colorOfDistanceSigIntRdrAir === "hostileDistanceSigIntRdrAir"
        ? "tomato"
        : "blue"
    }`,
    fillColor: `${
      colorOfDistanceSigIntRdrAir === "hostileDistanceSigIntRdrAir"
        ? "tomato"
        : "blue"
    }`,
    fillOpacity: 1,
    scale: 2,
    rotation: 180,
  };

  const textIconAIR = {
    path: "M 13.989 7.109 L 12.1 4.067 L 9.634 4.067 L 9.634 7.109 L 9.37 7.109 L 9.37 0 L 11.636 0 A 3.356 3.356 0 0 1 12.344 0.071 Q 12.931 0.197 13.337 0.552 A 1.813 1.813 0 0 1 13.953 1.751 A 2.57 2.57 0 0 1 13.97 2.051 A 1.932 1.932 0 0 1 13.518 3.323 A 1.911 1.911 0 0 1 12.368 3.999 L 14.268 7.041 L 14.268 7.109 L 13.989 7.109 Z M 5.356 7.109 L 4.561 4.985 L 1.079 4.985 L 0.288 7.109 L 0 7.109 L 2.661 0 L 2.983 0 L 5.645 7.109 L 5.356 7.109 Z M 7.246 0 L 7.246 7.109 L 6.982 7.109 L 6.982 0 L 7.246 0 Z M 9.634 0.264 L 9.634 3.804 L 11.875 3.804 A 2.2 2.2 0 0 0 12.468 3.728 A 1.663 1.663 0 0 0 13.201 3.306 Q 13.706 2.808 13.706 2.051 A 1.986 1.986 0 0 0 13.627 1.478 A 1.528 1.528 0 0 0 13.147 0.742 A 1.884 1.884 0 0 0 12.414 0.362 Q 12.135 0.285 11.805 0.268 A 3.705 3.705 0 0 0 11.616 0.264 L 9.634 0.264 Z M 2.822 0.317 L 1.177 4.722 L 4.463 4.722 L 2.822 0.317 Z",
    strokeColor: `${
      colorOfDistanceSigIntRdrAir === "hostileDistanceSigIntRdrAir"
        ? "tomato"
        : "blue"
    }`,
    fillColor: `${
      colorOfDistanceSigIntRdrAir === "hostileDistanceSigIntRdrAir"
        ? "tomato"
        : "blue"
    }`,
    fillOpacity: 1,
    scale: 2,
    rotation: 180,
  };

  const [contextMenu, setContextMenu] = useState(null);
  const [editableProperty, setEditableProperty] = useState(false);

  const options = {
    strokeColor: `${
      colorOfDistanceSigIntRdrAir === "hostileDistanceSigIntRdrAir"
        ? "tomato"
        : "blue"
    }`,
    strokeOpacity: 1,
    strokeWeight: 4,
    fillColor: `${
      colorOfDistanceSigIntRdrAir === "hostileDistanceSigIntRdrAir"
        ? "tomato"
        : "blue"
    }`,
    fillOpacity: 1,
    clickable: true,
    draggable: false,
    editable: editableProperty,
    visible: true,
    radius: 3,
    icons: [
      {
        icon: textIconRDR,
        offset: "45%",
      },
      {
        icon: textIconAIR,
        offset: "55%",
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
    getIdDistanceSigIntRdrAirContextMenuMap(
      idDistanceSigIntRdrAirContextMenuMap
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
            getContextMenuCommandDistanceSigIntRdrAir("INFO");
            handleClose();
          }}>
          Інформація про лінію дальності розвідки бортових РЛС
        </MenuItem>
        <MenuItem
          onClick={() => {
            // getItemMarkerContextMenu("DELETE");
            setEditableProperty(true);
            getContextMenuCommandDistanceSigIntRdrAir("EDIT");
            handleClose();
          }}>
          Редагувати лінію дальності розвідки бортових РЛС
        </MenuItem>
        <MenuItem
          onClick={() => {
            // getItemMarkerContextMenu("DELETE");
            getContextMenuCommandDistanceSigIntRdrAir("DELETE");
            handleClose();
          }}>
          Видалити лінію дальності розвідки бортових РЛС
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};
