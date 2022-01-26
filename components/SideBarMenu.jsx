import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { ContextSBMenu } from "../Context/ContextSBMenu";

export const SideBarMenu = ({ SBMenuOpen }) => {
  const { isSBMenuOpen } = useContext(ContextSBMenu);

  const handleClick = () => {
    isSBMenuOpen();
  };
  const buttons = [
    <Button key="one" onClick={handleClick}>
      Нанести обстановку вручну
    </Button>,
    <Button key="two" onClick={handleClick}>
      Завантажити обстановку з файлу
    </Button>,
    <Button key="three" onClick={handleClick}>
      Записати обстановку у файл
    </Button>,
    <Button key="four" onClick={handleClick}>
      Зберегти обстановку в базу даних
    </Button>,
    <Button key="five" onClick={handleClick}>
      Розрахувати марш
    </Button>,
    <Button key="six" onClick={handleClick}>
      Сформувати бойове розпорядження
    </Button>,
    <Button key="seven" onClick={handleClick}>
      Здійснити розрахунок сил та засобів РЕР
    </Button>,
    <Button key="eight" onClick={handleClick}>
      Довідкова система
    </Button>,
  ];
  return (
    <Box
      sx={{
        width: 300,
        height: 450,
        marginTop: 8,
        color: "primary.dark",
        backgroundColor: "white",
        opacity: [0.9, 0.8, 0.7],
        "&:hover": {
          backgroundColor: "white.dark",
          opacity: [1],
          color: "primary",
        },
        display: `${SBMenuOpen ? "block" : "none"}`,
        zIndex: 999,
        position: "fixed",
      }}>
      <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
        Оберіть дію:
      </Typography>
      <Box
        sx={{
          display: "flex",
          "& > *": {
            m: 1,
          },
        }}>
        <ButtonGroup
          orientation="vertical"
          aria-label="vertical contained button group"
          variant="text">
          {buttons}
        </ButtonGroup>
      </Box>
    </Box>
  );
};
