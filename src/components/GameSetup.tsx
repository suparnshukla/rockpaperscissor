
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface GameSetupProps {
  playerName: string;
  onSubmit: (rounds: number) => void;
}

const GameSetup: React.FC<GameSetupProps> = ({ playerName, onSubmit }) => {
  const [selectedRounds, setSelectedRounds] = useState(3);
  const roundOptions = [3, 5, 7, 10];

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-black/30 backdrop-blur-lg rounded-xl p-8 shadow-2xl border border-white/10">
        <h2 className="text-3xl font-bold mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
          Game Setup
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Get ready, {playerName}!
        </p>
        
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="block text-sm text-gray-300 pl-1">
              How many rounds do you want to play?
            </label>
            
            <div className="grid grid-cols-2 gap-4">
              {roundOptions.map((rounds) => (
                <button
                  key={rounds}
                  type="button"
                  onClick={() => setSelectedRounds(rounds)}
                  className={cn(
                    "py-3 px-4 rounded-lg border text-center transition-all text-lg",
                    selectedRounds === rounds 
                      ? "border-game-paper bg-game-paper/20 text-white glow-paper"
                      : "border-white/20 bg-black/40 text-gray-300 hover:bg-black/60"
                  )}
                >
                  {rounds} {rounds === 1 ? 'Round' : 'Rounds'}
                </button>
              ))}
            </div>
          </div>
          
          <Button 
            onClick={() => onSubmit(selectedRounds)}
            className="w-full h-12 text-lg bg-gradient-to-r from-game-rock/80 to-game-paper/80 hover:from-game-rock hover:to-game-paper transition-all"
          >
            Start Playing
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameSetup;
