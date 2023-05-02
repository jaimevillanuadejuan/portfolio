import React from "react";
import { useTypewriter } from "react-simple-typewriter";
import "./Main.scss";
//importing typewriter-effect

const Main = () => {
  const [text] = useTypewriter({
    words: [
      "Hi 👋, I'm Jaime Villanua De Juan",
      "Welcome to my portfolio!",
      "Let me introduce myself :)",
      "I'm a Full Stack Developer👨‍💻",
      "I love 🖥️, playing 🎮 and drinking 🍵",
      "I'm also a huge ⚽ fan",
      "Feel free to check out any of my projects😇",
    ],
    loop: false,
  });
  return (
    <div className="main">
      <span aria-label="something">{text}</span>
    </div>
  );
};

//
export default Main;
