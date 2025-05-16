
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface NameEntryFormProps {
  onSubmit: (name: string) => void;
}

const NameEntryForm: React.FC<NameEntryFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [isError, setIsError] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.trim().length === 0) {
      setIsError(true);
      return;
    }
    
    onSubmit(name.trim());
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-black/30 backdrop-blur-lg rounded-xl p-8 shadow-2xl border border-white/10">
        <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Enter Your Name</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm text-gray-300 pl-1">
              What should we call you?
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (isError) setIsError(false);
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Your game name"
              className={cn(
                "bg-black/50 border-white/20 h-12 px-4 text-lg", 
                isFocused && "ring-2 ring-game-paper/50 border-game-paper/50",
                isError && "border-game-rock ring-game-rock/50"
              )}
            />
            {isError && (
              <p className="text-game-rock text-sm mt-1">Please enter your name to continue</p>
            )}
          </div>
          
          <Button 
            type="submit"
            className="w-full h-12 text-lg bg-gradient-to-r from-game-paper/80 to-game-scissors/80 hover:from-game-paper hover:to-game-scissors transition-all"
          >
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NameEntryForm;
