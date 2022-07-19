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

export default function ModalWindowFriendMeansForm({
  openModalWindowFriendMeans,
  closeModalWindowFriendMeans,
  getDataFriendMeans,
  dataFriendMeans,
}) {
  const [descriptionFriendMeans, setDescriptionFriendMeans] = useState("");
  const [nameFriendMeans, setNameFriendMeans] = useState("");

  const handleChangeDescribeMeans = (event) => {
    setDescriptionFriendMeans(event.target.value);
  };
  const handleChangeNameMeans = (event) => {
    setNameFriendMeans(event.target.value);
  };
  const onClickHandlerAddFriendMeans = () => {
    setDescriptionFriendMeans("");
    setNameFriendMeans("");
    getDataFriendMeans({ descriptionFriendMeans, nameFriendMeans }, "add");
    closeModalWindowFriendMeans();
  };
  const onClickHandlerRewriteFriendMeans = () => {
    setDescriptionFriendMeans("");
    setNameFriendMeans("");
    getDataFriendMeans({ descriptionFriendMeans, nameFriendMeans }, "rewrite");
    closeModalWindowFriendMeans();
  };
  const onClickHandlerDeleteFriendMeans = () => {
    setDescriptionFriendMeans("");
    setNameFriendMeans("");
    getDataFriendMeans({ descriptionFriendMeans, nameFriendMeans }, "delete");
    closeModalWindowFriendMeans();
  };

  useEffect(() => {
    if (dataFriendMeans) {
      setNameFriendMeans(dataFriendMeans.nameFriendMeans);
      setDescriptionFriendMeans(dataFriendMeans.descriptionFriendMeans);
    }
  }, [dataFriendMeans]);

  return (
    <Fragment>
      <Modal
        hideBackdrop
        open={openModalWindowFriendMeans}
        onClose={closeModalWindowFriendMeans}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description">
        <Box sx={{ ...style, width: 350 }}>
          <Stack marginTop={0.8} sx={{ width: ".5rem", ml: "15rem" }}>
            <Button variant="outlined" onClick={closeModalWindowFriendMeans}>
              <CloseIcon fontSize="medium" />
            </Button>
          </Stack>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ textAlign: "center" }}>
            Опис поста РЕР
          </Typography>
          <TextField
            id="outlined-textarea"
            label="Номер поста РЕР"
            placeholder="Введіть номер поста РЕР"
            value={nameFriendMeans}
            onChange={handleChangeNameMeans}
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Склад поста РЕР"
            multiline
            rows={7}
            placeholder="Введіть склад поста РЕР"
            value={descriptionFriendMeans}
            onChange={handleChangeDescribeMeans}
          />
          <Stack
            direction="row"
            spacing={1}
            mt={0.5}
            justifyContent="center"
            alignItems="center">
            <Tooltip
              title="Додати до складу сил і засобів РЕР"
              placement="top"
              arrow>
              <IconButton
                aria-label="add"
                color="primary"
                size="large"
                onClick={onClickHandlerAddFriendMeans}>
                <AddCircleIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Зберегти зміни" placement="top" arrow>
              <IconButton
                aria-label="add"
                color="primary"
                size="large"
                onClick={onClickHandlerRewriteFriendMeans}>
                <CheckCircleOutlineIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Видалити пост" placement="top" arrow>
              <IconButton
                aria-label="delete"
                color="primary"
                size="large"
                onClick={onClickHandlerDeleteFriendMeans}>
                <DeleteIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>
      </Modal>
    </Fragment>
  );
}
