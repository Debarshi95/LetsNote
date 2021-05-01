import { Button, CircularProgress, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  btnSubmittingRoot: {
    width: "100%",
    padding: "8px 10px",
    margin: "12px 0",
    borderRadius: "4px",
    display: "flex",
    justifyContent: "center",
    border: 0,
    fontFamily: "inherit",

    [theme.breakpoints.down("xs")]: {
      padding: "12px",
    },

    "& > div": {
      height: "22px !important",
      width: "22px !important",
    },
  },
}));

function ButtonSubmitting({ submitting, submit, disabled, btnText }) {
  const classes = useStyles({ disabled });

  return (
    <>
      {submitting && (
        <div className={classes.btnSubmittingRoot}>
          <CircularProgress color="secondary" />
        </div>
      )}
      {!submitting && (
        <Button
          variant="contained"
          disableElevation
          type="click"
          onClick={submit}
          disabled={disabled}
        >
          {btnText}
        </Button>
      )}
    </>
  );
}

export default ButtonSubmitting;
