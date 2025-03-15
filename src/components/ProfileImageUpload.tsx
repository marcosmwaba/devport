
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Check, Image as ImageIcon } from 'lucide-react';
import { Terminal, TerminalResponse } from './Terminal';
import { useToast } from '@/hooks/use-toast';

interface ProfileImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Upload Error",
        description: "Please upload an image file (JPEG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }

    // Create preview URL
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
    
    // Simulate upload process
    setIsUploading(true);
    
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
      onImageUpload(preview);
      
      toast({
        title: "Upload Success",
        description: "Profile image uploaded successfully. In a real app, save this to /public/profile-image.jpg",
      });
      
      // Reset success state after delay
      setTimeout(() => setUploadSuccess(false), 3000);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto my-8"
    >
      <Terminal>
        <TerminalResponse
          text="Profile Image Upload Terminal"
          typing
          className="mb-4"
        />
        
        <div 
          className={`border-2 border-dashed rounded-md p-8 text-center transition-colors ${
            isDragging 
              ? "border-terminal-cyan bg-terminal-cyan/10" 
              : "border-terminal-gray/40 hover:border-terminal-green/40 hover:bg-terminal-green/5"
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="profile-image"
            accept="image/*"
            className="hidden"
            onChange={handleFileInput}
          />
          
          {previewUrl ? (
            <div className="flex flex-col items-center">
              <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4 border-2 border-terminal-cyan">
                <img 
                  src={previewUrl} 
                  alt="Profile Preview" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <p className="text-terminal-green mb-4">Image preview</p>
              
              <label
                htmlFor="profile-image"
                className="cursor-pointer inline-flex items-center gap-2 bg-terminal-gray/30 text-terminal-cyan px-4 py-2 rounded-md border border-terminal-cyan/30 hover:bg-terminal-cyan/10 transition-colors"
              >
                <Upload className="h-5 w-5" />
                <span>Change Image</span>
              </label>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-terminal-gray/20 border border-terminal-gray/40 flex items-center justify-center mb-4">
                <ImageIcon className="h-10 w-10 text-terminal-green/60" />
              </div>
              
              <p className="text-terminal-green mb-2">
                Drag & drop an image here or
              </p>
              
              <label
                htmlFor="profile-image"
                className="cursor-pointer inline-flex items-center gap-2 bg-terminal-gray/30 text-terminal-cyan px-4 py-2 rounded-md border border-terminal-cyan/30 hover:bg-terminal-cyan/10 transition-colors"
              >
                <Upload className="h-5 w-5" />
                <span>Select Image</span>
              </label>
              
              <p className="text-terminal-green/60 text-sm mt-4">
                For a real application, upload your image to /public/profile-image.jpg
              </p>
            </div>
          )}
          
          {isUploading && (
            <div className="mt-4 flex items-center justify-center gap-2 text-terminal-cyan">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Processing image...</span>
            </div>
          )}
          
          {uploadSuccess && (
            <div className="mt-4 flex items-center justify-center gap-2 text-terminal-green">
              <Check className="h-5 w-5" />
              <span>Image uploaded successfully!</span>
            </div>
          )}
        </div>
      </Terminal>
    </motion.div>
  );
};

export default ProfileImageUpload;
