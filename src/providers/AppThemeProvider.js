import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import React from "react";

const theme = createMuiTheme({
  palette: { primary: { main: "#00a82d" }, secondary: { main: "#fff" } },
  overrides: {
    MuiButton: {
      root: {},
      contained: {
        margin: "4px 0",
        padding: "10px 12px",
        borderRadius: "8px",
        backgroundColor: "#00a82d",
        textTransform: "initial",
        color: "#fff",
        "&:hover": {
          //   backgroundColor: "green",
        },
      },
    },
    MuiDrawer: {
      paper: {
        width: "80%",
        padding: "1rem",
      },
    },
    MuiDivider: {
      root: {
        background: "#bdbdbd !important",
        margin: "1rem 0",
      },
    },
  },
});

function AppThemeProvider({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default AppThemeProvider;
