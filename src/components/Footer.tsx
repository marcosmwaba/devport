
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-terminal-dark/50 border-t border-terminal-gray/20 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            className="mb-6 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-terminal-green/70">
              <span className="text-terminal-green">&lt;</span>
              Dev<span className="text-terminal-pink">Terminal</span>
              <span className="text-terminal-green">/&gt;</span>
              <span className="text-terminal-green/50"> © {new Date().getFullYear()}</span>
            </p>
            <p className="text-terminal-green/50 text-sm mt-1">Designed and built by marcosmawba with a 💻</p>
          </motion.div>
          
          <motion.div 
            className="flex space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a 
              href="https://github.com/marcosmwaba" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-terminal-green/70 hover:text-terminal-cyan transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/marcosmwaba-825219280" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-terminal-green/70 hover:text-terminal-purple transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-terminal-green/70 hover:text-terminal-cyan transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a 
              href="mailto:offtunedlungu@gmail.com" 
              className="text-terminal-green/70 hover:text-terminal-pink transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
          </motion.div>
        </div>
        
        <motion.div 
          className="text-center mt-8 text-terminal-green/30 text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p>
            <span className="text-terminal-green/50">$</span> echo "Thanks for visiting my portfolio!"
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
