import { useTypewriter } from "react-simple-typewriter";
import "./About.scss";
//importing typewriter-effect

const AboutMe = () => {
  //We initialize the array of sentences that are gonna display when TypeWriter renders
  const [text] = useTypewriter({
    words: [
      "Hi 👋, I'm Jaime Villanua De Juan",
      "Welcome to my portfolio!",
      "Let me introduce myself :)",
      "I'm a Full Stack Developer 👨‍💻",
      "I love 🖥️, playing 🎮 and drinking 🍵",
      "I'm also a huge ⚽ fan",
      "Feel free to check out any of my projects😇",
    ],
    loop: false,
  });
  return (
    <div id="about">
      <p className="text">
        <span>{text}</span>
      </p>
    </div>
  );
};

//
export default AboutMe;
