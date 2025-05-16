
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type Result = 'win' | 'lose' | 'tie' | null;

interface ResultDisplayProps {
  result: Result;
  playerChoice: string | null;
  computerChoice: string | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, playerChoice, computerChoice }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (result) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [result]);

  if (!result) return null;

  const resultTextMap = {
    win: "You Win!",
    lose: "You Lose!",
    tie: "It's a Tie!"
  };

  const resultClasses = {
    win: "text-game-win glow-win",
    lose: "text-game-lose glow-lose",
    tie: "text-game-tie glow-tie"
  };

  const resultText = resultTextMap[result];
  const resultClass = resultClasses[result];

  return (
    <div className={cn(
      "flex flex-col items-center justify-center space-y-3 transition-all duration-500",
      visible ? "opacity-100 animate-bounce-in" : "opacity-0"
    )}>
      <h2 className={cn("text-4xl font-bold text-shadow", resultClass)}>
        {resultText}
      </h2>
      
      <div className="flex items-center justify-center space-x-2 text-lg">
        <span className="capitalize">{playerChoice}</span>
        <span className="text-gray-400">vs</span>
        <span className="capitalize">{computerChoice}</span>
      </div>
    </div>
  );
};

export default ResultDisplay;
