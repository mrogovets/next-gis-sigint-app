import React, { Fragment, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Stack, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Tooltip from "@mui/material/Tooltip";

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
    getDataHostileSource(
      { descriptionHostileSource, nameHostileSource },
      "add"
    );
    closeModalWindowHostileSource();
  };
  const onClickHandlerRewriteHostileSource = () => {
    setDescribeSource("");
    setNameSource("");
    getDataHostileSource(
      { descriptionHostileSource, nameHostileSource },
      "rewrite"
    );
    closeModalWindowHostileSource();
  };
  const onClickHandlerDeleteHostileSource = () => {
    setDescribeSource("");
    setNameSource("");
    getDataHostileSource(
      { descriptionHostileSource, nameHostileSource },
      "delete"
    );
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
            direction="row"
            spacing={1}
            mt={0.5}
            justifyContent="center"
            alignItems="center">
            <Tooltip title="Додати до переліку джерел" placement="top" arrow>
              <IconButton
                aria-label="add"
                color="primary"
                size="large"
                onClick={onClickHandlerAddHostileSource}>
                <AddCircleIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Зберегти зміни" placement="top" arrow>
              <IconButton
                aria-label="add"
                color="primary"
                size="large"
                onClick={onClickHandlerRewriteHostileSource}>
                <CheckCircleOutlineIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Видалити джерело" placement="top" arrow>
              <IconButton
                aria-label="delete"
                color="primary"
                size="large"
                onClick={onClickHandlerDeleteHostileSource}>
                <DeleteIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>
      </Modal>
    </Fragment>
  );
}
