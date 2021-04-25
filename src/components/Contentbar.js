import { IconButton, makeStyles } from "@material-ui/core";
import { DeleteOutlined } from "@material-ui/icons";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const useStyles = makeStyles((theme) => ({
  contentbarRoot: {
    width: "calc(100% - 270px)",
    background: "#fafafa",
    color: "gray",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    "& >p": {
      padding: "14px",
      fontSize: "14px",
    },

    "& hr": {
      height: "20px",
    },
    "& .ql-container.ql-snow": {
      height: "auto",
      minHeight: "90%",
      fontSize: "16px",
      color: "#000",
    },
  },
  editor: {
    padding: "0 1rem",
    height: "100vh",
  },
  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 1rem",
    fontSize: "14px",
  },
  notebookName: {
    outline: "none",
    // padding: "0 1rem",
  },
}));

function Contentbar() {
  const classes = useStyles();
  const [text, setText] = React.useState("");
  console.log(text);

  const handleNotebookName = (e) => {
    if (e.key === "Enter") {
      console.log("worked");
    }
  };
  return (
    <div className={classes.contentbarRoot}>
      <div className={classes.topbar}>
        <div
          contentEditable="true"
          className={classes.notebookName}
          onChange={handleNotebookName}
        >
          First Notebook
        </div>
        <IconButton>
          <DeleteOutlined />
        </IconButton>
      </div>
      <p>Last Edited on 12.02.2.</p>
      <ReactQuill
        className={classes.editor}
        onChange={(value) => setText(value)}
        value={text}
      />
    </div>
  );
}

export default Contentbar;
