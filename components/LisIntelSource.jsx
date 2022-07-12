import React, { useContext, useEffect } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import { FixedSizeList } from "react-window";
import { ContextListHostelSource } from "../Context/ContextListHostelSource";
function renderRow(props) {
  const { index, style } = props;
  // console.log(props);

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
      <ListItemText primary={props.data[index]} />
    </ListItem>
  );
}

export default function LisIntelSource({ itemData, commentIconClick }) {
  const { updateMarkerArr } = useContext(ContextListHostelSource);
  useEffect(() => {
    updateMarkerArr(itemData);
  }, [itemData]);

  return (
    <FixedSizeList
      itemData={itemData.map((el) => el.nameHostileSource)} // info from DB about IntelSources
      height={150}
      width={"105%"}
      maxWidth={360}
      itemSize={55}
      itemCount={itemData.length}
      overscanCount={5}>
      {renderRow}
    </FixedSizeList>
  );
}
