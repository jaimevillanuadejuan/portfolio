import React from "react";
import NavBar from "./components/NavBar/NavBar";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import "./App.scss";

function App() {
  return (
    <>
      <NavBar />
      <main>
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
