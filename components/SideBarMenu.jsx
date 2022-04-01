import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { ContextSBMenu } from "../Context/ContextSBMenu";
import Link from "next/link";

export const SideBarMenu = ({ SBMenuOpen, getMenuNumber }) => {
  const { isSBMenuOpen } = useContext(ContextSBMenu);

  const OneHandleClick = () => {
    isSBMenuOpen();
    getMenuNumber("One");
  };

  const TwoHandleClick = () => {
    isSBMenuOpen();
    getMenuNumber("Two");
  };

  const ThreeHandleClick = () => {
    isSBMenuOpen();
    getMenuNumber("Three");
  };

  const FourHandleClick = () => {
    isSBMenuOpen();
    getMenuNumber("Four");
  };

  const FiveHandleClick = () => {
    isSBMenuOpen();
    getMenuNumber("Five");
  };

  const SixHandleClick = () => {
    isSBMenuOpen();
    getMenuNumber("Six");
    console.log("OpOrd");
  };

  const SevenHandleClick = () => {
    isSBMenuOpen();
    getMenuNumber("Seven");
  };

  const EightHandleClick = () => {
    isSBMenuOpen();
    getMenuNumber("Eight");
  };

  const handleClick = () => {
    isSBMenuOpen();
  };
  const buttons = [
    <Button key="one" onClick={OneHandleClick}>
      Нанести обстановку вручну
    </Button>,
    <Button key="two" onClick={TwoHandleClick}>
      Зчитати обстановку з бази даних
    </Button>,
    <Button key="three" onClick={ThreeHandleClick}>
      <Link href={"/sitreportpage"}>
        <a>Сформувати оцінку обстановки</a>
      </Link>
    </Button>,
    <Button key="four" onClick={FourHandleClick}>
      Записати обстановку до бази даних
    </Button>,
    <Button key="five" onClick={FiveHandleClick}>
      Розрахувати марш
    </Button>,
    <Button key="six" onClick={SixHandleClick}>
      <Link href={"/opordpage"}>
        <a>Сформувати бойове розпорядження</a>
      </Link>
    </Button>,
    <Button key="seven" onClick={SevenHandleClick}>
      Здійснити розрахунок сил та засобів РЕР
    </Button>,
    <Button key="eight" onClick={EightHandleClick}>
      Довідкова система
    </Button>,
  ];
  return (
    <Box
      sx={{
        width: 300,
        height: 450,
        marginTop: "64px",
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
