
import React from 'react';
import LandingPage from '@/components/LandingPage';
import NameEntryForm from '@/components/NameEntryForm';
import GameSetup from '@/components/GameSetup';
import GameArena from '@/components/GameArena';
import GameResults from '@/components/GameResults';
import { useState } from 'react';

export type GameStage = 'landing' | 'name-entry' | 'setup' | 'playing' | 'results';
export type GameState = {
  playerName: string;
  totalRounds: number;
  currentRound: number;
  playerScore: number;
  computerScore: number;
  playerChoice: string | null;
  computerChoice: string | null;
  gameHistory: {
    round: number;
    playerChoice: string;
    computerChoice: string;
    result: 'win' | 'lose' | 'tie';
  }[];
};

const Index = () => {
  const [stage, setStage] = useState<GameStage>('landing');
  const [gameState, setGameState] = useState<GameState>({
    playerName: '',
    totalRounds: 3,
    currentRound: 0,
    playerScore: 0,
    computerScore: 0,
    playerChoice: null,
    computerChoice: null,
    gameHistory: [],
  });

  // Handle navigation between game stages
  const navigateTo = (nextStage: GameStage) => {
    setStage(nextStage);
  };

  // Update game state
  const updateGameState = (newState: Partial<GameState>) => {
    setGameState(prev => ({ ...prev, ...newState }));
  };

  // Reset the game
  const resetGame = () => {
    setGameState({
      playerName: '',
      totalRounds: 3,
      currentRound: 0,
      playerScore: 0,
      computerScore: 0,
      playerChoice: null,
      computerChoice: null,
      gameHistory: [],
    });
    navigateTo('landing');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-game-bg to-indigo-950 pb-16">
      {/* Background pattern/effects */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzMzMiIGZpbGwtb3BhY2l0eT0iMC4wOSI+PHBhdGggZD0iTTM2IDE4YzEuMTI4IDAgMi4wNDgtLjkzIDIuMDQ4LTIuMDY2di0xLjg2OEMzOC4wNDggMTIuOTMgMzcuMTI4IDEyIDM2IDEycy0yLjA0OC45My0yLjA0OCAyLjA2NnYxLjg2OEMzMy45NTIgMTcuMDcgMzQuODcyIDE4IDM2IDE4em0wIDMwYzEuMTI4IDAgMi4wNDgtLjkzIDIuMDQ4LTIuMDY2di0xLjg2OEMzOC4wNDggNDIuOTMgMzcuMTI4IDQyIDM2IDQycy0yLjA0OC45My0yLjA0OCAyLjA2NnYxLjg2OEMzMy45NTIgNDcuMDcgMzQuODcyIDQ4IDM2IDQ4em0xMi0xNWMwIDEuMTM1LjkyIDIuMDY2IDIuMDQ4IDIuMDY2aDEuODY4QzUzLjA3IDM1LjA2NiA1NCAzNC4xMzUgNTQgMzNzLS45My0yLjA2Ni0yLjA4NC0yLjA2NmgtMS44NjhDNDguOTIgMzAuOTM0IDQ4IDMxLjg2NSA0OCAzM3ptLTMwIDBjMCAxLjEzNS45MiAyLjA2NiAyLjA0OCAyLjA2NmgxLjg2OEMyMy4wNyAzNS4wNjYgMjQgMzQuMTM1IDI0IDMzcy0uOTMtMi4wNjYtMi4wODQtMi4wNjZoLTEuODY4QzE4LjkyIDMwLjkzNCAxOCAzMS44NjUgMTggMzN6bTI1Ljc1LTkuNTMzYy44IDAgMS41My0uNDU2IDEuODg2LTEuMTh2LS4wMDJsLjkzMi0xLjYxNWMuNTYtLjk3LjIyNi0yLjIyLS43NC0yLjc4LS45NzMtLjU2NC0yLjIyOC0uMjI4LTIuNzk1Ljc0MmwtLjkzMiAxLjYxNWMtLjU2Ljk3LS4yMjYgMi4yMi43NCAyLjc4LjMxNy4xODMuNjY4LjI3IDEuMDEuMjdabS0yMS41IDE5LjA2NmMuOCAwIDEuNTMtLjQ1NiAxLjg4Ni0xLjE4di0uMDAybC45MzQtMS42MTVjLjU2LS45Ny4yMjYtMi4yMi0uNzQyLTIuNzgtLjk3LS41NjQtMi4yMjctLjIyOC0yLjc5My43NDJsLS45MzQgMS42MTVjLS41Ni45Ny0uMjI2IDIuMjIuNzQyIDIuNzguMzE3LjE4My42NjguMjcgMS4wMS4yN1ptMTMuNTQtMjUuMTdjLjMyIDAgLjY0NC0uMDg3Ljk0LS4yN2wuMDAyLS4wMDEgMS42MTUtLjkzNGMuOTctLjU2IDEuMzA0LTEuODA5Ljc0Mi0yLjc4LS41NjUtLjk3LTEuODIzLTEuMzA0LTIuNzkzLS43NDJsLTEuNjE1LjkzNGMtLjk3LjU2LTEuMzA0IDEuODA5LS43NDIgMi43OC4zNTUuNjE1IDEuMDA2IDEuMDIgMS44NTQgMS4wMlptLTE5LjA2NiAyMS41Yy4zMiAwIC42NDQtLjA4Ni45NC0uMjdsMi4wMDItLjk1NyAxLjYxNS0uOTM0Yy45Ny0uNTYgMS4zMDQtMS44MDkuNzQyLTIuNzgtLjU2NS0uOTctMS44MjMtMS4zMDMtMi43OTMtLjc0MUwyMCAxNS42MTRsLS4wMDIuMDAyYy0uOTcuNTYtMS4zMDQgMS44MDktLjc0MiAyLjc4LjM1NS42MTUgMS4wMDYgMS4wMiAxLjg1NCAxLjAyek00Ni43MjMgMjYuODdsMi4xNDgtMS4yNDQuMDAyLS4wMDJjLjk3LS41NiAxLjMwNC0xLjgwOS43NDItMi43OC0uNTY1LS45Ny0xLjgyMy0xLjMwMy0yLjc5My0uNzQxbC0yLjE0OCAxLjI0NFYyMy40NWwtLjAwMi4wMDJjLS45Ny41Ni0xLjMwNCAxLjgwOS0uNzQyIDIuNzguMzU1LjYxNSAxLjAwNiAxLjAyIDEuODU1IDEuMDIuMy4wMDUuNjI2LS4wODIuOTM5LS4yN3pNMjYuODczIDEzLjI3N2wzLjU2NC0yLjA1OWMuOTctLjU2IDEuMzA0LTEuODA5Ljc0LTIuNzgtLjU2NC0uOTctMS44MjItMS4zMDMtMi43OTItLjc0bC0zLjU2MyAyLjA1OWMtLjk3LjU2LTEuMzA0IDEuODA5LS43NDEgMi43NzkuMzU1LjYxNSAxLjAwNiAxLjAyIDEuODU0IDEuMDIuMzIgMCAuNjQ0LS4wODYuOTQtLjI2OWwuMDAxLS4wMDF6bTE5Ljc3NiAzNS4yOTZjLjYwOCAwIDEuMTcxLS4zMDggMS41LS44MDhsMTEuMjQtMTkuNDZ2LS4wMDJjLjUtLjg2Ny4yMDgtMi0uNjYtMi41LS44NjYtLjUtMS45OTItLjIxLTIuNDkzLjY1OEw0NS4wMSA0NS44OGwtLjAuMDAyYy0uNS45LS4yMSAyLjA5LjY1OCAyLjU5LjI3Ny4xNi41OS4yNC45MDguMjR2LS4wMzh6bTcuMTA3LTM4LjA4TDQzLjU5NCAzMy4xOGwtLjAwMy4wMDRjLS41MzIuODUzLS4yNyAyLjAyLjU5OCAyLjU3Ny4zLjE4Mi42NC4yNzQuOTgxLjI3NC42MiAwIDEuMi0uMzE1IDEuNTM1LS44MzRMNTcuODY3IDEzbC4wMDMtLjAwNGMuNTMyLS44NTMuMjctMi4wMi0uNTk4LTIuNTc3LS44NjgtLjU1Ny0yLjAzMi0uMjgyLTIuNTY3LjU3VjEwLjk5ek0yOS43NzQgNTIuMDJjLjYgMCAxLjE2NC0uMyAxLjQ5Mi0uNzk2bC4wMDMtLjAwNCA2Ljg3NC0xMS44OTMgMi41Ny00LjU2Yy41MDctLjg2My4yMTQtMS45OTctLjY0OS0yLjUwNC0uODYzLS41MDYtMS45OTEtLjIxNC0yLjQ5OC42NDlsLS4wMDMuMDA1LTkuNDQ0IDE2LjQ0Ny0uMDAzLjAwNGMtLjUwNy44NjMtLjIxNCAxLjk5Ni42NDkgMi41MDQuMjguMTY1LjYwMy4yNDkuOTI3LjI0OWgtLjAwMVptLTYuNTQ4LTExLjMzYy42IDAgMS4xNjQtLjI5OSAxLjQ5Mi0uNzk2bC4wMDMtLjAwNCA2LjI0My0xMC44MTMgMy4xNjItNS40NjNjLjUwNy0uODYzLjIxNC0xLjk5NS0uNjQ4LTIuNS0uODYyLS41LTEuOTg3LS4yMTQtMi40OTMuNjQ5bC0uMDAzLjAwNC05LjQwNSAxNi4yNy0uMDAzLjAwNGMtLjUwNy44NjMtLjIxNCAxLjk5Ni42NDkgMi41MDQuMjguMTY0LjYwNC4yNDguOTI4LjI0OHpNOS40MiA0MC41NzhjLjU4NiAwIDEuMTQtLjI5OSAxLjQ2NS0uNzk1bC4wMDQtLjAwN0wyMi44MjcgMTkuNjhsLjAwMy0uMDA1Yy41MTgtLjg2LjI4LTEuOTkzLS41OC0yLjUxLS44Ni0uNTE1LTEuOTkyLS4yNzktMi41MS41ODNsLS4wMDMuMDA1TDE3LjkxIDIwbDItOCAxLjgxNi0yLjgzNy4wMDMtLjAwNWMuNTE4LS44NjIuMjgtMS45OTQtLjU4LTIuNTEyLS44Ni0uNTE0LTEuOTkyLS4yNzgtMi41MS41ODRsLS4wMDMuMDA1LTMuODE2IDYuMzM3VjEzLjVjMC0xIC4zMi0xLjgyLjgzMy0yLjE2Ni42NzQtLjM2NyAxLjUuNDUgMS41IDEuNjY2VjE1YzAgLjU1Mi40NDggMSAxIDFzMS0uNDQ4IDEtMXYtMmMwLTIuNzYxLTIuMDczLTUtMy41LTUtMS40NjUgMC0zLjUgMS44MzUtMy41IDV2My4wNjJMMTAuODMgMjBjLS41MzMuOC45OTcgMS4xIDEuNTMuM2wyLjUtNC44MzkgMi42NC00LjQ2MS4wMDQtLjAwN2MuNDgyLS44NS43NS0xLjgyNy40MDMtMi41OTMtLjY3My0uNzYtMS45MDctLjg0LTIuNzU4LjAwMy0yLjQ4IDIuNDUtNy4xNTMgNy45NDMtNy4xNTMgNy45NDNsLS4wMDQuMDA3Yy0uNTIyLjg1Ny0uMjgzIDEuOTkyLjU3NCAyLjUxNS44NTYuNTIzIDEuOTkuMjg0IDIuNTE0LS41NzNsLjA0OS0uMDgyYTIuMjggMi4yOCAwIDAgMC0uMDM4LjA3Yy0uMTM2LjE4My40OS45NC42NC43NzcuNDQ4LS40OTYgNi41NjEtMTAuOTQ0IDYuNTYxLTEwLjk0NGwuMDA0LS4wMDdjLjUxMy0uODYzLjI3Ni0xLjk5NC0uNTg2LTIuNTA3LS44NjItLjUxMy0xLjk5MS0uMjc2LTIuNTA1LjU4NmwtLjAwNC4wMDdMLTEgMjEuMzYzbC0uMDA0LjAwN2MtLjUxNC44NjMtLjI3NiAxLjk5NC41ODYgMi41MDcuMjkzLjE3NC42MTUuMjU2LjkzNS4yNTYuNjI3IDAgMS4yNC0uMTk2IDEuNTctLjg1bC4wMDQtLjAwN0MxOC4wODkgNS43NiAyOC43MiAzMCAyOC43MiAzMGMtNCAzLjMzMy02LjI5NiA1LjczLTcuNjkgNy4zMDdMNy45NyAzNy4yNzVsLS4wMDQuMDA3Yy0uNTEzLjg2My0uMjc2IDEuOTk0LjU4NiAyLjUwNy4yOTMuMTc0LjYxNS4yNTcuOTM1LjI1N2wuNC4wMDZ2LjA1OWMtLjA3My4xMTUtLjEzMy4yMDgtLjE3LjI5M2wtLjAwMy4wMDZjLS41MjguODYtLjI1OSAxLjk5NS42IDEuODc1eiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+')] opacity-30 mix-blend-soft-light pointer-events-none"></div>

      <div className="container px-4 py-8">
        {stage === 'landing' && (
          <LandingPage onStart={() => navigateTo('name-entry')} />
        )}
        
        {stage === 'name-entry' && (
          <NameEntryForm 
            onSubmit={(name) => {
              updateGameState({ playerName: name });
              navigateTo('setup');
            }}
          />
        )}
        
        {stage === 'setup' && (
          <GameSetup 
            playerName={gameState.playerName}
            onSubmit={(rounds) => {
              updateGameState({ totalRounds: rounds });
              navigateTo('playing');
            }}
          />
        )}
        
        {stage === 'playing' && (
          <GameArena 
            gameState={gameState}
            updateGameState={updateGameState}
            onGameComplete={() => navigateTo('results')}
          />
        )}
        
        {stage === 'results' && (
          <GameResults 
            gameState={gameState}
            onPlayAgain={() => {
              updateGameState({
                currentRound: 0,
                playerScore: 0,
                computerScore: 0,
                playerChoice: null,
                computerChoice: null,
                gameHistory: [],
              });
              navigateTo('setup');
            }}
            onNewGame={resetGame}
          />
        )}
      </div>
      
      {/* Glowing orbs for ambient effect */}
      <div className="fixed top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-500/20 filter blur-[100px] pointer-events-none"></div>
      <div className="fixed bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-blue-500/20 filter blur-[100px] pointer-events-none"></div>
      <div className="fixed top-1/3 right-1/4 w-72 h-72 rounded-full bg-red-500/20 filter blur-[100px] pointer-events-none"></div>
    </div>
  );
};

export default Index;
