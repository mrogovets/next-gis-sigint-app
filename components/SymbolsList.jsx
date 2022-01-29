import React, { useContext, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Image from "next/image";
import { getSvgImgSymbol } from "./svgImgBase";
import { Divider } from "@mui/material";
import { ContextUnitId } from "../Context/ContextUnitId";

export const SymbolsList = () => {
  const { getUnitId } = useContext(ContextUnitId);

  const convertSvgToBase64 = (unit) => {
    return (
      "data:image/svg+xml;base64," +
      Buffer.from(getSvgImgSymbol(unit)).toString("base64")
    );
  };

  const handlerClickListItem = (event) => {
    // imitation of ckick on li
    event.target.closest("li").style.backgroundColor = "Gainsboro";
    setTimeout(() => {
      event.target.closest("li").style.backgroundColor = "white";
    }, 150);
    //---------------------
    getUnitId(event.target.closest("li").id); // select unitSymbol & set it in STATE
  };

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <ListItem
        id="hostileInfantryMechanizedCoy"
        onClick={handlerClickListItem}>
        <ListItemAvatar>
          <Avatar sx={{ backgroundColor: "white", width: 60, height: 60 }}>
            <Image
              src={convertSvgToBase64("hostileInfantryMechanizedCoy")}
              layout="fill"
            />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Механізована рота" />
      </ListItem>
      <Divider />
      <ListItem
        id="hostileInfantryMechanizedBtn"
        onClick={handlerClickListItem}>
        <ListItemAvatar>
          <Avatar sx={{ backgroundColor: "white", width: 60, height: 60 }}>
            <Image
              src={convertSvgToBase64("hostileInfantryMechanizedBtn")}
              layout="fill"
            />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Механізований батальйон" />
      </ListItem>
      <Divider />
      <ListItem
        id="hostileInfantryMechanizedRgmnt"
        onClick={handlerClickListItem}>
        <ListItemAvatar>
          <Avatar sx={{ backgroundColor: "white", width: 60, height: 60 }}>
            <Image
              src={convertSvgToBase64("hostileInfantryMechanizedRgmnt")}
              layout="fill"
            />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Механізований полк" />
      </ListItem>
    </List>
  );
};
