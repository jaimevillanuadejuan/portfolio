import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

import NavBar from "./components/NavBar/NavBar";
import About from "./components/About/About";

import "./App.scss";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

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
      <Contact />
      <Footer />
    </>
  );
}
export default App;
