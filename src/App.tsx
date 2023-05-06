import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

import NavBar from "./components/NavBar/NavBar";
import About from "./components/About/About";

import "./App.scss";
import Projects from "./components/Projects/Projects";

function App() {
  useEffect(() => {
    <Helmet>
      <meta charSet="utf-8" />
      <title>Jaime Villanua De Juan Portfolio</title>
    </Helmet>;
  }, []);
  return (
    <>
      <NavBar />
      <About />
      <Projects />
    </>
  );
}
export default App;
