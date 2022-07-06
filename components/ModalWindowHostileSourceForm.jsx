import React, { Fragment, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function BasicModalHostileSource({
  openModalWindowHostileSource,
  closeModalWindowHostileSource,
}) {
  return (
    <Fragment>
      <Modal
        hideBackdrop
        open={openModalWindowHostileSource}
        onClose={closeModalWindowHostileSource}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description">
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={closeModalWindowHostileSource}>
            Close Child Modal
          </Button>
        </Box>
      </Modal>
    </Fragment>
  );
}
