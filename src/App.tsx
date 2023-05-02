import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

import NavBar from "./components/NavBar/NavBar";
import Main from "./components/Main/Main";

import "./App.scss";

function App() {
  //We initialize the array of sentences that are gonna display when TypeWriter renders
  const sentences = [
    "Hi 👋, I'm Jaime Villanua De Juan, Welcome to my portfolio!",
    "Let me introduce myself, I'm a Full Stack Developer👨‍💻",
    "I love 🖥️, playing 🎮 and drinking 🍵",
    "I'm also a huge ⚽ fan",
  ];
  useEffect(() => {
    <Helmet>
      <meta charSet="utf-8" />
      <title>Jaime Villanua De Juan Portfolio</title>
    </Helmet>;
  }, []);
  return (
    <>
      <NavBar />
      <Main />
    </>
  );
}

export default App;
