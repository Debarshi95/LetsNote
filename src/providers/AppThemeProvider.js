import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import React from "react";

const theme = createMuiTheme({
  palette: { primary: { main: "#06c59c" }, secondary: { main: "#f4f4f4" } },
  overrides: {
    MuiButton: {
      root: {},
      contained: {
        margin: "8px 0",
        padding: "10px 12px",
        borderRadius: "4px",
        backgroundColor: "#049d7c",
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
