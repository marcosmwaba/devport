
import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, TerminalList, TerminalHighlight, CommandLine, TerminalResponse } from './Terminal';
import { Code, Server, Database, Paintbrush, Globe, Cpu, Shield, Terminal as TerminalIcon, TrendingUp, Award } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLanguage } from '@/contexts/LanguageContext';

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

const SkillsSection: React.FC = () => {
  const isMobile = useIsMobile();
  const { t } = useLanguage();
  
  const skillCategories: SkillCategory[] = [
    {
      title: t('frontend_dev'),
      icon: <Code className="h-5 w-5 text-terminal-cyan" />,
      skills: ['React.js', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Redux']
    },
    {
      title: t('backend_dev'),
      icon: <Server className="h-5 w-5 text-terminal-purple" />,
      skills: ['Node.js', 'Express', 'REST APIs', 'GraphQL', 'Authentication']
    },
    {
      title: t('database'),
      icon: <Database className="h-5 w-5 text-terminal-pink" />,
      skills: ['MongoDB', 'PostgreSQL', 'Firebase', 'Prisma ORM', 'Data Modeling']
    },
    {
      title: t('design_ui'),
      icon: <Paintbrush className="h-5 w-5 text-terminal-green" />,
      skills: ['Figma', 'Responsive Design', 'UI Animation', 'Design Systems', 'Accessibility']
    },
    {
      title: t('devops_deployment'),
      icon: <Globe className="h-5 w-5 text-terminal-cyan" />,
      skills: ['Git/GitHub', 'CI/CD', 'AWS', 'Docker', 'Vercel']
    },
    {
      title: t('perf_testing'),
      icon: <Cpu className="h-5 w-5 text-terminal-purple" />,
      skills: ['Web Vitals', 'Lighthouse', 'Jest', 'React Testing Library', 'E2E Testing']
    },
    {
      title: t('linux_bash'),
      icon: <TerminalIcon className="h-5 w-5 text-terminal-green" />,
      skills: ['Kali Linux', 'Bash/Zsh Scripting', 'Shell Automation', 'System Administration', 'CLI Tools']
    },
    {
      title: t('cybersecurity'),
      icon: <Shield className="h-5 w-5 text-terminal-pink" />,
      skills: ['Offensive Security', 'Defensive Security', 'Vulnerability Assessment', 'Network Security', 'Security Auditing']
    },
    
    {
      title: t('business_leadership'),
      icon: <Award className="h-5 w-5 text-terminal-green" />,
      skills: ['Entrepreneurship', 'Team Management', 'Strategic Planning', 'Business Development', 'Client Relations']
    }
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 md:mb-12 text-center">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-4 inline-block text-terminal-cyan glow-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t('tech_arsenal')}
          </motion.h2>
          
          <Terminal className="max-w-3xl mx-auto">
            <CommandLine prefix="user@portfolio:~$" initialCommand="display skills --interactive" readOnly />
            <TerminalResponse 
              text="Analyzing skill matrix... Generating visualization..." 
              typing 
              typingSpeed={30} 
              className="mb-4" 
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 p-2 md:p-4">
              {skillCategories.map((category, index) => (
                <motion.div 
                  key={index}
                  className="mb-3 md:mb-4"
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
