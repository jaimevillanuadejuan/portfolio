import { motion } from 'framer-motion';
import { ProjectData } from '../../data/projectsData';
import './ProjectCard.scss';

interface ProjectCardProps {
  project: ProjectData;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay: index * 0.1
      }
    }
  };

  return (
    <motion.li
      className="project-card"
      variants={cardVariants}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div className="project-card__image-wrapper">
        <img
          src={require(`../../assets/covers/${project.coverImage}`)}
          alt={`${project.title} preview`}
          className="project-card__image"
          loading="lazy"
        />
      </div>

      <div className="project-card__content">
        <h3 className="project-card__title">{project.title}</h3>

        <div className="project-card__technologies">
          {project.technologies.map((tech) => (
            <span key={tech} className="project-card__tech-tag">
              {tech}
            </span>
          ))}
        </div>

        <div
          className="project-card__description"
          dangerouslySetInnerHTML={{ __html: project.description }}
        />

        {(project.githubUrl || project.liveUrl) && (
          <div className="project-card__buttons">
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card__button project-card__button--github"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`View ${project.title} on GitHub`}
              >
                GitHub
              </motion.a>
            )}
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card__button project-card__button--live"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Visit ${project.title} live site`}
              >
                Live Site
              </motion.a>
            )}
          </div>
        )}
      </div>
    </motion.li>
  );
};

export default ProjectCard;
