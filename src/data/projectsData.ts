export interface ProjectData {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export const projectsData: ProjectData[] = [
  {
    id: 'buckettrips',
    title: 'BucketTrips',
    description: `Full-stack AI-powered travel planning app with voice/chat interfaces, OAuth authentication, and real-time itinerary generation. Conceptualized, built, and shipped to production using AI-assisted development workflows.`,
    coverImage: 'buckettrips-thumbnail.PNG',
    technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'Groq LLM', 'OAuth', 'Vercel', 'Render'],
    githubUrl: 'https://github.com/jaimevillanuadejuan/buckettrips',
    liveUrl: 'https://buckettrips.vercel.app/',
    featured: true
  },
  {
    id: 'vocalresony',
    title: 'Vocal Resony',
    description: `High-performance music platform with a built-in e-commerce store, user authentication, and cloud payment verification. Contributed to $50K CAD in revenue in the first fiscal year and secured 150+ registered users with a 34% course buy-in rate.`,
    coverImage: 'vocalresony-thumbnail.PNG',
    technologies: ['React', 'Node.js', 'Firebase', 'SQL', 'Vimeo API', 'EmailJS', 'MailChimpAPI', 'PayPal SDK', 'Framer Motion', 'SASS', 'Figma', 'JIRA'],
    liveUrl: 'https://vocalresony.com/',
    featured: true
  },  {
    id: 'ravefinder',
    title: 'RaveFinder',
    description: `Concert discovery app where users search for events by artist, find safe ticket purchase links, and explore upcoming shows. Integrates TicketMaster's API for live event data.`,
    coverImage: 'ravefinder-thumbnail.png',
    technologies: ['React', 'TicketMaster API', 'REST API', 'SASS', 'Netlify'],
    githubUrl: 'https://github.com/jaimevillanuadejuan/RaveFinder',
    liveUrl: 'https://ravefinder.netlify.app/',
        featured: true

  },
  {
    id: 'jamesv',
    title: 'JAMES V',
    description: `Full Stack application built in collaboration for Vancouver-based artist JAMES V. Features a dynamic videos section powered by Firebase Cloud Functions that auto-syncs content daily.`,
    coverImage: 'jamesv-thumbnail.png',
    technologies: ['React', 'Firebase', 'Cloud Functions', 'REST API', 'SASS'],
    liveUrl: 'https://jamesvmusic.com/',
    featured: true
  },
  {
    id: 'brainflix',
    title: 'BrainFlix',
    description: `Video streaming platform inspired by Vimeo. Users can browse, select, and upload videos through a custom-built REST API backend.`,
    coverImage: 'brainflix-thumbnail.png',
    technologies: ['React', 'Express.js', 'Node.js', 'REST API', 'SASS'],
    githubUrl: 'https://github.com/jaimevillanuadejuan/brainflix'
  },
  {
    id: 'tutoring-system',
    title: 'Tutoring System',
    description: `Academic management system for teachers and students to schedule tutorials, track exam reviews, and manage calendar events. Integrates Google Calendar API for real-time scheduling.`,
    coverImage: 'tutoring-system-cover.png',
    technologies: ['PHP', 'MySQL', 'Apache', 'Google Calendar API', 'FullCalendar'],
    githubUrl: 'https://github.com/jaimevillanuadejuan/tutoring-system-final-degree-project-'
  }
];
