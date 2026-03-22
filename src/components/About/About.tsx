import { motion } from 'framer-motion';
import { useTypewriter } from "react-simple-typewriter";
import "./About.scss";

const AboutMe = () => {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.section
      id="about"
      className="hero"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-label="Introduction"
    >
      <motion.div className="hero__content" variants={itemVariants}>
        <p className="hero__text">
          <span className="hero__typewriter">{text}</span>
          <span className="hero__cursor">|</span>
        </p>
      </motion.div>

      <motion.button
        className="hero__scroll-indicator"
        variants={itemVariants}
        onClick={scrollToProjects}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Scroll to projects section"
      >
        <span className="hero__scroll-text">View My Work</span>
        <motion.svg
          className="hero__scroll-arrow"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M12 5v14M19 12l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </motion.svg>
      </motion.button>
    </motion.section>
  );
};

export default AboutMe;
