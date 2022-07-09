import React, { Fragment, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { Stack, TextField, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 430,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  pt: 1,
  "& .MuiTextField-root": { m: 0.7, width: "100%" },
  "& .MuiContainer-root": {
    border: 1,
    borderColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: "4px",
    m: 0.7,
  },
};

export default function BasicModalHostileSource({
  openModalWindowHostileSource,
  closeModalWindowHostileSource,
  getDataHostileSource,
}) {
  const [descriptionHostileSource, setDescribeSource] = useState("");
  const [nameHostileSource, setNameSource] = useState("");

  const handleChangeDescribeSource = (event) => {
    setDescribeSource(event.target.value);
  };
  const handleChangeNameSource = (event) => {
    setNameSource(event.target.value);
  };
  const onClickHandler = () => {
    setDescribeSource("");
    setNameSource("");
    getDataHostileSource({ descriptionHostileSource, nameHostileSource });
    closeModalWindowHostileSource();
  };
  return (
    <Fragment>
      <Modal
        hideBackdrop
        open={openModalWindowHostileSource}
        onClose={closeModalWindowHostileSource}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description">
        <Box sx={{ ...style, width: 350 }}>
          <Stack marginTop={0.8} sx={{ width: ".5rem", ml: "15rem" }}>
            <Button variant="outlined" onClick={closeModalWindowHostileSource}>
              <CloseIcon fontSize="medium" />
            </Button>
          </Stack>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ textAlign: "center" }}>
            Формуляр джерела РЕР
          </Typography>
          <TextField
            id="outlined-textarea"
            label="Найменування джерела РЕР"
            placeholder="Введіть найменування джерела РЕР"
            value={nameHostileSource}
            onChange={handleChangeNameSource}
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Еталонний опис джерела РЕР"
            multiline
            rows={7}
            placeholder="Введіть еталонний джерела РЕР"
            value={descriptionHostileSource}
            onChange={handleChangeDescribeSource}
          />
          <Stack alignContent={"center"} marginLeft={1.3} mt={2}>
            <Button variant="contained" onClick={onClickHandler}>
              Додати до переліку джерел
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Fragment>
  );
}