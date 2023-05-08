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
      <div className="nav__item" onClick={() => doClick("about")}>
        <p className="nav__item-title">ABOUT</p>
      </div>
      <div className="nav__item" onClick={() => doClick("projects")}>
        <p className="nav__item-title">PROJECTS</p>
      </div>
      <div className="nav__item" onClick={() => doClick("contact")}>
        <p className="nav__item-title">CONTACT</p>
      </div>
      <div className="nav__item">
        <a
          href="https://github.com/jaimevillanuadejuan/brainflix"
          className="nav__item-title nav__item-link"
        >
          CV
        </a>
      </div>
    </div>
  );
}
export default NavBar;
