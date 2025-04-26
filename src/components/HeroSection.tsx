
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TerminalHighlight } from './Terminal';
import EnhancedTerminal from './EnhancedTerminal';
import { ArrowRight, FileCode, Github, Linkedin, Mail, Download } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroSection: React.FC = () => {
  const isMobile = useIsMobile();
  const { t } = useLanguage();
  
  return (
    <section className="min-h-screen flex flex-col justify-center items-center pt-16 pb-16 md:pb-32 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <Avatar className="w-24 h-24 md:w-40 md:h-40 border-4 border-terminal-cyan/30">
              <AvatarImage src="/profile-image.jpg" alt="Peter Marcos Mwaba" />
              <AvatarFallback className="bg-terminal-gray/30 text-terminal-green text-2xl md:text-4xl">
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
            <h1 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6 text-terminal-cyan glow-text">
              <span className="text-terminal-green">&lt;</span>
              marcosmwaba<TerminalHighlight color="text-terminal-pink">.</TerminalHighlight>dev
              <span className="text-terminal-green">/&gt;</span>
            </h1>
            
            <p className="text-lg md:text-xl text-terminal-green/80 max-w-2xl mx-auto md:mx-0">
              Peter Marcos Mwaba | Software <span className="line-through">Developer</span> Engineer, IT Specialist & CEO of Marcos Enterprise<span className="emoji">🇿🇲</span>
            </p>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <EnhancedTerminal />
          
          <div className="px-4 mb-8 text-sm md:text-base text-terminal-green/90">
            <p className="mb-4">
              I'm a Software <span className="line-through">Developer</span> Engineer, IT Support Specialist, and CEO of Marcos Enterprise based in Lusaka, Zambia<span className="emoji">🇿🇲🇿🇲</span>, with a strong background in software engineering. I am passionate about creating efficient, scalable, and robust software solutions that address real-world challenges. My work is rooted in solving complex problems through well-structured, high-quality code and system design.
            </p>
            <p className="mb-4">
              In addition to software development, I provide IT support services, ensuring smooth operation and maintenance of systems. I have experience troubleshooting technical issues, optimizing workflows, and enhancing system performance. Whether working on backend systems, databases, or providing hands-on support, I strive to deliver reliable and impactful solutions.
            </p>
            <p>
              With a commitment to continuous learning, I focus on staying current with the latest technologies, ensuring that I bring the best practices to each project. My goal is to help organizations thrive by integrating innovative software engineering practices with reliable IT support.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center md:space-x-4 space-y-4 md:space-y-0 mt-4 md:mt-8">
            <motion.a
              href="#projects"
              className="flex items-center justify-center gap-2 bg-terminal-gray/20 text-terminal-cyan px-4 py-2 rounded-md border border-terminal-cyan/30 hover:bg-terminal-cyan/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileCode className="h-5 w-5" />
              <span>{t('view_projects')}</span>
              <ArrowRight className="h-4 w-4" />
            </motion.a>
            
            <div className="flex justify-center space-x-3">
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
                href="https://www.linkedin.com/in/marcosmwaba-825219280"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-terminal-gray/20 text-terminal-purple rounded-full border border-terminal-purple/30 hover:bg-terminal-purple/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin className="h-5 w-5" />
              </motion.a>
              
              <motion.a
                href="mailto:offtunedlungu@gmail.com"
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
