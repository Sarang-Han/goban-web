// src/components/GameBoard.tsx
'use client';

import { useCallback } from 'react';
import Board from './Board';
import GameControls from './GameControls';
import useGame from '@/hooks/useGame';

export default function GameBoard() {
  const {
    isGameStarted,
    isGameEnded,
    boardState,
    blackScore,
    whiteScore,
    blackTerritory,
    whiteTerritory,
    currentPlayer,
    lastMove,
    makeMove,
    pass,
    undo,
    redo,
    saveSGF,
    claimTerritory,
    startGame
  } = useGame();
  
  const handleIntersectionClick = useCallback((x: number, y: number) => {
    if (isGameEnded) {
      claimTerritory(x, y);
    } else {
      makeMove(x, y);
    }
  }, [isGameEnded, makeMove, claimTerritory]);
  
  if (!isGameStarted || !boardState) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl mb-4">바둑 게임</h2>
        <button
          onClick={startGame}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          새 게임 시작
        </button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4">
      <GameControls
        currentPlayer={currentPlayer}
        blackScore={blackScore}
        whiteScore={whiteScore}
        blackTerritory={blackTerritory}
        whiteTerritory={whiteTerritory}
        isGameEnded={isGameEnded}
        onPass={pass}
        onUndo={undo}
        onRedo={redo}
        onSave={saveSGF}
      />
      
      <Board
        size={19}
        boardState={boardState}
        lastMove={lastMove}
        isGameEnded={isGameEnded}
        onIntersectionClick={handleIntersectionClick}
      />
    </div>
  );
}