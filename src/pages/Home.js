import { makeStyles } from "@material-ui/core";
import React from "react";
import Hero from "../components/Hero";
import HeroReview from "../components/HeroReview";
import Navbar from "../components/Navbar";

const useStyles = makeStyles((theme) => ({
  homeRoot: {},
}));
function Home() {
  return (
    <>
      <Navbar />

      <Hero />
      <HeroReview />
    </>
  );
}

export default Home;
