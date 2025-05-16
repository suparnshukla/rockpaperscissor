
import React from 'react';
import { Button } from '@/components/ui/button';
import { GameState } from '@/pages/Index';
import { cn } from '@/lib/utils';

interface GameResultsProps {
  gameState: GameState;
  onPlayAgain: () => void;
  onNewGame: () => void;
}

const GameResults: React.FC<GameResultsProps> = ({ 
  gameState, 
  onPlayAgain, 
  onNewGame 
}) => {
  // Determine the final winner
  const getWinner = () => {
    if (gameState.playerScore > gameState.computerScore) {
      return 'player';
    } else if (gameState.computerScore > gameState.playerScore) {
      return 'computer';
    } else {
      return 'tie';
    }
  };
  
  const winner = getWinner();
  const winnerName = winner === 'player' ? gameState.playerName : 
                    winner === 'computer' ? 'Computer' : 'Tie';
  
  const resultMessages = {
    player: {
      title: 'Congratulations!',
      message: `You've won the game with a score of ${gameState.playerScore}-${gameState.computerScore}!`,
      class: 'text-game-win'
    },
    computer: {
      title: 'Better Luck Next Time!',
      message: `Computer wins with a score of ${gameState.computerScore}-${gameState.playerScore}.`,
      class: 'text-game-lose'
    },
    tie: {
      title: "It's a Tie!",
      message: `Both you and the computer scored ${gameState.playerScore} points.`,
      class: 'text-game-tie'
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Game Over title */}
      <div className="text-center mb-12">
        <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-neon-glow mb-4 animate-pulse-glow">
          Game Over
        </h1>
      </div>
      
      {/* Winner announcement */}
      <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-xl p-8 mb-12 text-center animate-bounce-in">
        <h2 className="text-3xl font-bold mb-2">{resultMessages[winner].title}</h2>
        <p className={cn("text-xl mb-4", resultMessages[winner].class)}>
          {resultMessages[winner].message}
        </p>
        
        {/* Winner display */}
        <div className="flex justify-center items-center my-8">
          {winner !== 'tie' && (
            <div className="flex flex-col items-center">
              <div className={cn(
                "text-7xl mb-4",
                winner === 'player' ? "text-game-win glow-win" : "text-game-lose glow-lose"
              )}>
                👑
              </div>
              <p className="text-2xl font-bold">{winnerName}</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Game history table */}
      <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 mb-12">
        <h3 className="text-xl font-medium mb-4">Game History</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-white/10">
              <tr>
                <th className="py-2 px-4 text-left text-gray-400">Round</th>
                <th className="py-2 px-4 text-left text-gray-400">Your Choice</th>
                <th className="py-2 px-4 text-left text-gray-400">Computer's Choice</th>
                <th className="py-2 px-4 text-left text-gray-400">Result</th>
              </tr>
            </thead>
            <tbody>
              {gameState.gameHistory.map((round) => (
                <tr key={round.round} className="border-b border-white/5">
                  <td className="py-3 px-4">{round.round}</td>
                  <td className="py-3 px-4 capitalize">{round.playerChoice}</td>
                  <td className="py-3 px-4 capitalize">{round.computerChoice}</td>
                  <td className={cn(
                    "py-3 px-4 capitalize",
                    round.result === 'win' ? "text-game-win" : 
                    round.result === 'lose' ? "text-game-lose" : 
                    "text-game-tie"
                  )}>
                    {round.result}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Buttons */}
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <Button 
          onClick={onPlayAgain}
          size="lg"
          className="bg-gradient-to-r from-game-paper/80 to-game-scissors/80 hover:from-game-paper hover:to-game-scissors text-lg py-6 px-8"
        >
          Play Again (Same Player)
        </Button>
        
        <Button 
          onClick={onNewGame}
          variant="outline"
          size="lg"
          className="border-white/20 hover:bg-white/10 text-lg py-6 px-8"
        >
          New Game
        </Button>
      </div>
    </div>
  );
};

export default GameResults;
