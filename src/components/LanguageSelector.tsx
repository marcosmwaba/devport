
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Globe } from 'lucide-react';

interface Language {
  code: 'en' | 'fr' | 'zh' | 'es' | 'ko';
  name: string;
}

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  
  const languages: Language[] = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'zh', name: '中文' },
    { code: 'es', name: 'Español' },
    { code: 'ko', name: '한국어' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center"
    >
      <Select value={language} onValueChange={(value) => setLanguage(value as 'en' | 'fr' | 'zh' | 'es' | 'ko')}>
        <SelectTrigger className="w-[130px] h-9 bg-terminal-gray/20 border-terminal-gray/30 text-terminal-green flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-terminal-dark border-terminal-gray/30">
          {languages.map((lang) => (
            <SelectItem 
              key={lang.code} 
              value={lang.code}
              className="text-terminal-green hover:text-terminal-cyan hover:bg-terminal-gray/20"
            >
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </motion.div>
  );
};

export default LanguageSelector;
