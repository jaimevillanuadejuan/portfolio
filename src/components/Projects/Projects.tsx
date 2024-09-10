import "./Projects.scss";
import { useState } from "react";
import vocalresonyCover from "../../assets/covers/vocalresony-thumbnail.jpg";
import ravefinderCover from "../../assets/covers/ravefinder-thumbnail.png";
import jamesvCover from "../../assets/covers/jamesv-thumbnail.png";
import brainflixCover from "../../assets/covers/brainflix-thumbnail.png";
import tutoringSystemCover from "../../assets/covers/tutoring-system-cover.png";

const Projects = () => {
  return (
    <div id="projects">
      <ul className="projects__list">
        <li className="projects__item">
          <h3 className="projects__item-title">Vocal Resony</h3>
          <p className="projects__item-description">
            Vocal Resony is an educational platform with an integrated eCommerce
            store designed to help you learn about singing in an easy and fun
            way.
            <a
              className="projects__item-link"
              href="https://vocal-resony.web.app/"
            >
              {" "}
              Vocal Resony{" "}
            </a>
            <br></br>UI designed on Canva and developed on React.JS, JavaScript,
            HTML5, Sass. Backend system is built with Node.js, Vite and
            Firebase. Users to purchase courses and subscriptions plans in the
            built in eCommerce store.
          </p>
          <img
            src={vocalresonyCover}
            className="projects__item-cover"
            alt="JAMES V Website preview"
          />
          <ul className="projects__item-buttons">
            <a href="https://vocal-resony.web.app/">
              <button className="projects__item-website-button">
                SEE WEBSITE
              </button>
            </a>
          </ul>
        </li>
        <li className="projects__item">
          <h3 className="projects__item-title">JAMES V</h3>
          <p className="projects__item-description">
            JAMES V is a Full Stack application made in collaboration with
            another Full Stack Developer for the Vancouver based artist{" "}
            <a className="projects__item-link" href="https://jamesvmusic.com/">
              {" "}
              JAMES V
            </a>
            <br></br>To build an outstading interface, we used ReactJS for the
            Front End. For the BackEnd we used FireBase for hosting the web
            app's database and domain and creating cloud functions to retrieve
            data automatically daily for the videos section.
          </p>
          <img
            src={jamesvCover}
            className="projects__item-cover"
            alt="JAMES V Website preview"
          />
          <ul className="projects__item-buttons">
            <a href="https://jamesvmusic.com/">
              <button className="projects__item-website-button">
                SEE WEBSITE
              </button>
            </a>
          </ul>
        </li>
        <li className="projects__item">
          <h3 className="projects__item-title">RaveFinder</h3>
          <p className="projects__item-description">
            RaveFinder application is a promotional searvh engine where users
            can look for concerts where their favorite artists are playing, find
            a safe purchase link to buy the ticket for that event and find out
            about other upcoming events. This is a Front End application made in
            ReactJS that utilizes TicketMaster's API to retrieve all the
            information about the events.
          </p>
          <img
            className="projects__item-cover"
            src={ravefinderCover}
            alt="RaveFinder Website preview"
          />
          <ul className="projects__item-buttons">
            <a href="https://github.com/jaimevillanuadejuan/RaveFinder">
              <button className="projects__item-repo-button">
                SEE GITHUB REPO
              </button>
            </a>
            <a href="https://ravefinder.netlify.app/">
              <button className="projects__item-website-button">
                SEE WEBSITE
              </button>
            </a>
          </ul>
        </li>
        <li className="projects__item">
          <h3 className="projects__item-title">BrainFlix</h3>
          <p className="projects__item-description">
            BrainFlix is a video streaming website similar in design and
            functionality to Vimeo. The tech stack of this project includes
            ReactJs for the Front End and ExpressJs for the Back End API. The
            user can select and view videos from a suggestion bar as well as
            upload videos
          </p>
          <img
            src={brainflixCover}
            className="projects__item-cover"
            alt="BrainFlix Website preview"
          />
          <ul className="projects__item-buttons">
            <a href="https://github.com/jaimevillanuadejuan/brainflix">
              <button className="projects__item-repo-button">
                SEE GITHUB REPO
              </button>
            </a>
          </ul>
        </li>
        <li className="projects__item">
          <h3 className="projects__item-title">Tutoring System</h3>
          <p className="projects__item-description">
            Tutoring System is a management system for tutorials and reviews of
            practices and exams developed with the purpose of it being used by
            teachers and students. This project's UI was made using PHP, HTML,
            CSS, and Full Calendar. Regarding the Back End, the tutoring's
            system was built with XAMPP, phpMyAdmin, MySQL, Apache and Google
            Calendar's API.
          </p>
          <img
            src={tutoringSystemCover}
            className="projects__item-cover"
            alt="Tutoring System preview"
          />
          <ul className="projects__item-buttons">
            <a href="https://github.com/jaimevillanuadejuan/tutoring-system-final-degree-project-">
              <button className="projects__item-repo-button">
                SEE GITHUB REPO
              </button>
            </a>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Projects;
