
import React, { useState, useEffect } from 'react';
import { Terminal, CommandLine, TerminalResponse } from './Terminal';
import { useLanguage } from '@/contexts/LanguageContext';

interface CommandHistoryItem {
  command: string;
  response: string;
}

const AVAILABLE_COMMANDS = [
  'help', 'about', 'contact', 'projects', 'skills', 'resume', 
  'clear', 'echo', 'date', 'time', 'ls', 'cd', 'whoami',
  'social', 'experience', 'education', 'weather', 'joke',
  'github', 'linkedin', 'email', 'calc', 'color', 'history'
];

// Function to wrap emojis in span with emoji class
const wrapEmojis = (text: string) => {
  // This regex matches emoji characters
  const emojiRegex = /(\p{Emoji})/gu;
  return text.replace(emojiRegex, '<span class="emoji">$1</span>');
};

const EnhancedTerminal: React.FC = () => {
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [responses, setResponses] = useState<CommandHistoryItem[]>([]);
  const { t } = useLanguage();
  
  // Initial terminal messages
  useEffect(() => {
    // Reset responses when language changes
    setResponses([
      { command: '', response: t('welcome') },
      { command: '', response: t('bio_intro') },
      { command: '', response: t('bio_help') },
      { command: '', response: t('sys_initialized') }
    ]);
  }, [t]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;
    
    // Parse command and arguments
    const args = trimmedCmd.split(' ');
    const primaryCommand = args[0].toLowerCase();
    const restArgs = args.slice(1);
    
    let response = "";
    
    // Process command
    switch (primaryCommand) {
      case 'help':
        response = t('help_cmd') + "\n\nAdditional commands: echo, date, time, ls, cd, whoami, social, experience, education, weather, joke, github, linkedin, email, calc, color, history";
        break;
      case 'about':
        response = t('about_cmd');
        break;
      case 'contact':
        response = t('contact_cmd');
        break;
      case 'projects':
        response = t('projects_cmd');
        break;
      case 'skills':
        response = t('skills_cmd');
        break;
      case 'resume':
        response = t('resume_cmd');
        break;
      case 'clear':
        setResponses([]);
        return;
      case 'echo':
        response = restArgs.join(' ') || 'Echo what?';
        break;
      case 'date':
        response = new Date().toLocaleDateString();
        break;
      case 'time':
        response = new Date().toLocaleTimeString();
        break;
      case 'ls':
        response = "about.txt  contact.txt  projects.txt  skills.txt  resume.pdf";
        break;
      case 'cd':
        const dir = restArgs[0] || '';
        response = dir ? `Changed directory to ${dir}` : "Please specify a directory";
        break;
      case 'whoami':
        response = "guest@marcosmwaba-portfolio";
        break;
      case 'social':
        response = "GitHub: @marcosmwaba\nLinkedIn: /in/marcosmwaba\nEmail: offtunedlungu@gmail.com";
        break;
      case 'experience':
        response = "CEO @ Marcos Enterprise (2020-Present)\nSoftware Engineer @ Tech Solutions (2018-2020)\nIT Support Specialist @ ZambiaTech (2016-2018)";
        break;
      case 'education':
        response = "BSc Computer Science - University of Zambia (2014-2018)\nCertified Information Security Professional (2019)";
        break;
      case 'weather':
        response = "Current weather in Lusaka: <span class='emoji'>🌤️</span> 28°C, Partly Cloudy";
        break;
      case 'joke':
        const jokes = [
          "Why do programmers prefer dark mode? Because light attracts bugs!",
          "How many programmers does it take to change a light bulb? None, that's a hardware problem!",
          "Why do developers use mechanical keyboards? To strongly type their code!"
        ];
        response = jokes[Math.floor(Math.random() * jokes.length)];
        break;
      case 'github':
        window.open("https://github.com/marcosmwaba", "_blank");
        response = "Opening GitHub profile...";
        break;
      case 'linkedin':
        window.open("https://www.linkedin.com/in/marcosmwaba-825219280", "_blank");
        response = "Opening LinkedIn profile...";
        break;
      case 'email':
        window.open("mailto:offtunedlungu@gmail.com", "_blank");
        response = "Opening email client...";
        break;
      case 'calc':
        try {
          if (restArgs.length) {
            const expression = restArgs.join('');
            // Using Function constructor safely for basic arithmetic only
            const safeExpression = expression.replace(/[^0-9+\-*/.()]/g, '');
            if (safeExpression !== expression) {
              response = "Error: Only basic arithmetic operations are allowed";
            } else {
              // eslint-disable-next-line no-new-func
              const result = new Function(`return ${safeExpression}`)();
              response = `${expression} = ${result}`;
            }
          } else {
            response = "Usage: calc <expression> (e.g., calc 2+2)";
          }
        } catch (error) {
          response = "Error in calculation. Try a different expression.";
        }
        break;
      case 'color':
        const colors = ["red", "green", "blue", "yellow", "cyan", "magenta", "orange", "purple"];
        const selectedColor = restArgs[0]?.toLowerCase() || colors[Math.floor(Math.random() * colors.length)];
        response = `<span style="color: ${selectedColor}">This text is now ${selectedColor}!</span>`;
        break;
      case 'history':
        response = commandHistory.length
          ? commandHistory.map((cmd, i) => `${i + 1}. ${cmd}`).join('\n')
          : "No command history yet";
        break;
      default:
        response = t('cmd_not_found').replace('{0}', primaryCommand);
    }
    
    // Add command and response to history
    setResponses(prev => [...prev, { command: trimmedCmd, response }]);
  };

  return (
    <Terminal className="mb-8">
      <div className="max-h-[300px] md:max-h-[400px] overflow-y-auto p-2 md:p-4">
        {responses.map((item, index) => (
          <React.Fragment key={index}>
            {item.command && (
              <CommandLine 
                prefix="guest@portfolio:~$" 
                initialCommand={item.command} 
                readOnly={true}
                className="my-1"
              />
            )}
            <TerminalResponse 
              text={item.response} 
              typing={index > responses.length - 3}
              className="mb-2"
              delay={item.command ? 0 : index * 1000}
            />
          </React.Fragment>
        ))}
        <CommandLine 
          prefix="guest@portfolio:~$" 
          onEnter={handleCommand} 
          autoFocus 
          availableCommands={AVAILABLE_COMMANDS}
          history={commandHistory}
          onHistoryUpdate={setCommandHistory}
        />
      </div>
    </Terminal>
  );
};

export default EnhancedTerminal;
