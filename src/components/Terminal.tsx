
import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { Command, Terminal as TerminalIcon, ChevronRight } from 'lucide-react';

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
  availableCommands?: string[];
  history?: string[];
  onHistoryUpdate?: (updatedHistory: string[]) => void;
}

export const CommandLine: React.FC<CommandLineProps> = ({ 
  prefix = "$", 
  initialCommand = "", 
  onEnter, 
  className,
  autoFocus = false,
  readOnly = false,
  availableCommands = [],
  history = [],
  onHistoryUpdate
}) => {
  const [command, setCommand] = useState(initialCommand);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const updateSuggestions = (input: string) => {
    if (!input.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    
    const filtered = availableCommands.filter(cmd => 
      cmd.toLowerCase().startsWith(input.toLowerCase())
    );
    
    setSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
    setSelectedSuggestion(-1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setCommand(newValue);
    updateSuggestions(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle Enter key
    if (e.key === 'Enter') {
      if (selectedSuggestion >= 0 && suggestions.length > 0) {
        // Use selected suggestion
        const selectedCommand = suggestions[selectedSuggestion];
        setCommand(selectedCommand);
        setSuggestions([]);
        setShowSuggestions(false);
        
        if (onEnter) {
          onEnter(selectedCommand);
          
          // Update command history
          if (onHistoryUpdate && selectedCommand.trim() !== '') {
            const newHistory = [...history.filter(cmd => cmd !== selectedCommand), selectedCommand];
            onHistoryUpdate(newHistory.slice(-50)); // Keep last 50 commands
          }
        }
      } else if (onEnter) {
        onEnter(command);
        
        // Update command history
        if (onHistoryUpdate && command.trim() !== '') {
          const newHistory = [...history.filter(cmd => cmd !== command), command];
          onHistoryUpdate(newHistory.slice(-50)); // Keep last 50 commands
        }
        
        setCommand('');
        setSuggestions([]);
        setShowSuggestions(false);
      }
      setHistoryIndex(-1);
      return;
    }
    
    // Handle Up arrow - navigate command history
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (showSuggestions && suggestions.length > 0) {
        // Navigate through suggestions
        setSelectedSuggestion(prev => 
          prev <= 0 ? suggestions.length - 1 : prev - 1
        );
      } else if (history.length > 0) {
        // Navigate through history
        const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        if (newIndex >= 0 && newIndex < history.length) {
          setCommand(history[history.length - 1 - newIndex]);
        }
      }
      return;
    }
    
    // Handle Down arrow - navigate command history
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (showSuggestions && suggestions.length > 0) {
        // Navigate through suggestions
        setSelectedSuggestion(prev => 
          prev >= suggestions.length - 1 ? 0 : prev + 1
        );
      } else if (historyIndex > 0) {
        // Navigate through history
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCommand(history[history.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        // Clear command when reaching the end of history
        setHistoryIndex(-1);
        setCommand('');
      }
      return;
    }
    
    // Handle Tab key for autocompletion
    if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length > 0) {
        // Use first suggestion or selected suggestion
        const suggestionToUse = selectedSuggestion >= 0 ? 
          suggestions[selectedSuggestion] : suggestions[0];
        setCommand(suggestionToUse);
        setSuggestions([]);
        setShowSuggestions(false);
      }
      return;
    }
    
    // Handle Escape key to close suggestions
    if (e.key === 'Escape') {
      setSuggestions([]);
      setShowSuggestions(false);
      setSelectedSuggestion(-1);
      return;
    }
    
    // Reset history index on any other key
    if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') {
      setHistoryIndex(-1);
    }
  };

  return (
    <div className={`${className} my-1 relative`} onClick={() => inputRef.current?.focus()}>
      <div className="flex items-center gap-2">
        <span className="text-terminal-green font-bold">{prefix}</span>
        {readOnly ? (
          <div className="flex-1 text-terminal-cyan">{command}</div>
        ) : (
          <input
            ref={inputRef}
            type="text"
            value={command}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-terminal-cyan outline-none border-none focus:ring-0"
            autoFocus={autoFocus}
            autoComplete="off"
          />
        )}
      </div>
      
      {/* Command suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 mt-1 bg-terminal-gray/90 border border-terminal-green/30 rounded-md w-full max-h-[200px] overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion}
              className={`px-3 py-1 flex items-center gap-2 ${
                index === selectedSuggestion ? 'bg-terminal-green/20 text-terminal-cyan' : 'text-terminal-green'
              } cursor-pointer hover:bg-terminal-green/10`}
              onClick={() => {
                setCommand(suggestion);
                setSuggestions([]);
                setShowSuggestions(false);
                if (inputRef.current) inputRef.current.focus();
              }}
            >
              {index === selectedSuggestion && <ChevronRight className="h-3 w-3" />}
              <span>{suggestion}</span>
            </div>
          ))}
        </div>
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
