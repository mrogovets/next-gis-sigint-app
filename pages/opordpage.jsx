import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import Image from "next/image";
import Link from "next/link";

function OpOrderPage() {
  const onClickHandler = () => {
    console.log("click in opordpage.jsx");
  };
  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={onClickHandler}>
              <MenuIcon />
            </IconButton>
            <Link href={"/"}>
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                }}>
                <Image src="/gerbTCSigint.png" alt="emblem" layout="fill" />
              </Avatar>
            </Link>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, textAlign: "center" }}>
              GIS SigInt System
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ marginTop: "64px" }}>
        <h1>Operation Order Page</h1>
      </Box>
    </React.Fragment>
  );
}
export default OpOrderPage;
