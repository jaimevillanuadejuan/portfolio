import { useState, useRef, FormEvent } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { ReactComponent as Linkedin } from '../../assets/svg/linkedin.svg';
import { ReactComponent as Gh } from '../../assets/svg/gh.svg';
import { ReactComponent as Cv } from '../../assets/svg/cv.svg';
import './Contact.scss';

interface FormStatus {
  success: boolean;
  error: boolean;
  loading: boolean;
  message: string;
}

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>({
    success: false,
    error: false,
    loading: false,
    message: ''
  });

  const validateForm = (): boolean => {
    if (!formRef.current) return false;
    
    const name = (formRef.current.querySelector('[name="name"]') as HTMLInputElement)?.value.trim();
    const email = (formRef.current.querySelector('[name="email"]') as HTMLInputElement)?.value.trim();
    const message = (formRef.current.querySelector('[name="message"]') as HTMLTextAreaElement)?.value.trim();
    
    if (!name || !email || !message) {
      setStatus({
        success: false,
        error: true,
        loading: false,
        message: 'Please fill out all fields.'
      });
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus({
        success: false,
        error: true,
        loading: false,
        message: 'Please enter a valid email address.'
      });
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !formRef.current) return;
    
    setStatus({ success: false, error: false, loading: true, message: '' });
    
    try {
      await emailjs.sendForm(
        process.env.REACT_APP_SERVICE_ID!,
        process.env.REACT_APP_TEMPLATE_ID!,
        formRef.current,
        process.env.REACT_APP_PUBLIC_KEY!
      );
      
      setStatus({
        success: true,
        error: false,
        loading: false,
        message: 'Message sent successfully! I\'ll get back to you soon.'
      });
      
      formRef.current.reset();
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setStatus({ success: false, error: false, loading: false, message: '' });
      }, 5000);
      
    } catch (error) {
      console.error('Email send error:', error);
      setStatus({
        success: false,
        error: true,
        loading: false,
        message: 'Failed to send message. Please try again.'
      });
    }
  };

  return (
    <motion.section
      id="contact"
      className="contact"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <div className="contact__container">
        <motion.h2
          className="contact__title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Get In Touch
        </motion.h2>

        <motion.form
          ref={formRef}
          className="contact__form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="contact__form-group">
            <label htmlFor="name" className="contact__label">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="contact__input"
              placeholder="Your name"
              disabled={status.loading}
            />
          </div>

          <div className="contact__form-group">
            <label htmlFor="email" className="contact__label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="contact__input"
              placeholder="your.email@example.com"
              disabled={status.loading}
            />
          </div>

          <div className="contact__form-group">
            <label htmlFor="message" className="contact__label">Message</label>
            <textarea
              id="message"
              name="message"
              className="contact__textarea"
              placeholder="Write me anything! // Écrivez-moi en français aussi!"
              rows={6}
              disabled={status.loading}
            />
          </div>

          <motion.button
            type="submit"
            className="contact__button"
            disabled={status.loading}
            whileHover={{ scale: status.loading ? 1 : 1.05 }}
            whileTap={{ scale: status.loading ? 1 : 0.95 }}
          >
            {status.loading ? 'Sending...' : 'Send Message'}
          </motion.button>

          {status.message && (
            <motion.div
              className={`contact__status ${status.success ? 'contact__status--success' : 'contact__status--error'}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {status.message}
            </motion.div>
          )}
        </motion.form>

        <motion.div
          className="contact__socials"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="contact__socials-title">Connect With Me</h3>
          <div className="contact__socials-links">
            <motion.a
              href="https://www.linkedin.com/in/jaime-villanua-de-juan"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__social-link"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              aria-label="LinkedIn profile"
            >
              <Linkedin />
            </motion.a>
            <motion.a
              href="https://github.com/jaimevillanuadejuan"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__social-link"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              aria-label="GitHub profile"
            >
              <Gh />
            </motion.a>
            <motion.a
              href="https://drive.google.com/file/d/1YnxlpK1VsFh6ldZY-J49JrGNiip7Ys6E/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__social-link"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Download CV"
            >
              <Cv />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Contact;
