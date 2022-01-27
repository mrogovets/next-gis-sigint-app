import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Image from "next/image";
import { getSvgImgSymbol } from "./svgImgBase";
import { Divider } from "@mui/material";

export const SymbolsList = () => {
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
    }, 30);
    //---------------------
  };

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <ListItem onClick={handlerClickListItem}>
        <ListItemAvatar>
          <Avatar sx={{ backgroundColor: "white", width: 60, height: 60 }}>
            <Image
              src={convertSvgToBase64("infantryMechanizedCoy")}
              layout="fill"
            />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Механізована рота" />
      </ListItem>
      <Divider />
      <ListItem onClick={handlerClickListItem}>
        <ListItemAvatar>
          <Avatar sx={{ backgroundColor: "white", width: 60, height: 60 }}>
            <Image
              src={convertSvgToBase64("infantryMechanizedBtn")}
              layout="fill"
            />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Механізований батальйон" />
      </ListItem>
      <Divider />
      <ListItem onClick={handlerClickListItem}>
        <ListItemAvatar>
          <Avatar sx={{ backgroundColor: "white", width: 60, height: 60 }}>
            <Image
              src={convertSvgToBase64("infantryMechanizedRgmnt")}
              layout="fill"
            />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Механізований полк" />
      </ListItem>
    </List>
  );
};
