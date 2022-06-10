import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import { FixedSizeList } from "react-window";
function renderRow(props) {
  const { index, style } = props;
  // console.log(props.data);

  return (
    <ListItem
      style={style}
      key={index}
      component="div"
      disablePadding
      disableGutters
      divider
      secondaryAction={
        <IconButton aria-label="comment">
          <CommentIcon />
        </IconButton>
      }>
      <ListItemText
        primary={`${
          props.data[index]
        }-Радіомережа управління та оповіщення 121 бтгр ${index + 1}`}
      />
    </ListItem>
  );
}

export default function LisIntelSource() {
  return (
    <FixedSizeList
      itemData={[1, 2, 3, 6, 5, 6, 7, 8, 9, 10]}
      height={150}
      width={"105%"}
      maxWidth={360}
      itemSize={55}
      itemCount={9}
      overscanCount={5}>
      {renderRow}
    </FixedSizeList>
  );
}
