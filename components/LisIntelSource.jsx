import React, { useContext, useEffect } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import { ContextListHostelSource } from "../Context/ContextListHostelSource";
import { List } from "@mui/material";

export default function LisIntelSource({
  itemData,
  getIndexCommentIconClick,
  nameObject,
}) {
  const { updateMarkerArr } = useContext(ContextListHostelSource);

  useEffect(() => {
    updateMarkerArr(itemData, nameObject);
  }, [itemData, nameObject]);

  const onClickHandler = (indexLineSource) => {
    getIndexCommentIconClick(indexLineSource);
  };

  return (
    <List
      sx={{
        height: 150,
        width: "105%",
        maxWidth: 360,
        bgcolor: "background.paper",
        overflow: "auto",
      }}>
      {itemData.map((el, index) => (
        <ListItem
          key={index}
          disablePadding
          disableGutters
          divider
          secondaryAction={
            <IconButton
              aria-label="comment"
              onClick={() => onClickHandler(index)}>
              <CommentIcon />
            </IconButton>
          }>
          <ListItemText primary={el.nameHostileSource} />
        </ListItem>
      ))}
    </List>
  );
}
