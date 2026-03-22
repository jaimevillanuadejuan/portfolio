import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        &copy; JAIME VILLANUA DE JUAN - {new Date().getFullYear()}
      </div>
    </footer>
  );
};

export default Footer;
