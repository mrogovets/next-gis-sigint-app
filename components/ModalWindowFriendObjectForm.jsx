import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Container, TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import ListSigintMeans from "./ListSigintMeans";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 600,
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
    "&: hover": {
      borderColor: "rgba(0, 0, 0, 0.87)",
    },
  },
  "& .labelListIntelSource": { marginLeft: "1rem" },
};

export default function ModalWindowFriendObjectForm({
  openModalWindowFriendObject,
  closeModalWindowFriendObject,
  coordinatesSk42,
}) {
  const [value, setValue] = useState("Controlled");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const timeElapsed = Date.now();
  const [valueDate, setValueDate] = useState(new Date(timeElapsed));

  const handleChangeDate = (newValueDate) => {
    setValueDate(newValueDate);
  };
  return (
    <div>
      <Modal
        open={openModalWindowFriendObject}
        onClose={closeModalWindowFriendObject}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style} noValidate autoComplete="off">
          <Stack marginTop={1} sx={{ width: ".5rem", ml: "18rem" }}>
            <Button variant="outlined" onClick={closeModalWindowFriendObject}>
              <CloseIcon fontSize="medium" />
            </Button>
          </Stack>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ textAlign: "center" }}>
            Формуляр підрозділу РЕР
          </Typography>
          <TextField
            id="outlined-textarea"
            label="Найменування підрозділу РЕР"
            placeholder="Введіть найменування підрозділу РЕР"
          />
          <TextField
            id="outlined-textarea"
            label="Місцезнаходження підрозділу РЕР"
            placeholder="широта | довгота"
            value={`широта: ${
              coordinatesSk42 ? Math.trunc(coordinatesSk42.X_lngSk42) : ``
            } | довгота: ${
              coordinatesSk42 ? Math.trunc(coordinatesSk42.Y_latSk42) : ``
            }`}
            onChange={handleChange}
          />
          <label className="labelListIntelSource">Наявні засоби РЕР</label>
          <Container>
            <ListSigintMeans />
            <Button variant="text" sx={{ marginLeft: 12 }}>
              <AddCircleIcon fontSize="large" />
            </Button>
          </Container>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <MobileDatePicker
                label="Дата розгортання підрозділу РЕР"
                inputFormat="dd.MM.yyyy"
                value={valueDate}
                onChange={handleChangeDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
          <Stack alignContent={"center"} marginLeft={1.3} mt={2}>
            <Button variant="contained">Записати до бази даних</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
