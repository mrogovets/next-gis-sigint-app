import React, { useEffect, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { ReadFromCloudFirestore } from "../firebase/readFirestore";
import Loader from "../components/Loader";

function SitRepPage() {
  const onClickHandler = () => {
    console.log("click in sitreportpage.jsx");
  };

  //-------- Read situation from DB --------------------
  const [firestoreData, setFirestoreData] = useState(null);
  const fromFirestoreData = ReadFromCloudFirestore();
  useEffect(() => {
    if (fromFirestoreData) {
      console.log("fromFirestoreData: ", fromFirestoreData);
      setFirestoreData(fromFirestoreData);
    }
  }, [fromFirestoreData]);

  //-------- \Read situation from DB --------------------

  if (firestoreData) {
    const dataReport = new Date(
      firestoreData.time_stamp.seconds
    ).toLocaleString("en-GB", { timeZone: "UTC" });
    return (
      <React.Fragment>
        <Head>
          <title>GIS SigInt | SITREPORT</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
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
          <CssBaseline />
          <Container fixed>
            <Box sx={{ bgcolor: "#cfe8fc", height: "100vh", width: "100%" }}>
              <h1>Situation Report Page</h1>
              <h1>Розвідувальне зведення станом на {dataReport}</h1>
              {JSON.stringify(firestoreData)}
            </Box>
          </Container>
        </Box>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <h1>LOADING...</h1>
        <Loader />
      </React.Fragment>
    );
  }
}
export default SitRepPage;
