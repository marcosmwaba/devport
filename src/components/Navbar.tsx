
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal as TerminalIcon, Home, UserCircle, Mail, Download } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { name: t('home'), href: '#', icon: <Home className="h-4 w-4" /> },
    { name: t('skills'), href: '#skills', icon: <UserCircle className="h-4 w-4" /> },
    { name: t('contact'), href: '#contact', icon: <Mail className="h-4 w-4" /> },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-terminal-dark/80 backdrop-blur-md border-b border-terminal-gray/20' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <TerminalIcon className="h-6 w-6 text-terminal-cyan" />
              <span className="text-terminal-cyan font-bold text-xl">
                <span className="text-terminal-green">&lt;</span>
                Dev<span className="text-terminal-pink">Terminal</span>
                <span className="text-terminal-green">/&gt;</span>
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-terminal-green hover:text-terminal-cyan transition-colors flex items-center gap-1.5"
                >
                  {link.icon}
                  <span>{link.name}</span>
                </a>
              ))}
              <a
                href="/resume.pdf"
                download
                className="bg-terminal-gray/20 text-terminal-cyan px-3 py-1.5 rounded-md border border-terminal-cyan/30 hover:bg-terminal-cyan/10 transition-colors flex items-center gap-1.5"
              >
                <Download className="h-4 w-4" />
                <span>{t('resume')}</span>
              </a>
              <LanguageSelector />
            </div>
            
            <div className="md:hidden flex items-center gap-4">
              <LanguageSelector />
              <button
                onClick={toggleMobileMenu}
                className="text-terminal-green hover:text-terminal-cyan"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>
      
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-terminal-dark/95 backdrop-blur-md pt-20 pb-6 px-4 overflow-y-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  className="text-terminal-green text-xl py-3 border-b border-terminal-gray/20 flex items-center gap-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </motion.a>
              ))}
              <motion.a
                href="/resume.pdf"
                download
                className="bg-terminal-gray/20 text-terminal-cyan mt-4 px-4 py-3 rounded-md border border-terminal-cyan/30 text-center text-xl flex items-center justify-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
              >
                <Download className="h-5 w-5" />
                <span>{t('resume')}</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
