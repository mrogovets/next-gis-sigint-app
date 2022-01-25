import React from "react";

export const SideBarMenu = ({ SBMenuOpen }) => {
  return (
    <div
      style={{
        marginTop: "64px",
        display: `${SBMenuOpen ? "block" : "none"}`,
      }}>
      <h1>SideBarMenu</h1>
    </div>
  );
};
