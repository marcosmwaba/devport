
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import ContactSection from '@/components/ContactSection';
import Particles from '@/components/Particles';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();

  useEffect(() => {
    // Welcome toast on initial load
    toast({
      title: "Terminal Connection Established",
      description: "Welcome to Peter Marcos Mwaba's portfolio. Type 'help' in the terminal for commands.",
      duration: 5000,
    });
    
    // Reminder about profile image
    toast({
      title: "Profile Image Required",
      description: "Please upload a profile image to /public/profile-image.jpg for the avatar to display correctly.",
      duration: 10000,
    });
  }, [toast]);

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
      
      <main>
        <HeroSection />
        <div id="skills">
          <SkillsSection />
        </div>
        <ProjectsSection />
        <ContactSection />
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default Index;
