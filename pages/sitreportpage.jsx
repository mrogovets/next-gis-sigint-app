import React from "react";
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
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { ReadFromCloudFirestore } from "../firebase/readFirestore";

function SitRepPage() {
  const onClickHandler = () => {
    console.log("click in sitreportpage.jsx");
  };

  //-------- Read situation from DB --------------------
  const fromFirestoreData = ReadFromCloudFirestore();
  if (fromFirestoreData) {
    console.log("fromFirestoreData: ", fromFirestoreData);
  }
  //-------- \Read situation from DB --------------------

  return (
    <React.Fragment>
      <Head>
        <title>GIS SigInt | SITREPORT</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          property="og:title"
          content="GIS SigInt System"
          key="GIS, SigInt, System"
        />
      </Head>
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
        <h1>Situation Report Page</h1>
      </Box>
    </React.Fragment>
  );
}
export default SitRepPage;
