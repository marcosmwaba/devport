
import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { Terminal, CommandLine, TerminalResponse } from './Terminal';

const ProjectsSection: React.FC = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce application with user authentication, product catalog, cart functionality, and payment processing integration.",
      tags: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
      imageUrl: "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example"
    },
    {
      title: "Task Management App",
      description: "A Kanban-style task management application with drag-and-drop functionality, team collaboration features, and real-time updates.",
      tags: ["React", "Firebase", "Tailwind CSS", "DnD Kit"],
      imageUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example"
    },
    {
      title: "Weather Dashboard",
      description: "A weather application that displays current conditions and forecasts for any location, with interactive maps and data visualization.",
      tags: ["React", "Chart.js", "OpenWeather API", "Mapbox"],
      imageUrl: "https://images.unsplash.com/photo-1561551331-22549ff3a308?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example"
    },
    {
      title: "Social Media API",
      description: "A RESTful API for a social media platform, featuring user profiles, posts, comments, likes, and friend relationships.",
      tags: ["Node.js", "Express", "MongoDB", "JWT", "Socket.io"],
      imageUrl: "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example"
    },
    {
      title: "Portfolio Website",
      description: "A developer portfolio website built with React and Three.js, featuring interactive 3D elements and smooth animations.",
      tags: ["React", "Three.js", "GSAP", "Tailwind CSS"],
      imageUrl: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example"
    },
    {
      title: "Markdown Blog",
      description: "A blog platform that supports Markdown content, featuring a custom CMS, search functionality, and tag categorization.",
      tags: ["Next.js", "Markdown", "Tailwind CSS", "Vercel"],
      imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example"
    }
  ];

  return (
    <section id="projects" className="py-16">
      <div className="container mx-auto px-4">
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4 inline-block text-terminal-cyan glow-text">
            Project Showcase
          </h2>
          
          <Terminal className="max-w-3xl mx-auto mb-8">
            <CommandLine prefix="user@portfolio:~$" initialCommand="list projects --filter featured" readOnly />
            <TerminalResponse 
              text="Loading project database... Rendering project cards with interactive elements..." 
              typing 
              typingSpeed={30} 
              className="mb-4" 
            />
          </Terminal>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
