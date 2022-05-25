import React from "react";
import { ThemeProvider, StyledEngineProvider, createTheme, adaptV4Theme } from "@mui/material/styles";

import { lightBlue, green } from "@mui/material/colors/";

import App from "./App";

const theme = createTheme(adaptV4Theme({
  overrides: {
    MuiTab: {
      root: {
        width: "50%",
        "@media (min-width: 0px)": {
          minWidth: 100,
        },
      },
      wrapper: {
        display: "inline",
      },
    },
    MuiMenu: {
      list: {
        backgroundColor: "white",
      },
    },
    MuiListItem: {
      root: {
        paddingBottom: 0,
      },
    },
    MuiListItemText: {
      multiline: {
        marginTop: 0,
      },
    },
    MuiExpansionPanelSummary: {
      root: {
        "&$expanded": {
          minHeight: 40,
        },
      },
      content: {
        "&$expanded": {
          margin: 0,
        },
      },
    },

    MuiExpansionPanelDetails: {
      root: {
        padding: 0,
      },
    },
    MuiTypography: {
      h6: {
        fontSize: "1.1em",
      },
    },
  },
  // typography:{
  //   fontFamily: ['Arial', 'Helvetica', 'sans-serif']
  // },
  palette: {
    primary: lightBlue,
    secondary: green,
    background: "#aadaff",
    strava: "#FC4C02",
  },
  status: {
    danger: "orange",
  },
}));

theme.shape.borderRadius = theme.spacing(1.2);

const ThemedApp = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default ThemedApp;
