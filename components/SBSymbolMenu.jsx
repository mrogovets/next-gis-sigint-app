import React, { useState } from "react";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const SBSymbolMenu = ({ SymbolMenuOpen, closeSymbolMenuOpen }) => {
  const handleClick = () => {
    closeSymbolMenuOpen();
  };

  return (
    <Box
      sx={{
        width: 300,
        height: 450,
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
        left: "81%",
        display: `${SymbolMenuOpen ? "block" : "none"}`,
      }}>
      <CloseIcon
        color="warning"
        onClick={handleClick}
        sx={{ marginLeft: 33 }}
      />
      <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
        Оберіть умовне позначення:
      </Typography>
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <Typography>Accordion 1</Typography>
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
            <Typography>Accordion 2</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion disabled>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header">
            <Typography>Disabled Accordion</Typography>
          </AccordionSummary>
        </Accordion>
      </div>
    </Box>
  );
};
