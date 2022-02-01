import React, { useEffect, useState, useCallback } from "react";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import "@fontsource/roboto/400.css";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { SymbolsList } from "./SymbolsList";
import { Divider } from "@mui/material";

export const SBSymbolMenu = ({ SymbolMenuOpen, closeSymbolMenuOpen, data }) => {
  const [formControlState, setFormControlState] = useState("hostile");
  const [selectedSymbolsArr, setSelectedSymbolsArr] = useState([]);

  const getRadioGroupValue = (event) => {
    setFormControlState(event.target.value);
  };
  const setAccordionColor = (state) => {
    switch (state) {
      case "hostile":
        return "tomato";
      case "friend":
        return "blue";
      case "neutral":
        return "green";
    }
  };

  const handleClick = (event) => {
    event.target.closest("svg").style.backgroundColor = "Gainsboro";
    setTimeout(() => {
      event.target.closest("svg").style.backgroundColor = "white";
    }, 50);
    setTimeout(() => {
      closeSymbolMenuOpen();
    }, 10);
  };

  // depends on type "hostile", "friend" or "neutral" selecting symbols
  const getArrOfSelectedSybmols = (data) => {
    const selectedArr = data.filter((elem) => {
      if (elem.categorySymbols === formControlState) {
        return elem;
      }
    });
    return selectedArr;
  };
  // -------------------------------------------------------

  return (
    <Box
      sx={{
        width: 300,
        height: "100vh",
        marginTop: "64px",
        color: "primary.dark",
        backgroundColor: "white",
        opacity: [0.9, 0.8, 0.7],
        "&:hover": {
          backgroundColor: "white.dark",
          opacity: [1],
          color: "primary",
        },
        zIndex: 999,
        position: "fixed",
        right: "0%",
        display: `${SymbolMenuOpen ? "block" : "none"}`,
        overflow: "auto",
      }}>
      <CloseIcon
        color="warning"
        onClick={handleClick}
        sx={{ marginLeft: 31 }}
      />
      <Divider />
      <FormControl sx={{ alignItems: "center" }}>
        <FormLabel id="demo-radio-buttons-group-label">
          <Typography
            variant="h6"
            color="primary.dark"
            sx={{ marginLeft: "20px" }}>
            Оберіть війська
          </Typography>
        </FormLabel>
        <RadioGroup
          column="true"
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          defaultValue="hostile"
          onChange={getRadioGroupValue}>
          <FormControlLabel
            value="friend"
            control={<Radio size="small" color="primary" />}
            label="Дружні"
            sx={{ color: "blue" }}
          />
          <FormControlLabel
            value="hostile"
            control={<Radio size="small" color="warning" />}
            label="Ворожі"
            sx={{ color: "tomato" }}
          />
          <FormControlLabel
            value="neutral"
            control={<Radio size="small" color="success" />}
            label="Нейтральні"
            sx={{ color: "green" }}
          />
        </RadioGroup>
      </FormControl>
      <Divider />
      <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
        Оберіть умовне позначення:
      </Typography>
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <Typography
              variant="caption"
              color={setAccordionColor(formControlState)}>
              Умовні знаки РЕР
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <SymbolsList
              arrSymbols={
                data
                  ? getArrOfSelectedSybmols(data).filter((elem) => {
                      return elem.branchForce === "sigInt";
                    })
                  : null
              }
            />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <Typography
              variant="caption"
              color={setAccordionColor(formControlState)}>
              Просторові можливості (завдання)
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <SymbolsList />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <Typography
              variant="caption"
              color={setAccordionColor(formControlState)}>
              Умовні знаки пунктів управління
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header">
            <Typography
              variant="caption"
              color={setAccordionColor(formControlState)}>
              Умовні знаки СВ
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <SymbolsList
              arrSymbols={
                data
                  ? getArrOfSelectedSybmols(data).filter((elem) => {
                      return elem.branchForce === "land";
                    })
                  : null
              }
            />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header">
            <Typography
              variant="caption"
              color={setAccordionColor(formControlState)}>
              Умовні знаки РВіА
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header">
            <Typography
              variant="caption"
              color={setAccordionColor(formControlState)}>
              Умовні знаки ОіВТ
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header">
            <Typography
              variant="caption"
              color={setAccordionColor(formControlState)}>
              Умовні знаки військ зв`язку
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header">
            <Typography
              variant="caption"
              color={setAccordionColor(formControlState)}>
              Умовні знаки ПС
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header">
            <Typography
              variant="caption"
              color={setAccordionColor(formControlState)}>
              Умовні знаки РТВ, АСУ, ІС
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header">
            <Typography
              variant="caption"
              color={setAccordionColor(formControlState)}>
              Умовні знаки ВМС
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header">
            <Typography
              variant="caption"
              color={setAccordionColor(formControlState)}>
              Умовні знаки ДШВ
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header">
            <Typography
              variant="caption"
              color={setAccordionColor(formControlState)}>
              Умовні знаки ССпО
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header">
            <Typography
              variant="caption"
              color={setAccordionColor(formControlState)}>
              Умовні знаки опер. забезпечення
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header">
            <Typography
              variant="caption"
              color={setAccordionColor(formControlState)}>
              Умовні знаки РЕБ
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header">
            <Typography
              variant="caption"
              color={setAccordionColor(formControlState)}>
              Умовні знаки РХБ
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header">
            <Typography
              variant="caption"
              color={setAccordionColor(formControlState)}>
              Умовні знаки топогеодез та навігації
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header">
            <Typography
              variant="caption"
              color={setAccordionColor(formControlState)}>
              Умовні знаки ТхЗ
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header">
            <Typography
              variant="caption"
              color={setAccordionColor(formControlState)}>
              Умовні знаки ТлЗ
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header">
            <Typography
              variant="caption"
              color={setAccordionColor(formControlState)}>
              Умовні знаки мед.З
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header">
            <Typography
              variant="caption"
              color={setAccordionColor(formControlState)}>
              Умовні знаки МПЗ
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header">
            <Typography
              variant="caption"
              color={setAccordionColor(formControlState)}>
              Умовні знаки космічних систем
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </Box>
  );
};
