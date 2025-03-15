
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, TerminalResponse } from './Terminal';
import { ExternalLink, Github, Code } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  tags,
  imageUrl,
  liveUrl,
  githubUrl,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative overflow-hidden group ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Terminal className="h-full">
        <div className="flex flex-col h-full">
          <div className="mb-3 flex items-center gap-2">
            <Code className="h-5 w-5 text-terminal-purple" />
            <h3 className="text-terminal-cyan font-bold">{title}</h3>
          </div>
          
          {imageUrl && (
            <div className="relative overflow-hidden mb-3 rounded border border-terminal-gray/30 aspect-video">
              <img 
                src={imageUrl} 
                alt={title} 
                className="object-cover w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-terminal-dark to-transparent opacity-70"></div>
            </div>
          )}
          
          <TerminalResponse text={description} className="mb-3 text-sm" />
          
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span 
                key={index} 
                className="text-xs px-2 py-1 rounded-full bg-terminal-gray/20 text-terminal-light-green"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="mt-auto flex gap-3">
            {liveUrl && (
              <a 
                href={liveUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm flex items-center gap-1 text-terminal-cyan hover:text-terminal-pink transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Live Demo</span>
              </a>
            )}
            {githubUrl && (
              <a 
                href={githubUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm flex items-center gap-1 text-terminal-green hover:text-terminal-pink transition-colors"
              >
                <Github className="h-4 w-4" />
                <span>View Code</span>
              </a>
            )}
          </div>
        </div>
      </Terminal>
      
      {/* Glow effect on hover */}
      <motion.div 
        className="absolute inset-0 pointer-events-none rounded-lg"
        animate={{
          boxShadow: isHovered 
            ? '0 0 15px rgba(0, 255, 245, 0.5), 0 0 30px rgba(0, 255, 245, 0.2)' 
            : '0 0 0px rgba(0, 255, 245, 0)',
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default ProjectCard;
