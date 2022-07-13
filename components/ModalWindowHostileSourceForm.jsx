import React, { Fragment, useEffect, useState } from "react";
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

export default function ModalWindowHostileSourceForm({
  openModalWindowHostileSource,
  closeModalWindowHostileSource,
  getDataHostileSource,
  dataHostileSource,
}) {
  const [descriptionHostileSource, setDescribeSource] = useState("");
  const [nameHostileSource, setNameSource] = useState("");

  const handleChangeDescribeSource = (event) => {
    setDescribeSource(event.target.value);
  };
  const handleChangeNameSource = (event) => {
    setNameSource(event.target.value);
  };
  const onClickHandlerAddHostileSource = () => {
    setDescribeSource("");
    setNameSource("");
    getDataHostileSource({ descriptionHostileSource, nameHostileSource });
    closeModalWindowHostileSource();
  };

  useEffect(() => {
    if (dataHostileSource) {
      setNameSource(dataHostileSource.nameHostileSource);
      setDescribeSource(dataHostileSource.descriptionHostileSource);
    }
  }, [dataHostileSource]);

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
          <Stack
            display={"flex"}
            flexDirection={"row"}
            alignContent={"start"}
            mt={1}>
            <Button
              variant="contained"
              onClick={onClickHandlerAddHostileSource}>
              Додати до переліку джерел
            </Button>
            <Button
              variant="contained"
              onClick={onClickHandlerAddHostileSource}>
              Оновити інформацію
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Fragment>
  );
}
