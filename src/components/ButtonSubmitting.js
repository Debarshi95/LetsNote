import { Button, CircularProgress, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  btnSubmittingRoot: {
    width: "72%",
    padding: "10px",
    margin: "14px auto",
    borderRadius: "30px",
    display: "flex",
    justifyContent: "center",
    border: 0,
    backgroundColor: "#049d7c",
    fontFamily: "inherit",

    [theme.breakpoints.down("xs")]: {
      padding: "14px",
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
      {submitting ? (
        <div className={classes.btnSubmittingRoot}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
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
