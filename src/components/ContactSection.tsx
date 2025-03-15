import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, CommandLine, TerminalResponse, TerminalHighlight } from './Terminal';
import { SendHorizontal, AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import emailjs from 'emailjs-com';

const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const templateParams = {
      name,
      email,
      message,
    };

    emailjs.send('service_f235864', 'template_44myyeg', templateParams, 'Z8VQ7jXNNTejhKUJS')
      .then((response) => {
        setIsSubmitting(false);
        setSubmitSuccess(true);

        toast({
          title: "Message Sent",
          description: "Thank you for your message. I'll get back to you soon!",
          duration: 5000,
        });

        // Reset form after success
        setName('');
        setEmail('');
        setMessage('');

        // Reset success state after delay
        setTimeout(() => setSubmitSuccess(false), 3000);
      }, (error) => {
        setIsSubmitting(false);
        console.error('Failed to send email:', error);

        toast({
          title: "Error",
          description: "Failed to send message. Please try again later.",
          duration: 5000,
        });
      });
  };

  return (
    <section id="contact" className="py-16">
      <div className="container mx-auto px-4">
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4 inline-block text-terminal-cyan glow-text">
            Initialize Communication
          </h2>
          <p className="text-terminal-green/80 max-w-2xl mx-auto">
            Want to work with Peter Marcos Mwaba? Send a message through the terminal below or reach out directly via email.
          </p>
        </motion.div>
        
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Terminal>
            <CommandLine prefix="user@portfolio:~$" initialCommand="open contact-form --interactive" readOnly />
            <TerminalResponse 
              text="Establishing secure connection... Form interface loaded and ready for input." 
              typing 
              typingSpeed={30} 
              className="mb-4" 
            />
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-terminal-cyan mb-1">
                  <TerminalHighlight>Name</TerminalHighlight>:
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-terminal-gray/20 border border-terminal-gray/40 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-terminal-cyan text-terminal-green"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-terminal-cyan mb-1">
                  <TerminalHighlight>Email</TerminalHighlight>:
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-terminal-gray/20 border border-terminal-gray/40 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-terminal-cyan text-terminal-green"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-terminal-cyan mb-1">
                  <TerminalHighlight>Message</TerminalHighlight>:
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-terminal-gray/20 border border-terminal-gray/40 rounded px-3 py-2 h-32 focus:outline-none focus:ring-1 focus:ring-terminal-cyan text-terminal-green"
                  required
                />
              </div>
              
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 bg-terminal-gray/30 text-terminal-cyan px-4 py-3 rounded-md border border-terminal-cyan/50 hover:bg-terminal-cyan/10 transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-terminal-cyan" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Transmitting...</span>
                  </>
                ) : submitSuccess ? (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    <span>Message Sent!</span>
                  </>
                ) : (
                  <>
                    <SendHorizontal className="h-5 w-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </Terminal>
          
          <div className="mt-8 text-center text-terminal-green/70">
            <p>Alternatively, send an email directly to: <a href="mailto:offtunedlungu@gmail.com" className="text-terminal-cyan hover:text-terminal-pink transition-colors">offtunedlungu@gmail.com</a></p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
