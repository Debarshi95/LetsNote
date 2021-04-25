import { makeStyles } from "@material-ui/core";
import React from "react";
import Sidebar from "../components/Sidebar";
import Contentbar from "../components/Contentbar";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
}));
function Dashboard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Sidebar />
      <Contentbar />
    </div>
  );
}

export default Dashboard;
