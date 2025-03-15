import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import SkillsSection from '@/components/SkillsSection';
import ContactSection from '@/components/ContactSection';
import Particles from '@/components/Particles';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { toast } = useToast();
  const { language } = useLanguage();

  useEffect(() => {
    // Welcome toast on initial load
    toast({
      title: "Terminal Connection Established",
      description: "Welcome to Peter Marcos Mwaba's portfolio. Type 'help' in the terminal for commands.",
      duration: 5000,
    });
    
    // Toast about Marcos Enterprise
    toast({
      title: "CEO & Founder",
      description: "Peter Marcos Mwaba is the CEO of Marcos Enterprise, combining technical expertise with business leadership.",
      duration: 7000,
    });
    
    // Reminder about profile image
    toast({
      title: "Profile Image Required",
      description: "Please upload a square profile image (recommended size: 400x400px) to /public/profile-image.jpg for the avatar to display correctly.",
      duration: 10000,
    });
  }, [toast]);

  // Language change toast
  useEffect(() => {
    const langNames = {
      en: 'English',
      fr: 'French',
      zh: 'Chinese',
      es: 'Spanish',
      ko: 'Korean'
    };
    
    toast({
      title: "Language Changed",
      description: `The portfolio is now displayed in ${langNames[language as keyof typeof langNames]}.`,
      duration: 3000,
    });
  }, [language, toast]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen relative"
    >
      <div className="scanlines" aria-hidden="true"></div>
      <Particles count={75} />
      
      <Navbar />
      
      <main className="overflow-x-hidden">
        <HeroSection />
        <div id="skills">
          <SkillsSection />
        </div>
        <ContactSection />
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default Index;
