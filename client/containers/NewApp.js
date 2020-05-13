import React, { useState, useEffect } from "react";
import Header from "../components/header/Header";
import Board from "./Board";
import SnackBar from "../components/SnackBar";
import { Paper, makeStyles } from "@material-ui/core";

import { NULL_USER, getCurrentUser, logout } from "../api/strava";

const useStyles = makeStyles((theme) => {
  console.log("App Theme");
  // console.log(theme.shape.borderRadius);
  // console.log(theme.spacing(1));
  // console.log(theme.spacing(1,1));
  // console.log(theme.spacing(1,1,1,1));

  return {
    root: {
      fontFamily: theme.typography.fontFamily,
    },
  };
});

const NewApp = () => {
  const classes = useStyles();

  const [currentUser, setCurrentUser] = useState(NULL_USER);
  const [snackBarMsg, setSnackBarMsg] = useState("");
  const [snackBarType, setSnackBarType] = useState("info");

  function snackBar(msg, type = "info") {
    setSnackBarMsg(msg);
    setSnackBarType(type);
  }

  const stravaLogout = () => {
    logout().then(() => {
      setCurrentUser(NULL_USER);
    });
  };

  //Fetch Data
  useEffect(() => {
    getCurrentUser().then((data) => {
      setCurrentUser(data);
    });
  }, []);


  return (
    <Paper className={classes.root}>
      <Header currentUser={currentUser} stravaLogout={stravaLogout} />
      <Board currentUser={currentUser} snackBar={snackBar}/>
      <SnackBar
        snackBarMsg={snackBarMsg}
        snackBarType={snackBarType}
        setSnackBarMsg={setSnackBarMsg}
      />
    </Paper>
  );
};

export default NewApp;
