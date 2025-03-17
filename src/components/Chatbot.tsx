
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, Bot, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const generateId = () => Math.random().toString(36).substring(2, 9);

const Chatbot: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: generateId(),
      text: "Hello! I'm Peter's virtual assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      toast({
        title: "Chat Assistant",
        description: "Ask me questions about Peter's experience, skills, or projects!",
        duration: 3000,
      });
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: generateId(),
      text: input.trim(),
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Simulate bot thinking
    setTimeout(() => {
      const botResponse = generateBotResponse(input.trim().toLowerCase());
      
      const botMessage: Message = {
        id: generateId(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };
  
  const generateBotResponse = (input: string): string => {
    // Simple rule-based responses
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return "Hello! I'm Peter's virtual assistant. How can I help you today?";
    }
    
    if (input.includes('skill') || input.includes('tech') || input.includes('know')) {
      return "Peter is skilled in frontend development with React, TypeScript, and Tailwind CSS. He's also proficient in backend technologies like Node.js, and has experience with Linux systems and cybersecurity. Would you like to know more about any specific skill?";
    }
    
    if (input.includes('contact') || input.includes('email') || input.includes('reach')) {
      return "You can contact Peter via email at offtunedlungu@gmail.com, or connect with him on LinkedIn at /in/marcosmwaba. Is there something specific you'd like to discuss with him?";
    }
    
    if (input.includes('project') || input.includes('work') || input.includes('portfolio')) {
      return "Peter has worked on various projects showcasing his skills in software development and IT support. Check out his GitHub profile for code examples and project repositories.";
    }
    
    if (input.includes('experience') || input.includes('background') || input.includes('history')) {
      return "Peter Marcos Mwaba is a Software Engineer, IT Support Specialist, and CEO of Marcos Enterprise based in Lusaka, Zambia. He combines technical expertise with business leadership to deliver innovative solutions.";
    }
    
    if (input.includes('marcos enterprise') || input.includes('company') || input.includes('business')) {
      return "Marcos Enterprise is a tech company founded by Peter Marcos Mwaba. The company focuses on providing software solutions and IT support services to businesses in Zambia and beyond.";
    }
    
    if (input.includes('resume') || input.includes('cv')) {
      return "You can download Peter's resume using the Resume button in the navigation bar. It contains detailed information about his skills, experience, and qualifications.";
    }
    
    if (input.includes('thank') || input.includes('thanks')) {
      return "You're welcome! If you have any more questions about Peter or his work, feel free to ask.";
    }
    
    // Default response
    return "I don't have specific information about that. Would you like to know about Peter's skills, experience, or how to contact him?";
  };

  return (
    <>
      {/* Chat toggle button */}
      <motion.button
        onClick={toggleChatbot}
        className="fixed bottom-4 right-4 z-50 bg-terminal-gray/20 p-3 rounded-full border border-terminal-cyan/30 text-terminal-cyan hover:bg-terminal-cyan/10 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </motion.button>
      
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 z-50 w-[320px] md:w-[400px] max-h-[500px] rounded-lg border border-terminal-gray/30 bg-terminal-dark/95 backdrop-blur-md flex flex-col shadow-lg overflow-hidden"
          >
            {/* Chat header */}
            <div className="flex items-center justify-between px-4 py-3 bg-terminal-gray/20 border-b border-terminal-gray/30">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-terminal-cyan" />
                <span className="font-medium text-terminal-cyan">Chat Assistant</span>
              </div>
              <button 
                onClick={toggleChatbot}
                className="text-terminal-green/70 hover:text-terminal-pink transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {messages.map(message => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} gap-2`}
                >
                  {message.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-terminal-gray/30 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-terminal-cyan" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 ${
                      message.sender === 'user'
                        ? 'bg-terminal-cyan/10 text-terminal-cyan border border-terminal-cyan/20'
                        : 'bg-terminal-green/10 text-terminal-green border border-terminal-green/20'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <div className="text-xs opacity-60 mt-1 text-right">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  
                  {message.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-terminal-gray/30 flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-terminal-pink" />
                    </div>
                  )}
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Chat input */}
            <form onSubmit={handleSendMessage} className="border-t border-terminal-gray/30 p-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-terminal-gray/20 border border-terminal-gray/40 rounded-md py-2 px-3 text-terminal-green focus:outline-none focus:ring-1 focus:ring-terminal-cyan/50 text-sm"
                />
                <button
                  type="submit"
                  className="bg-terminal-gray/20 p-2 rounded-md border border-terminal-cyan/30 text-terminal-cyan hover:bg-terminal-cyan/10 transition-colors"
                  disabled={!input.trim()}
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
