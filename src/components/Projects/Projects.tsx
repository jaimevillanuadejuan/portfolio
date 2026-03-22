import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { projectsData } from '../../data/projectsData';
import "./Projects.scss";

const Projects = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section id="projects" className="projects">
      <div className="projects__container">
        <motion.h2
          className="projects__title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Featured Projects
        </motion.h2>

        <motion.ul
          className="projects__list"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default Projects;
