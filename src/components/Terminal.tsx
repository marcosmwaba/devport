
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Command } from 'lucide-react';

interface TerminalProps {
  children?: React.ReactNode;
  className?: string;
}

export const Terminal: React.FC<TerminalProps> = ({ children, className }) => {
  return (
    <div className={`terminal-screen ${className}`}>
      <div className="terminal-header flex items-center gap-1.5 bg-terminal-gray/20 px-4 py-2 border-b border-terminal-gray/30">
        <div className="w-3 h-3 rounded-full bg-terminal-pink"></div>
        <div className="w-3 h-3 rounded-full bg-terminal-purple"></div>
        <div className="w-3 h-3 rounded-full bg-terminal-cyan"></div>
        <div className="flex-1 text-center text-terminal-green/70 text-sm">terminal@portfolio ~ </div>
      </div>
      <div className="p-4 overflow-auto">
        {children}
      </div>
    </div>
  );
};

interface CommandLineProps {
  prefix?: string;
  initialCommand?: string;
  onEnter?: (command: string) => void;
  className?: string;
  autoFocus?: boolean;
  readOnly?: boolean;
}

export const CommandLine: React.FC<CommandLineProps> = ({ 
  prefix = "$", 
  initialCommand = "", 
  onEnter, 
  className,
  autoFocus = false,
  readOnly = false
}) => {
  const [command, setCommand] = useState(initialCommand);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onEnter) {
      onEnter(command);
      setCommand('');
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className} my-1`} onClick={() => inputRef.current?.focus()}>
      <span className="text-terminal-green font-bold">{prefix}</span>
      {readOnly ? (
        <div className="flex-1 text-terminal-cyan">{command}</div>
      ) : (
        <input
          ref={inputRef}
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-terminal-cyan outline-none border-none focus:ring-0"
          autoFocus={autoFocus}
        />
      )}
    </div>
  );
};

interface TerminalResponseProps {
  text: string;
  className?: string;
  typing?: boolean;
  typingSpeed?: number;
  delay?: number;
}

export const TerminalResponse: React.FC<TerminalResponseProps> = ({ 
  text, 
  className,
  typing = false,
  typingSpeed = 20,
  delay = 0
}) => {
  const [displayText, setDisplayText] = useState(typing ? '' : text);
  
  useEffect(() => {
    if (!typing) return;
    
    let index = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayText(text.slice(0, index));
        index++;
        
        if (index > text.length) {
          clearInterval(interval);
        }
      }, typingSpeed);
      
      return () => clearInterval(interval);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [text, typing, typingSpeed, delay]);

  return (
    <div className={`text-terminal-green/80 ${typing ? 'cursor' : ''} ${className}`}>
      {displayText}
    </div>
  );
};

interface TerminalListProps {
  items: string[];
  icon?: React.ReactNode;
  className?: string;
}

export const TerminalList: React.FC<TerminalListProps> = ({ items, icon, className }) => {
  return (
    <div className={`my-2 ${className}`}>
      {items.map((item, index) => (
        <motion.div 
          key={index}
          className="flex items-center gap-2 my-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          {icon && <span>{icon}</span>}
          <span className="text-terminal-light-green">{item}</span>
        </motion.div>
      ))}
    </div>
  );
};

interface TerminalHighlightProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

export const TerminalHighlight: React.FC<TerminalHighlightProps> = ({ 
  children, 
  color = "text-terminal-cyan",
  className
}) => {
  return (
    <span className={`font-bold ${color} ${className}`}>{children}</span>
  );
};

export default Terminal;
