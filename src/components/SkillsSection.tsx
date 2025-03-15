
import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, TerminalList, TerminalHighlight, CommandLine, TerminalResponse } from './Terminal';
import { Code, Server, Database, Paintbrush, Globe, Cpu } from 'lucide-react';

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

const SkillsSection: React.FC = () => {
  const skillCategories: SkillCategory[] = [
    {
      title: 'Frontend Development',
      icon: <Code className="h-5 w-5 text-terminal-cyan" />,
      skills: ['React.js', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Redux']
    },
    {
      title: 'Backend Development',
      icon: <Server className="h-5 w-5 text-terminal-purple" />,
      skills: ['Node.js', 'Express', 'REST APIs', 'GraphQL', 'Authentication']
    },
    {
      title: 'Database',
      icon: <Database className="h-5 w-5 text-terminal-pink" />,
      skills: ['MongoDB', 'PostgreSQL', 'Firebase', 'Prisma ORM', 'Data Modeling']
    },
    {
      title: 'Design & UI',
      icon: <Paintbrush className="h-5 w-5 text-terminal-green" />,
      skills: ['Figma', 'Responsive Design', 'UI Animation', 'Design Systems', 'Accessibility']
    },
    {
      title: 'DevOps & Deployment',
      icon: <Globe className="h-5 w-5 text-terminal-cyan" />,
      skills: ['Git/GitHub', 'CI/CD', 'AWS', 'Docker', 'Vercel']
    },
    {
      title: 'Performance & Testing',
      icon: <Cpu className="h-5 w-5 text-terminal-purple" />,
      skills: ['Web Vitals', 'Lighthouse', 'Jest', 'React Testing Library', 'E2E Testing']
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <motion.h2 
            className="text-3xl font-bold mb-4 inline-block text-terminal-cyan glow-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Technical Arsenal
          </motion.h2>
          
          <Terminal className="max-w-3xl mx-auto">
            <CommandLine prefix="user@portfolio:~$" initialCommand="display skills --interactive" readOnly />
            <TerminalResponse 
              text="Analyzing skill matrix... Generating visualization..." 
              typing 
              typingSpeed={30} 
              className="mb-4" 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skillCategories.map((category, index) => (
                <motion.div 
                  key={index}
                  className="mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {category.icon}
                    <TerminalHighlight>{category.title}</TerminalHighlight>
                  </div>
                  <TerminalList items={category.skills} />
                </motion.div>
              ))}
            </div>
          </Terminal>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
