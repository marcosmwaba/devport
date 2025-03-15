
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, CommandLine, TerminalResponse, TerminalHighlight } from './Terminal';
import { ArrowRight, FileCode, Github, Linkedin, Mail, Download } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const HeroSection: React.FC = () => {
  const [command, setCommand] = useState<string>('');
  const [responses, setResponses] = useState<{text: string; delay: number}[]>([
    { text: "Welcome to my terminal portfolio!", delay: 0 },
    { text: "I'm a full-stack developer passionate about crafting elegant solutions to complex problems.", delay: 1000 },
    { text: "Type 'help' to see available commands or explore the sections below.", delay: 2000 }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setResponses(prev => [
        ...prev,
        { 
          text: "System initialized and ready. Portfolio v2.1.0 loaded successfully.", 
          delay: 3000 
        }
      ]);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleCommand = (cmd: string) => {
    setCommand(cmd);
    
    let response = "";
    
    switch (cmd.toLowerCase()) {
      case 'help':
        response = "Available commands: about, contact, projects, skills, resume, clear";
        break;
      case 'about':
        response = "I'm Peter Marcos Mwaba, a passionate developer with expertise in modern web technologies. I love building intuitive, performant applications that solve real-world problems.";
        break;
      case 'contact':
        response = "Email: developer@example.com | LinkedIn: /in/marcosmwaba | GitHub: @marcosmwaba";
        break;
      case 'projects':
        response = "Scroll down to see my featured projects or visit my GitHub for more.";
        break;
      case 'skills':
        response = "My technical skills include React, TypeScript, Node.js, and more. Scroll down to see the complete list.";
        break;
      case 'resume':
        response = "You can download my resume using the button in the navigation.";
        break;
      case 'clear':
        setResponses([]);
        return;
      default:
        response = `Command not found: ${cmd}. Type 'help' to see available commands.`;
    }
    
    setResponses(prev => [...prev, { text: response, delay: 0 }]);
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center pt-16 pb-32 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <Avatar className="w-40 h-40 border-4 border-terminal-cyan/30">
              <AvatarImage src="/profile-image.jpg" alt="Peter Marcos Mwaba" />
              <AvatarFallback className="bg-terminal-gray/30 text-terminal-green text-4xl">
                PM
              </AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 rounded-full border-2 border-terminal-cyan/50 glow-text pointer-events-none"></div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-terminal-cyan glow-text">
              <span className="text-terminal-green">&lt;</span>
              marcosmwaba<TerminalHighlight color="text-terminal-pink">.</TerminalHighlight>dev
              <span className="text-terminal-green">/&gt;</span>
            </h1>
            
            <p className="text-xl text-terminal-green/80 max-w-2xl mx-auto md:mx-0">
              Peter Marcos Mwaba | Full-Stack Developer specializing in crafting modern, performant web applications
            </p>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <Terminal className="mb-8">
            <div className="max-h-[350px] overflow-y-auto">
              {responses.map((response, index) => (
                <TerminalResponse 
                  key={index} 
                  text={response.text} 
                  typing={true} 
                  delay={response.delay} 
                  className="mb-2"
                />
              ))}
              <CommandLine 
                prefix="guest@portfolio:~$" 
                onEnter={handleCommand} 
                autoFocus 
              />
            </div>
          </Terminal>
          
          <div className="flex justify-center space-x-4 mt-8">
            <motion.a
              href="#projects"
              className="flex items-center gap-2 bg-terminal-gray/20 text-terminal-cyan px-4 py-2 rounded-md border border-terminal-cyan/30 hover:bg-terminal-cyan/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileCode className="h-5 w-5" />
              <span>View Projects</span>
              <ArrowRight className="h-4 w-4" />
            </motion.a>
            
            <div className="flex space-x-3">
              <motion.a
                href="https://github.com/marcosmwaba"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-terminal-gray/20 text-terminal-green rounded-full border border-terminal-green/30 hover:bg-terminal-green/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="h-5 w-5" />
              </motion.a>
              
              <motion.a
                href="https://linkedin.com/in/marcosmwaba"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-terminal-gray/20 text-terminal-purple rounded-full border border-terminal-purple/30 hover:bg-terminal-purple/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin className="h-5 w-5" />
              </motion.a>
              
              <motion.a
                href="mailto:developer@example.com"
                className="p-2 bg-terminal-gray/20 text-terminal-pink rounded-full border border-terminal-pink/30 hover:bg-terminal-pink/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail className="h-5 w-5" />
              </motion.a>
              
              <motion.a
                href="/resume.pdf"
                download
                className="p-2 bg-terminal-gray/20 text-terminal-cyan rounded-full border border-terminal-cyan/30 hover:bg-terminal-cyan/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Download className="h-5 w-5" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
