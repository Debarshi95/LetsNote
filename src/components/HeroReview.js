import { makeStyles } from "@material-ui/core";
import React from "react";

const reviews = [
  {
    id: 1,
    review: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
    by: "test.com",
  },
  {
    id: 2,
    review:
      "error magni obcaecati eos aspernatur asperiores necessitatibus debitis ipsum ex.",
    by: "hello.co.in",
  },
  {
    id: 3,
    review:
      "Eligendi sit exercitationem commodi iste, esse, itaque earum repellendus",
    by: "xyz.com",
  },
  {
    id: 4,
    review: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
    by: "business.com",
  },
];

const useStyles = makeStyles((theme) => ({
  heroReview: {
    height: "60vh",
    width: "100%",
    background: "#f8f8f8",
  },
  heroItem: {
    width: "70%",
    margin: "0 auto",
  },
}));
function HeroReview() {
  const classes = useStyles();
  return (
    <div className={classes.heroReview}>
      <div className={classes.heroItem}>
        <span> &#8220; </span>
      </div>
    </div>
  );
}

export default HeroReview;
