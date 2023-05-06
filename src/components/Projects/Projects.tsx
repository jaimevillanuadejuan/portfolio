import "./Projects.scss";
import { useState } from "react";
import { Link } from "react-router-dom";

import ravefinderCover from "../../assets/covers/ravefinder-thumbnail.png";
import jamesvCover from "../../assets/covers/jamesv-thumbnail.png";
import brainflixCover from "../../assets/covers/brainflix-thumbnail.png";

const Projects = () => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div id="projects">
      <ul className="projects__list">
        <li className="projects__item">
          <h3 className="projects__item-title">JAMES V</h3>
          <img
            src={jamesvCover}
            className="projects__item-cover"
            alt="JAMES V Website preview"
          />
          <ul className="projects__item-buttons">
            <Link to="https://jamesvmusic.com/">
              <button className="projects__item-website-button">
                SEE WEBSITE
              </button>
            </Link>
          </ul>
        </li>
        <li className="projects__item">
          <h3 className="projects__item-title">RaveFinder</h3>
          <img
            className="projects__item-cover"
            src={ravefinderCover}
            alt="RaveFinder Website preview"
          />
          <ul className="projects__item-buttons">
            <Link to="https://github.com/jaimevillanuadejuan/RaveFinder">
              <button className="projects__item-repo-button">
                SEE GITHUB REPO
              </button>
            </Link>
            <Link to="https://ravefinder.netlify.app/">
              <button className="projects__item-website-button">
                SEE WEBSITE
              </button>
            </Link>
          </ul>
        </li>
        <li className="projects__item">
          <h3 className="projects__item-title">BrainFlix</h3>
          <img
            src={brainflixCover}
            className="projects__item-cover"
            alt="BrainFlix Website preview"
          />
          <ul className="projects__item-buttons">
            <Link to="https://github.com/jaimevillanuadejuan/brainflix">
              <button className="projects__item-repo-button">
                SEE GITHUB REPO
              </button>
            </Link>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Projects;
