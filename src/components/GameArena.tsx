
import React, { useState, useEffect } from 'react';
import ChoiceButton from './ChoiceButton';
import ResultDisplay from './ResultDisplay';
import { cn } from '@/lib/utils';
import { GameState } from '@/pages/Index';

type Choice = 'rock' | 'paper' | 'scissors' | null;
type Result = 'win' | 'lose' | 'tie' | null;

interface GameArenaProps {
  gameState: GameState;
  updateGameState: (newState: Partial<GameState>) => void;
  onGameComplete: () => void;
}

const GameArena: React.FC<GameArenaProps> = ({ 
  gameState, 
  updateGameState, 
  onGameComplete 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [result, setResult] = useState<Result>(null);
  
  const choices: Choice[] = ['rock', 'paper', 'scissors'];

  const getComputerChoice = (): Choice => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  };

  const determineWinner = (player: Choice, computer: Choice): Result => {
    if (player === computer) return 'tie';
    if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) {
      return 'win';
    }
    return 'lose';
  };

  const handlePlayerChoice = (choice: Choice) => {
    if (isPlaying || gameState.currentRound >= gameState.totalRounds) return;
    
    setIsPlaying(true);
    updateGameState({ 
      playerChoice: choice,
      currentRound: gameState.currentRound + 1
    });
    
    // Add a slight delay before showing computer's choice for dramatic effect
    setTimeout(() => {
      const computerSelection = getComputerChoice();
      updateGameState({ computerChoice: computerSelection });
      
      if (choice) {
        const roundResult = determineWinner(choice, computerSelection);
        setResult(roundResult);
        
        // Update scores
        if (roundResult === 'win') {
          updateGameState({ playerScore: gameState.playerScore + 1 });
        } else if (roundResult === 'lose') {
          updateGameState({ computerScore: gameState.computerScore + 1 });
        }
        
        // Add to game history
        const historyEntry = {
          round: gameState.currentRound + 1,
          playerChoice: choice,
          computerChoice: computerSelection,
          result: roundResult,
        };
        
        updateGameState({
          gameHistory: [...gameState.gameHistory, historyEntry]
        });
      }
    }, 600);
  };

  // Reset round state after result is shown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (result) {
      timer = setTimeout(() => {
        setResult(null);
        setIsPlaying(false);
        
        // Check if game is over
        if (gameState.currentRound >= gameState.totalRounds) {
          setTimeout(() => {
            onGameComplete();
          }, 1000);
        }
      }, 2000);
    }
    
    return () => clearTimeout(timer);
  }, [result, gameState.currentRound, gameState.totalRounds, onGameComplete]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Game title and player info */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-neon-glow mb-2">
          Rock Paper Scissors
        </h1>
        <p className="text-xl text-gray-400">
          Player: <span className="text-white font-medium">{gameState.playerName}</span>
        </p>
      </div>

      {/* Round info and scoreboard */}
      <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 mb-8 flex justify-between items-center">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-300 mb-1">You</p>
          <p className="text-4xl font-bold text-game-win">{gameState.playerScore}</p>
        </div>
        
        <div className="text-center">
          <p className="text-sm font-medium text-gray-400 mb-1">Round</p>
          <p className="text-xl font-medium">{gameState.currentRound} of {gameState.totalRounds}</p>
        </div>
        
        <div className="text-center">
          <p className="text-lg font-medium text-gray-300 mb-1">Computer</p>
          <p className="text-4xl font-bold text-game-lose">{gameState.computerScore}</p>
        </div>
      </div>

      {/* Result display */}
      <div className="min-h-[100px] mb-8">
        <ResultDisplay 
          result={result}
          playerChoice={gameState.playerChoice}
          computerChoice={gameState.computerChoice}
        />
      </div>

      {/* Game arena - player vs computer */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 mb-16">
        {/* Player choice */}
        <div className={cn(
          "flex flex-col items-center",
          gameState.playerChoice && "animate-float"
        )}>
          <p className="text-lg font-medium mb-3 text-gray-300">Your Choice</p>
          <div className="h-32 w-32 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/10">
            {gameState.playerChoice ? (
              <div className={cn(
                "text-5xl animate-bounce-in",
                gameState.playerChoice === 'rock' && "text-game-rock",
                gameState.playerChoice === 'paper' && "text-game-paper",
                gameState.playerChoice === 'scissors' && "text-game-scissors"
              )}>
                {gameState.playerChoice === 'rock' && '✊'}
                {gameState.playerChoice === 'paper' && '✋'}
                {gameState.playerChoice === 'scissors' && '✌️'}
              </div>
            ) : (
              <span className="text-gray-500 text-lg">?</span>
            )}
          </div>
        </div>

        {/* VS */}
        <div className="text-2xl font-bold text-gray-500 py-4">VS</div>

        {/* Computer choice */}
        <div className={cn(
          "flex flex-col items-center",
          gameState.computerChoice && "animate-float"
        )}>
          <p className="text-lg font-medium mb-3 text-gray-300">Computer</p>
          <div className="h-32 w-32 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/10">
            {gameState.computerChoice ? (
              <div className={cn(
                "text-5xl animate-bounce-in",
                gameState.computerChoice === 'rock' && "text-game-rock",
                gameState.computerChoice === 'paper' && "text-game-paper",
                gameState.computerChoice === 'scissors' && "text-game-scissors"
              )}>
                {gameState.computerChoice === 'rock' && '✊'}
                {gameState.computerChoice === 'paper' && '✋'}
                {gameState.computerChoice === 'scissors' && '✌️'}
              </div>
            ) : (
              <span className="text-gray-500 text-lg">?</span>
            )}
          </div>
        </div>
      </div>

      {/* Status message */}
      {gameState.currentRound < gameState.totalRounds ? (
        <p className="text-center text-lg text-gray-300 mb-8">
          {!isPlaying ? "Make your choice!" : "Computer is choosing..."}
        </p>
      ) : (
        <p className="text-center text-xl text-gray-300 mb-8 animate-pulse">
          Game complete! Calculating final results...
        </p>
      )}

      {/* Choice buttons */}
      <div className="flex justify-center gap-4 md:gap-8">
        {choices.map((choice) => (
          <ChoiceButton
            key={choice}
            type={choice}
            onClick={() => handlePlayerChoice(choice)}
            disabled={isPlaying || gameState.currentRound >= gameState.totalRounds}
          />
        ))}
      </div>
    </div>
  );
};

export default GameArena;
