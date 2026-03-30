import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import "./NavBar.scss";

interface NavItem {
  id: string;
  label: string;
  href?: string;
}

const navItems: NavItem[] = [
  { id: 'about', label: 'ABOUT' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'contact', label: 'CONTACT' },
  { 
    id: 'cv', 
    label: 'CV',
    href: 'https://drive.google.com/file/d/1s29qMM1lGH6AGETgVRV4xVfdgyRajMaX/view?usp=sharing'
  }
];

function NavBar() {
  const [activeSection, setActiveSection] = useState<string>('about');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    // Track scroll position for navbar styling
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Track active section using Intersection Observer
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    navItems.forEach(item => {
      if (item.id !== 'cv') {
        const element = document.getElementById(item.id);
        if (element) observer.observe(element);
      }
    });

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav 
      className={`nav ${isScrolled ? 'nav--scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="nav__container">
        {navItems.map((item, index) => (
          <motion.div
            key={item.id}
            className={`nav__item ${activeSection === item.id ? 'nav__item--active' : ''}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {item.href ? (
              <a
                href={item.href}
                className="nav__item-title nav__item-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${item.label}`}
              >
                {item.label}
              </a>
            ) : (
              <button
                onClick={() => scrollToSection(item.id)}
                className="nav__item-title"
                aria-label={`Navigate to ${item.label} section`}
              >
                {item.label}
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </motion.nav>
  );
}

export default NavBar;
