import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import firebase from "../firebase/firebaseConfig";

export default function Navbar({ isSBMenuOpen, userName }) {
  const onClickHandler = () => {
    isSBMenuOpen();
  };
  const signOut = () => {
    firebase.auth().signOut();
  };
  return (
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
          <Avatar
            sx={{
              width: 60,
              height: 60,
            }}>
            <Image src="/gerbTCSigint.png" alt="emblem" layout="fill" />
          </Avatar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}>
            GIS SigInt System
          </Typography>
          <Button color="inherit" onClick={signOut}>
            <Link href={userName ? "" : "/auth"}>
              <a>{userName ? userName : "Sign-In"}</a>
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
