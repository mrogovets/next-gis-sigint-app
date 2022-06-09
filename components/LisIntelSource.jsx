import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import { FixedSizeList } from "react-window";
import { Box } from "@mui/material";

function renderRow(props) {
  const { index, style } = props;
  console.log(props.data);

  return (
    <ListItem
      style={style}
      key={index}
      component="div"
      disablePadding
      secondaryAction={
        <IconButton aria-label="comment">
          <CommentIcon />
        </IconButton>
      }>
      <ListItemText primary={`${props.data[index]}-Item ${index + 1}`} />
    </ListItem>
  );
}

export default function LisIntelSource() {
  return (
    <FixedSizeList
      itemData={[1, 2, 3, 6, 5, 6, 7, 8, 9, 10]}
      height={200}
      width={"105%"}
      maxWidth={360}
      itemSize={40}
      itemCount={9}
      overscanCount={5}>
      {renderRow}
    </FixedSizeList>
  );
}
