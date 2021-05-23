import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import React from "react";

const theme = createMuiTheme({
  palette: { primary: { main: "#06c59c" }, secondary: { main: "#f4f4f4" } },
  overrides: {
    MuiFilledInput: {
      root: { margin: "6px" },
      input: {
        padding: "14px",
        fontFamily: "inherit",
      },
      inputAdornedStart: {
        paddingLeft: "inherit",
      },
    },
    MuiButton: {
      contained: {
        padding: "10px 12px",
        backgroundColor: "#049d7c",
        textTransform: "initial",
        color: "#fff",
        fontFamily: "inherit",
        fontWeight: "bold",
        margin: "16px auto",
        borderRadius: "30px",
        minWidth: "70%",

        "&:disabled": {
          backgroundColor: "#049d7c",
          opacity: 0.7,
        },
        "&:hover": {
          backgroundColor: "#037d63",
        },
      },
    },
    MuiSvgIcon: {
      root: {
        color: "gray",
      },
    },
    MuiDrawer: {
      paper: {
        width: "80%",
        padding: "1rem",
      },
    },
  },
});

function AppThemeProvider({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default AppThemeProvider;
