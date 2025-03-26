// src/app/page.tsx
'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GameBoard from '@/components/GameBoard';
import useGame from '@/hooks/useGame';

export default function Home() {
  const { isGameStarted, startGame, loadSGF } = useGame();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          loadSGF(event.target.result as string);
        }
      };
      reader.readAsText(e.target.files[0]);
    }
  }, [loadSGF]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">
            Goβan <sup>BETA</sup>
          </h1>
          
          {!isGameStarted && (
            <div>
              <label htmlFor="sgf-upload" className="cursor-pointer px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                SGF 로드
              </label>
              <input 
                type="file" 
                id="sgf-upload" 
                accept=".sgf" 
                className="hidden" 
                onChange={handleFileChange} 
              />
            </div>
          )}
        </div>
      </header>
      
      <main className="flex-grow">
        {isGameStarted ? (
          <GameBoard />
        ) : (
          <div className="container mx-auto p-8">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold mb-4">Goβan</h1>
              <p className="text-xl">간단하고 현대적인 바둑 게임</p>
            </div>
            
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-60">
                <Image 
                  src="/images/Go_board.jpg"
                  alt="바둑판"
                  fill
                  style={{objectFit: 'cover'}}
                  priority
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2">클래식 바둑</h2>
                <p className="text-gray-600 mb-4">
                  19×19 판에서 진행되는 전통적인 바둑 게임입니다.
                </p>
                <button 
                  onClick={startGame}
                  className="w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
                >
                  시작하기
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>© 2025 Goβan</p>
      </footer>
    </div>
  );
}