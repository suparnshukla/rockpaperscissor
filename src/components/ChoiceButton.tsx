
import React from 'react';
import { cn } from '@/lib/utils';

type Choice = 'rock' | 'paper' | 'scissors';

interface ChoiceButtonProps {
  type: Choice;
  onClick: (choice: Choice) => void;
  disabled?: boolean;
}

const ChoiceButton: React.FC<ChoiceButtonProps> = ({ 
  type, 
  onClick, 
  disabled = false 
}) => {
  const icons = {
    rock: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 md:h-16 md:w-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 9V6a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-3" />
        <path d="M20 16V4a2 2 0 1 0-4 0v12" />
        <path d="M12 12a2 2 0 1 0 4 0V4a2 2 0 1 0-4 0" />
      </svg>
    ),
    paper: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 md:h-16 md:w-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M7 7h10" />
        <path d="M7 12h10" />
        <path d="M7 17h5" />
      </svg>
    ),
    scissors: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 md:h-16 md:w-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 14a2 2 0 0 1-2-2 2 2 0 0 1 2-2 2 2 0 0 1 2 2 2 2 0 0 1-2 2Z" />
        <path d="M12 10.5V5a2 2 0 0 1 2-2h3" />
        <path d="m15 5 4-3v3h-4" />
        <path d="M12 13.5V19a2 2 0 0 0 2 2h3" />
        <path d="m15 19 4 3v-3h-4" />
        <path d="M7 9a3 3 0 0 0-3 3 3 3 0 0 0 3 3" />
        <path d="M7 9c.86 0 1.5-.7 1.5-1.5v-4A1.5 1.5 0 0 1 10 2a1.5 1.5 0 0 1 1.5 1.5" />
      </svg>
    )
  };

  const colors = {
    rock: "text-game-rock border-game-rock hover:bg-game-rock/10",
    paper: "text-game-paper border-game-paper hover:bg-game-paper/10",
    scissors: "text-game-scissors border-game-scissors hover:bg-game-scissors/10"
  };

  const glows = {
    rock: "hover:glow-rock",
    paper: "hover:glow-paper",
    scissors: "hover:glow-scissors"
  };

  const handleClick = () => {
    if (!disabled) {
      onClick(type);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        "rounded-full p-6 flex items-center justify-center border-2 bg-black/20 backdrop-blur-sm transition-all duration-300 transform",
        colors[type],
        glows[type],
        "hover:scale-110 active:scale-95",
        disabled && "opacity-50 cursor-not-allowed hover:scale-100 hover:bg-transparent"
      )}
      aria-label={type}
    >
      {icons[type]}
    </button>
  );
};

export default ChoiceButton;
