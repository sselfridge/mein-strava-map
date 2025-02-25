// eslint-disable-next-line no-unused-vars
import React from "react";
import withStyles from '@mui/styles/withStyles';
import { InputLabel as MuiInputLabel } from "@mui/material";

const InputLabel = withStyles((theme) => ({
  root: {
    margin: theme.spacing(0, 0, 1),
  },
}))(MuiInputLabel);

export default InputLabel;
