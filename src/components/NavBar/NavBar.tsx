import React from "react";
import "./NavBar.scss";
// import cv from "/src/assets/cv/JaimeVillanuaDeJuan.pdf";

function NavBar() {
  const doClick = (to: string) => {
    const element = document.getElementById(to);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="nav">
      <div className="nav__item" onClick={() => doClick("about me")}>
        ABOUT ME
      </div>
      <div className="nav__item" onClick={() => doClick("projects")}>
        PROJECTS
      </div>
      <div className="nav__item" onClick={() => doClick("contact")}>
        CONTACT
      </div>
    </div>
  );
}
export default NavBar;
