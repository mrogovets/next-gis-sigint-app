import React from "react";
import Box from "@mui/material/Box";

export const SideBarMenu = ({ SBMenuOpen }) => {
  return (
    <Box
      sx={{
        width: 300,
        height: 450,
        backgroundColor: "white",
        opacity: [0.9, 0.8, 0.7],
        "&:hover": {
          backgroundColor: "white.dark",
          opacity: [1],
        },
        display: `${SBMenuOpen ? "block" : "none"}`,
        zIndex: 999,
        position: "fixed",
      }}
    />
  );
};
