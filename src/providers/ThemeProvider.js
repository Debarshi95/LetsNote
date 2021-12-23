import { createTheme, ThemeProvider } from '@material-ui/core';
import React from 'react';
import colors from '../utils/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: colors.PRIMARY,
      dark: colors.PRIMARY_DARK,
    },
    secondary: {
      main: colors.SECONDARY,
    },
    background: { default: colors.BACKGROUND_LIGHT },
    text: {
      primary: colors.TEXT_PRIMARY,
      secondary: colors.TEXT_SECONDARY,
    },
  },
  overrides: {
    MuiFilledInput: {
      root: { margin: '0.3rem' },
      input: {
        padding: '0.8rem',
        fontFamily: 'inherit',
      },
      inputAdornedStart: {
        paddingLeft: 'inherit',
      },
    },
    MuiButton: {
      contained: {
        padding: '0.7rem 0.8rem',
        backgroundColor: colors.PRIMARY,
        textTransform: 'initial',
        fontFamily: 'inherit',
        fontWeight: 'bold',
        margin: '1rem auto',
        borderRadius: '2.5rem',
        width: '90%',

        '&:disabled': {
          cursor: 'none',
          backgroundColor: colors.PRIMARY_LIGHT,
        },
        '&:hover': {
          backgroundColor: colors.PRIMARY_DARK,
        },
      },
    },
    MuiSvgIcon: {
      root: {
        color: 'gray',
      },
    },

    MuiTypography: {
      root: {
        fontFamily: 'inherit',
      },
    },
  },
});

function AppThemeProvider({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default AppThemeProvider;
