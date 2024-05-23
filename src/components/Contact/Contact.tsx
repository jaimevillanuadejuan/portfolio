import React, { FormEvent, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ReactComponent as Linkedin } from "../../assets/svg/linkedin.svg";
import { ReactComponent as Gh } from "../../assets/svg/gh.svg";
import { ReactComponent as Cv } from "../../assets/svg/cv.svg";

import "./Contact.scss";

const Contact = () => {
  const ref = useRef<any>(null);
  const [success, setSuccess] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [reload, setReload] = useState(0);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (
      ref.current.name.value === "" ||
      ref.current.email.value === "" ||
      ref.current.message.value === ""
    ) {
      setEmpty(true);
      return;
    } else {
      setEmpty(false);
    }
    emailjs
      .sendForm(
        `${process.env.REACT_APP_SERVICE_ID}`,
        `${process.env.REACT_APP_TEMPLATE_ID}`,
        ref.current,
        `${process.env.REACT_APP_PUBLIC_KEY}`
      )
      .then(
        (result) => {
          setSuccess(true);
          setTimeout(() => {
            setReload(1);
            setTimeout(() => {
              setReload(2);
              setTimeout(() => {
                setReload(3);
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              }, 1000);
            }, 1000);
          }, 1000);
        },
        (error) => {
          console.log(error.text);
          setSuccess(false);
        }
      );
  };

  return (
    <div className="contact" id="contact">
      <form className="email" ref={ref} onSubmit={handleSubmit} action="">
        <h1 className="email__title">GET IN TOUCH WITH ME</h1>
        <input
          className="email__input"
          type="text"
          name="name"
          placeholder="Name"
        />
        <input
          className="email__input"
          type="email"
          name="email"
          placeholder="Email"
        />
        <textarea
          className="email__text"
          name="message"
          placeholder="Write me anything! // Écrivez-moi en français aussi!"
          rows={10}
        />
        <button className="email__button" type="submit" value="Send">
          Send
        </button>
        <section className="emal__container">
          {success
            ? "Your message has been sent. I will get back to you soon :) "
            : null}
          {empty ? "Please fill out all empty forms." : null}
          <div>
            {reload === 1 ? "Reloading in 3 ... " : null}
            {reload === 2 ? "Reloading in 2 ... " : null}
            {reload === 3 ? "Reloading in 1 ... " : null}
          </div>
        </section>
      </form>
      <div className="socials">
        <div className="socials__container">
          <a href="https://www.linkedin.com/in/jaime-villanua-de-juan">
            <Linkedin />
          </a>
          <a href="https://github.com/jaimevillanuadejuan">
            <Gh />
          </a>
          <a href="https://drive.google.com/file/d/1YnxlpK1VsFh6ldZY-J49JrGNiip7Ys6E/view?usp=sharing">
            <Cv />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
