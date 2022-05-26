import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 440,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  "& .MuiTextField-root": { m: 0.7, width: "100%" },
};

export default function BasicModal({
  openModalWindowObject,
  closeModalWindowObject,
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
        open={openModalWindowObject}
        onClose={closeModalWindowObject}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style} noValidate autoComplete="off">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ textAlign: "center" }}>
            Формуляр об`єкта розвідки
          </Typography>
          <TextField
            id="outlined-textarea"
            label="Найменування об'єкта розвідки"
            placeholder="Введіть найменування об'єкта розвідки"
            multiline
          />
          <TextField
            id="outlined-textarea"
            label="Місцезнаходження об'єкта розвідки"
            placeholder="широта | довгота"
            value={"широта: | довгота:"}
            onChange={handleChange}
          />
          <TextField
            id="outlined-multiline-static"
            label="В яких джерела проявляється"
            placeholder="Введіть джерела, в яких проявляється об'єкт розвідки"
            multiline
            rows={4}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <MobileDatePicker
                label="Дата останнього підтвердження"
                inputFormat="dd.MM.yyyy"
                value={valueDate}
                onChange={handleChangeDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </Box>
      </Modal>
    </div>
  );
}
